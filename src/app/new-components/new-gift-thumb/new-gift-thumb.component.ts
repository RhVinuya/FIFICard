import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';

@Component({
  selector: 'app-new-gift-thumb',
  templateUrl: './new-gift-thumb.component.html',
  styleUrls: ['./new-gift-thumb.component.scss']
})
export class NewGiftThumbComponent implements OnInit {
  @Input() gift: INewGift;

  giftService: NewGiftService;
  fileService: NewFileService;
  router: Router;

  constructor(
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _router: Router
  ) { 
    this.giftService = _giftService
    this.fileService = _fileService;
    this.router = _router;
  }

  _gift: NewGift;
  primary: string = '';
  secondary: string = '';

  async ngOnInit(): Promise<void> {
    this._gift = new NewGift(this.gift);

    let giftImages = await this.giftService.getImages(this._gift.id);
    if (giftImages.length > 0) {
      this.primary = await this.fileService.getImageURL(giftImages[0].url);
    }
    if (giftImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(giftImages[1].url);
    }
  }

  onClick(){
    this.router.navigate(['/new/details/gift/' + this._gift.id])
  }
}
