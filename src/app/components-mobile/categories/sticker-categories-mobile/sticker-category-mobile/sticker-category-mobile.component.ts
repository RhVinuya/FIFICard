import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-sticker-category-mobile',
  templateUrl: './sticker-category-mobile.component.html',
  styleUrls: ['./sticker-category-mobile.component.scss']
})
export class StickerCategoryMobileComponent implements OnInit {
  @Input() event: NewEvent;
  
  fileService: NewFileService;
  iconUrl: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  constructor(
    public router: Router,
    _fileService: NewFileService,
  ) {
    this.fileService = _fileService;
  }

  async ngOnInit(): Promise<void> {
    if(this.event.icon) {
      this.iconUrl =  await this.fileService.getImageURL(this.event.icon);
    }
  }

  onClick() {
    this.router.navigate(['/stickers/' + this.event.name]);
  }
}
