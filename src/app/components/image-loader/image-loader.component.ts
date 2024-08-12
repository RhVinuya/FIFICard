import { Component, Input, OnInit, AfterViewInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {
  @Input() set img(_img: string) {
    if (_img && _img !== '') {
      this.image = _img;
      this.isVideo = this.image.includes('.mp4')
      this.loadImage();
    }
  }

  @Input() set size(size: number) {
    this.default = size;
    this.loadImage();
  }

  @Input() zoom: boolean = false;

  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  service: ImageService;

  constructor(
    _service: ImageService
  ) {
    this.service = _service;
  }

  image: string;
  default: number;
  defaulurl: string = '/assets/images/loading.gif';
  url: string = '/assets/images/loading.gif';
  mode: string = 'hover';
  isVideo: boolean = false;

  ngOnInit(): void { }

  loadImage() {
    if (this.image) {
      this.url = this.image;
    }
  }

  selectimage() {
    this.select.emit(this.image);
  }
}
