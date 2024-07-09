import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {
  @Input() event: Event;
  @Input() design: any;

  imageService: ImageService;

  constructor(
    _imageService: ImageService
  ) { 
    this.imageService = _imageService;
  }

  image: string = "";

  ngOnInit() {
    console.log('test');
    this.loadimage();
  }

  loadimage() {
  
    console.log("loadImage", this.event.icon);
    if (this.event.icon) {
      this.imageService.getImageURL(this.event.icon).then(image => {
        this.image = image
      })
    }
  }

}
