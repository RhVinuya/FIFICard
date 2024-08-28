import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCard } from 'src/app/new-models/new-card';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewPersonalizeComponent } from 'src/app/new-pages/new-personalize/new-personalize.component';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-personalize-button',
  templateUrl: './new-personalize-button.component.html',
  styleUrls: ['./new-personalize-button.component.scss']
})
export class NewPersonalizeButtonComponent implements OnInit {
  @Input() iCard: INewCard;

  modalService: NgbModal;
  storageService: NewStorageService;
  personalizeService: NewPersonalizeService;

  constructor(
    _modalService: NgbModal,
    _storageService: NewStorageService,
    _personalizeService: NewPersonalizeService
  ) { 
    this.modalService = _modalService;
    this.storageService = _storageService;
    this.personalizeService = _personalizeService;
  }

  isHover: boolean = false

  ngOnInit(): void {
  }

  mouserEnter(){
    this.isHover = true;
  }

  mouseLeave(){
    this.isHover = false;
  }

  onPersonalize() {     
    let personalize: INewPersonalize | undefined = undefined;
    let ids = this.storageService.getPersonalizeIds();
    ids.forEach(id => {
      let data = this.storageService.getPersonalize(id);
      if (data) {
        if (data.itemId === this.iCard.id) {
          personalize = data;
        }
      }
    })
    if (personalize === undefined) {
      personalize = {
        id: this.personalizeService.generateID(),
        itemId: this.iCard.id
      }
      this.storageService.savePersonalize(personalize)
      this.storageService.savePersonalizeIds([...ids, personalize.id])
    }

    const reference = this.modalService.open(NewPersonalizeComponent, { animation: true, fullscreen: true });
    reference.componentInstance.iPersonalize = personalize;
  }

}
