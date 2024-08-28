import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewPostcard, INewPostcardBundle, NewPostcard } from 'src/app/new-models/new-postcard';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-postcard-thumb',
  templateUrl: './new-postcard-thumb.component.html',
  styleUrls: ['./new-postcard-thumb.component.scss']
})
export class NewPostcardThumbComponent implements OnInit {
  @Input() postcard: INewPostcard;

  storageService: NewStorageService;
  postcardService: NewPostcardService;
  fileService: NewFileService;
  router: Router;

  constructor(
    _storageService: NewStorageService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService,
    _router: Router
  ) {
    this.storageService = _storageService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
    this.router = _router;
  }

  _postcard: NewPostcard;
  bundles: INewPostcardBundle[] = []
  primary: string = '';
  secondary: string = '';
  min: number = 0;
  max: number = 0;

  async ngOnInit(): Promise<void> {
    this.storageService.saveItemDetails(this.postcard);

    this._postcard = new NewPostcard(this.postcard);

    let postcardImages = await this.postcardService.getImages(this._postcard.id);
    if (postcardImages.length > 0) {
      this.primary = await this.fileService.getImageURL(postcardImages[0].url);
    }
    if (postcardImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(postcardImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }

    this.bundles = await this.postcardService.getBundles(this._postcard.id);
    if (this.bundles.length > 0) {
      this.bundles.sort((a, b) => { return a.price - b.price });
      this.min = this.bundles[0].price;
      this.max = this.bundles[this.bundles.length - 1].price
    }
  }

  onClick() {
    this.router.navigate(['/new/details/postcard/' + this._postcard.id])
  }

}
