import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { INewCard } from 'src/app/new-models/new-card';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { PersonalizeMobileComponent } from '../personalize-mobile/personalize-mobile.component';

@Component({
  selector: 'app-personalize-button-mobile',
  templateUrl: './personalize-button-mobile.component.html',
  styleUrls: ['./personalize-button-mobile.component.scss']
})
export class PersonalizeButtonMobileComponent implements OnInit {
  @Input() iCard: INewCard;

  modalService: NgbModal;
  storageService: NewStorageService;
  personalizeService: NewPersonalizeService;
  offCanvas: NgbOffcanvas;
  toastController: ToastController;

  constructor(
    _modalService: NgbModal,
    _storageService: NewStorageService,
    _personalizeService: NewPersonalizeService,
    _offCanvas: NgbOffcanvas,
    _toastController: ToastController
  ) {
    this.modalService = _modalService;
    this.storageService = _storageService;
    this.personalizeService = _personalizeService;
    this.offCanvas = _offCanvas;
    this.toastController = _toastController;
  }

  isHover: boolean = false

  ngOnInit(): void {
  }

  mouserEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

  async onPersonalize(event: Event) {
    let personalize = await this.personalizeService.getByCard(this.iCard.id)
    if (personalize === undefined) personalize = await this.personalizeService.create(this.iCard.id);
    const reference = this.modalService.open(PersonalizeMobileComponent, { animation: true, fullscreen: true, keyboard: false, backdrop: true });
    reference.componentInstance.iPersonalize = personalize;
    const addedRef = reference.componentInstance.added.subscribe(async (value: boolean) => {
      if (value) {
        reference.close()
        const toast = await this.toastController.create({
          message: 'Personalize card is added on the Cart',
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        this.personalizeService.delete(personalize!.id)
      }
    })
    reference.result.then(_ => {
      addedRef.unsubscribe();
    });
  }

}
