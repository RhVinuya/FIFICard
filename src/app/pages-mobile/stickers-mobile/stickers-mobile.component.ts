import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewRecipientService } from 'src/app/new-services/new-recipients.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-stickers-mobile',
  templateUrl: './stickers-mobile.component.html',
  styleUrls: ['./stickers-mobile.component.scss']
})
export class StickersMobileComponent implements OnInit {
  
  title: string = "Stickers";

  constructor(
  ) {
  }


  ngOnInit(): void {

  }


}
