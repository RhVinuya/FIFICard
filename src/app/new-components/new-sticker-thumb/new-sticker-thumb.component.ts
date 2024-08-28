import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-sticker-thumb',
  templateUrl: './new-sticker-thumb.component.html',
  styleUrls: ['./new-sticker-thumb.component.scss']
})
export class NewStickerThumbComponent implements OnInit {
  @Input() sticker: INewSticker;

  storageService: NewStorageService;
  stickerService: NewStickerService;
  fileService: NewFileService;
  router: Router;

  constructor(
    _storageService: NewStorageService,
    _stickerService: NewStickerService,
    _fileService: NewFileService,
    _router: Router
  ) { 
    this.storageService = _storageService;
    this.stickerService = _stickerService;
    this.fileService = _fileService;
    this.router = _router;
  }

  _sticker: NewSticker;
  primary: string = '';
  secondary: string = '';

  async ngOnInit(): Promise<void> {
    this.storageService.saveItemDetails(this.sticker);
    this._sticker = new NewSticker(this.sticker);

    let stickerImages = await this.stickerService.getImages(this._sticker.id);
    if (stickerImages.length > 0) {
      this.primary = await this.fileService.getImageURL(stickerImages[0].url);
    }
    if (stickerImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(stickerImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }
  }

  onClick(){
    this.router.navigate(['/new/details/sticker/' + this._sticker.id])
  }

}
