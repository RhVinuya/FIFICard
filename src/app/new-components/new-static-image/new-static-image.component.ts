import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IAdsImage } from 'src/app/new-models/new-config';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-new-static-image',
  templateUrl: './new-static-image.component.html',
  styleUrls: ['./new-static-image.component.scss'],
})
export class NewStaticImageComponent implements OnInit {
  @Input() image: IAdsImage;
  @Input() disable: boolean = false
  @Output() click: EventEmitter<void> = new EventEmitter();

  imageService: ImageService;
  router: Router;

  constructor(
    _imageService: ImageService,
    _router: Router
  ) {
    this.imageService = _imageService;
    this.router = _router;
  }

  file: string = '';

  ngOnInit() {
    this.imageService.getImageURL(this.image.storage).then(value => this.file = value)
  }

  onClick() {
    if (this.disable === false) {
      this.click.emit()
      if (this.image.linktype === 'external') window.open(this.image.url, '_blank');
      else if (this.image.linktype === 'internal') this.router.navigate([this.image.url]);
    }
  }
}
