import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-sample-thumb',
  templateUrl: './sample-thumb.component.html',
  styleUrls: ['./sample-thumb.component.scss']
})
export class SampleThumbComponent implements OnInit {
  @Input() file: any;
  @ViewChild('video') video: ElementRef;

  service: ImageService;

  constructor(
    _service: ImageService
  ) {
    this.service = _service;
  }

  url: string = '';

  controls: string[] = [
    'nodownload',
    'nofullscreen',
    'noremoteplayback'
  ];

  ngOnInit(): void {
    this.loadfile();
  }

  loadfile() {
    this.service.getImageURL(this.file.path).then(url => {
      this.url = url;
    })
  }
}
