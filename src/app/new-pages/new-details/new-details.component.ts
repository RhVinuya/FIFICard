import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCardImage, NewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPersonalizeComponent } from '../new-personalize/new-personalize.component';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent implements OnInit {
  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  fileService: NewFileService;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.fileService = _fileService;
    this.modalService = _modalService;
    this.ref = _ref
  }

  loading: boolean = false;
  card: NewCard;
  images: string[] = [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.cardService.get(params['id']).then(async value => {
        this.card = new NewCard(value);
        this.loading = false;
        this.ref.detectChanges();
        this.loadImages(await this.cardService.getImages(params['id']))
      })
    });
  }

  async loadImages(items: INewCardImage[]) {
    if (items.length > 0) {
      this.images = [];
      for await (let item of items) {
        let url = await this.fileService.getImageURL(item.url);
        this.images = [...this.images, url]
      }
      this.ref.detectChanges();
    }
  }

  onPersonalize() {
    this.modalService.open(NewPersonalizeComponent, { animation: true, fullscreen: true });
  }

}
