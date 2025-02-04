import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { CardService } from 'src/app/services/card.service';
import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ECardImage } from 'src/app/models/ecard-image';

@Component({
  selector: 'app-ecard-image-grid',
  templateUrl: './ecard-image-grid.component.html',
  styleUrls: ['./ecard-image-grid.component.scss']
})
export class ECardImageGridComponent implements OnInit {
  @Input() id: string;

  @ViewChild('player') player: ElementRef;

  def: ChangeDetectorRef;
  cardService: CardService;
  imageService: ImageService;
  router: Router

  constructor(
    _def: ChangeDetectorRef,
    _cardService: CardService,
    _imageService: ImageService,
    _router: Router
  ) { 
    this.def = _def;
    this.cardService = _cardService;
    this.imageService = _imageService;
    this.router = _router;
  }

  image: ECardImage;
  url: string = '';

  ngOnInit(): void {
    this.loadImage();

    this.router.events.subscribe((val) => {
      this.player.nativeElement.pause();
     });
  }

  loadImage(){
    this.cardService.getECardImages(this.id).then(images => {
      this.image = images.find(x => x.title == 'video')!;
      this.def.detectChanges();
      if (this.image){
        this.imageService.getImageURL(this.image.url).then(url => {
          this.url = url;
          this.def.detectChanges();
        })
      }
    })
  }

}
