import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-imagegrid-view',
  templateUrl: './imagegrid-view.component.html',
  styleUrls: ['./imagegrid-view.component.scss']
})
export class ImagegridViewComponent implements OnInit {
  @Input() set img(_img: string) {
    this.url = '';
    this.isVideo = _img.includes('.mp4')
    this.loadImage(_img);
  }
  @Input() set glittered(_glittered: boolean){
    this.isGlittered = _glittered;
  }
  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  service: ImageService;

  constructor(
    _service: ImageService
  ) {
    this.service = _service;
  }

  defaulurl: string = '/assets/images/loading.gif';
  url: string = '';
  isGlittered: Boolean = false;
  isVideo: boolean = false;

  ngOnInit(): void {
  }

  loadImage(_img: string) {
    this.service.getImageURL(_img).then(url => {
      this.url = url;
    });
  }

  click() {
    this.select.emit(this.url);
  }

}
