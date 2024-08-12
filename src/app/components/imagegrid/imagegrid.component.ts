import { title } from 'process';
import { LightboxImage } from './../lightbox/lightbox-image';
import { ImageService } from 'src/app/services/image.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { CardImage } from 'src/app/models/card-image';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { Card } from 'src/app/models/card';
import { ClipartFile } from 'src/app/models/clipart-file';

export class ItemImage {
  public id: number;
  public url: string;
  public title: string;
  public image: string;

  public load(_id: number, _cardImage: CardImage) {
    this.id = _id;
    this.url = _cardImage.url;
    this.title = _cardImage.title;
  }

  public loadclipart(_id: number, _url: string) {
    this.id = _id;
    this.url = _url;
  }
}

@Component({
  selector: 'app-imagegrid',
  templateUrl: './imagegrid.component.html',
  styleUrls: ['./imagegrid.component.scss']
})
export class ImagegridComponent implements OnInit {
  @Input() set card(_card: Card) {
    this.main = _card;
    this.loadImage();
  }
  @Input() set glittered(_glittered: boolean) {
    this.isGlittered = _glittered;
  }
  @ViewChild('lightbox') lightbox: LightboxComponent;

  service: CardService;
  imageService: ImageService;

  constructor(
    _service: CardService,
    _imageService: ImageService
  ) {
    this.service = _service;
    this.imageService = _imageService;
  }

  main: Card;
  selectedimage: ItemImage = new ItemImage();
  itemImages: ItemImage[] = [];
  x: number = 0;
  isGalleryAvailable: boolean = false;
  lightboxImages: LightboxImage[] = [];
  isGlittered: boolean = false;

  ngOnInit(): void { }

  loadImage() {
    this.itemImages = [];
    if (this.main.type === 'clipart') {
      this.service.getClipartFile(this.main.id!).then(clipartfiles => {
        if (this.main.primary){
          let file: ClipartFile = clipartfiles.filter(x => x.title === 'preview').find(x => x.url === this.main.primary)!;
          let item: ItemImage = new ItemImage;
          item.loadclipart(0, file.url);
          this.itemImages.push(item);

          let x: number = 1
          clipartfiles.filter(x => x.title === 'preview').filter(x => x.url !== this.main.primary).forEach(file => {
            let item: ItemImage = new ItemImage;
            item.loadclipart(x, file.url);
            this.itemImages.push(item);
            x++;
          });
        }
        this.selectedimage = this.itemImages[0];
        this.loadImageFiles();
      })
    }
    else {
      this.service.getImages(this.main.id!).then(cardimages => {
        cardimages.forEach(image => {
          let itemimage: ItemImage = new ItemImage();
          itemimage.load(cardimages.findIndex(x => x === image), image)
          this.itemImages.push(itemimage);
        });

        this.selectedimage = this.itemImages[0];
        this.loadImageFiles();
      });
    }
  }

  changeImage(url: string) {
    let index: number = this.itemImages.findIndex(x => x.image == url);
    this.selectedimage = this.itemImages[index];
  }

  openItem(url: string) {
    let index: number = this.lightboxImages.findIndex(x => x.image == url);
    this.lightbox.open(this.lightboxImages[index].id);
  }

  loadImageFiles() {
    let requests: any[] = [];
    this.itemImages.forEach(itemImage => {
      requests.push(this.imageService.getImageURL(itemImage.url));
    });

    Promise.all(requests).then(values => {
      let idx: number = 0;
      values.forEach(value => {
        this.itemImages[idx].image = value;
        idx++;
      });

      this.isGalleryAvailable = true;
      this.loadGallery();
    });
  }

  loadGallery() {
    this.itemImages.forEach(item => {
      this.lightboxImages.push(new LightboxImage(item.id, item.image, item.title));
    });
  }

  open() {
    this.lightbox.open(0);
  }
}
