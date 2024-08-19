import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCardImage, INewRating, NewCard } from 'src/app/new-models/new-card';
import { INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent implements OnInit {
  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.fileService = _fileService;
    this.ref = _ref
  }

  loading: boolean = false;
  id: string;
  type: 'card' | 'sticker';
  model: NewCard | NewSticker;
  images: string[] = [];
  rate: number = 0;

  isFeatured: boolean = false;
  isPoetry: boolean = false;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];

      if (this.type === 'card') {
        this.cardService.get(this.id).then(async value => {
          this.model = new NewCard(value);
          this.isFeatured = this.model.featured;
          this.isPoetry = this.model instanceof NewCard && this.model.messagetype === 'poetry';
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.cardService.getImages(this.id));
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else {
        this.stickerService.get(this.id).then(async value => {
          console.log(value)
          this.model = new NewSticker(value);
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.stickerService.getImages(this.id));
        })
      }
    });
  }

  async loadImages(items: INewCardImage[] | INewStickerImage[]) {
    if (items.length > 0) {
      this.images = [];
      for await (let item of items) {
        let url = await this.fileService.getImageURL(item.url);
        this.images = [...this.images, url]
      }
      this.ref.detectChanges();
    }
  }

  loadRatings(ratings: INewRating[]) {
    let value: number = 0;
    ratings.forEach(rating => {
      value = value + rating.rate;
    })
    this.rate = value / ratings.length;
  }

}
