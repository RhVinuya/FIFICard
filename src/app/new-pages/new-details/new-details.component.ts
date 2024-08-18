import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.fileService = _fileService;
    this.ref = _ref
  }

  loading: boolean = false;
  card: NewCard;
  primary: string = '';
  images: string[] = []

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.cardService.get(params['id']).then(async value => {
        this.card = new NewCard(value);
        this.loading = false;
        this.ref.detectChanges();
        this.loadImages()
      })
    });
  }

  async loadImages() {
    this.images = [];
    if (this.card.primary && this.card.primary !== '') {
      let url = await this.fileService.getImageURL(this.card.primary);
      this.images.push(url);
      this.ref.detectChanges();
    }
    if (this.card.images.length > 0) {
      for await (let image of this.card.images) {
        if (image !== (this.card.primary && this.card.primary !== '')) {
          let url = await this.fileService.getImageURL(image);
          this.images.push(url);
          this.ref.detectChanges();
        }
      }
    }
    this.primary = this.images[0];
    this.ref.detectChanges();
  }

}
