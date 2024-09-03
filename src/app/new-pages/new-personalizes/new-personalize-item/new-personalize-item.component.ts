import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';

@Component({
  selector: 'app-new-personalize-item',
  templateUrl: './new-personalize-item.component.html',
  styleUrls: ['./new-personalize-item.component.scss']
})
export class NewPersonalizeItemComponent implements OnInit {

  @Input() project: INewPersonalize;
  @Output() delete: EventEmitter<string> = new EventEmitter()

  cardService: NewCardService;
  personalizeService: NewPersonalizeService;
  fileService: NewFileService;
  modalService: NgbModal;

  constructor(
    _cardService: NewCardService,
    _personalizeService: NewPersonalizeService,
    _fileService: NewFileService,
    _modalService: NgbModal
  ) { 
    this.cardService = _cardService;
    this.personalizeService = _personalizeService;
    this.fileService = _fileService;
    this.modalService = _modalService;
  }

  iCard: INewCard;
  card: NewCard;
  primary: string = '';

  async ngOnInit(): Promise<void> {
    this.iCard = await this.cardService.get(this.project.itemId);
    this.card = new NewCard(this.iCard);
    console.log(this.card)
    let images = await this.cardService.getImages(this.project.itemId);
    if (images && images.length > 0) {
      this.primary = await this.fileService.getImageURL(images[0].url)
    }
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
