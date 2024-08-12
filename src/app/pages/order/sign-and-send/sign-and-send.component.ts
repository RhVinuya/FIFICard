import { environment } from 'src/environments/environment';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { FilterService } from 'src/app/services/filter.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { exit } from 'process';
import { ImageService } from 'src/app/services/image.service';
import { OrderService } from 'src/app/services/order.service';
import { SignAndSendDetails, SignAndSendPhotoDetails } from 'src/app/models/sign-and-send-details';

class Item {
  public image: string;
  public code: number;
  public top: number;
  public left: number;
  public width: number;
  public height: number;
  public limit: number;
  public style: string;
  public text: string = '';
  public size: number = 20;
  public alignment: string = "left";
  public color: string = environment.fontcolors[0].hex;

  public intialize(_image: string, _code: number, _top: number, _left: number, _width: number, _height: number, _limit: number, _style: string) {
    this.image = _image;
    this.code = _code;
    this.top = _top;
    this.left = _left;
    this.width = _width;
    this.height = _height;
    this.limit = _limit;
    this.style = _style;
  }

  public updateText(_text: string, _size: number, _style: string, _alignment: string, _color: string) {
    this.text = _text;
    this.size = _size;
    this.style = _style;
    this.alignment = _alignment;
    this.color = _color;
  }

  public clear() {
    this.text = '';
    this.size = 20;
    this.alignment = 'left';
    this.color = environment.fontcolors[0].hex;
  }
}

class Photo {
  public image: string;
  public code: number;
  public top: number;
  public left: number;
  public width: number;
  public height: number;
  public url: string = ''
  public scale: number = 1;
  public imageleft: number = 0;
  public imagetop: number = 0;

  public intialize(_image: string, _code: number, _top: number, _left: number, _width: number, _height: number) {
    this.image = _image;
    this.code = _code;
    this.top = _top;
    this.left = _left;
    this.width = _width;
    this.height = _height;
  }

  public updateImage(_url: string) {
    this.url = _url;
  }

  public updateDetials(_scale: number, _left: number, _top: number){
    this.scale = _scale;
    this.imageleft = _left;
    this.imagetop = _top;
  }

  public clear() {
    this.url = '';
    this.scale = 1;
    this.imageleft = 0;
    this.imagetop = 0;
  }
}

class URL {
  public image: string;
  public url: string;
}

@Component({
  selector: 'app-sign-and-send',
  templateUrl: './sign-and-send.component.html',
  styleUrls: ['./sign-and-send.component.scss']
})
export class SignAndSendComponent implements OnInit {
  @Output() signAndSendEvent = new EventEmitter<SignAndSendDetails[]>();
  @Output() signAndSendPhotoEvent = new EventEmitter<SignAndSendPhotoDetails[]>();

  id?: string;
  activateRoute: ActivatedRoute;
  service: CardService;
  orderService: OrderService;
  router: Router;
  filerService: FilterService;
  imageService: ImageService;
  modalService: NgbModal;
  modalRef: NgbModalRef;

  uid: string;
  fonts: string[] = [
    'Open Sans',
    'Dancing Script',
    'Pacifico',
    'Satisfy',
    'Cookie',
    'Great Vibes',
    'Lora',
    'Lobster',
    'Playball',
    'Courgette',
    'Smooch',
    'Zen Loop'
  ];
  items: Item[] = [];
  photos: Photo[] = [];
  images: string[] = [];
  urls: URL[] = [];

  focusURL: URL;
  focusItems: Item[] = [];
  focusPhotos: Photo[] = [];
  selected: Item = new Item();

  message: string = ''
  position: number = -1;

  editorvisible: boolean = false;
  fontcolors = environment.fontcolors;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    fullscreen: true
  };

  constructor(
    private _activateRoute: ActivatedRoute,
    private _service: CardService,
    private _orderService: OrderService,
    private _router: Router,
    private _filerService: FilterService,
    private _imageService: ImageService,
    private _modalService: NgbModal
  ) {
    this.activateRoute = _activateRoute;
    this.service = _service;
    this.orderService = _orderService;
    this.router = _router;
    this.filerService = _filerService;
    this.imageService = _imageService;
    this.modalService = _modalService;
  }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;

    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getImageList();
    });
  }

  clickSignAndSend(signandsend: any) {
    this.modalRef = this.modalService.open(signandsend, this.ngbModalOptions);
  }

  getImageList() {
    this.service.getImages(this.id!).then(images => {
      let imgs: string[] = [];
      images.map(x => x.url).forEach(image => {
        if (imgs.findIndex(x => x == image) < 0) {
          imgs.push(image);
        }
        this.loadSignAndSend(imgs);
      })
    })
  }

  loadSignAndSend(imageList: string[]) {
    this.items = [];
    this.images = [];
    this.photos = [];
    this.urls = [];

    this.service.getSignAndSend(this.id!).then(data => {
      data.forEach(sign => {
        if (imageList.indexOf(sign.image) >= 0) {
          let item = new Item();
          item.intialize(sign.image, sign.code, sign.top, sign.left, sign.width, sign.height, sign.limit, this.fonts[0]);
          this.items.push(item);

          if (this.images.findIndex(x => x == item.image) < 0) {
            this.images.push(item.image);
          }

          if (this.urls.findIndex(x => x.image == item.image) < 0){
            let url: URL = new URL();
            url.image = item.image;
            this.urls.push(url);      
          }
        }
      });

      this.urls.forEach(async url => {
        url.url = await this.imageService.getImageURL(url.image);
        if (!this.focusURL) {
          this.updateFocusImage(url);
        }
      })
    });
    
    this.service.getSignAndSendPhoto(this.id!).then(data => {
      data.forEach(sign => {
        if (imageList.indexOf(sign.image) >= 0) {
          let photo = new Photo();
          photo.intialize(sign.image, sign.code, sign.top, sign.left, sign.width, sign.height);
          this.photos.push(photo);

          if (this.images.findIndex(x => x == photo.image) < 0) {
            this.images.push(photo.image);
          }

          if (this.urls.findIndex(x => x.image == photo.image) < 0){
            let url: URL = new URL();
            url.image = photo.image;
            this.urls.push(url);      
          }
        }

        this.urls.forEach(async url => {
          url.url = await this.imageService.getImageURL(url.image);
          if (!this.focusURL) {
            this.updateFocusImage(url);
          }
        })
      });
    })
    
  }

  imageClick(url: URL) {
    if (url.image != this.focusURL.image) {
      this.updateDetail(this.focusURL.image);
      this.updateFocusImage(url);
    }
  }

  updateFocusImage(url: URL) {
    this.focusURL = url;
    this.focusItems = [];
    this.selected = new Item();

    this.items.forEach(sign => {
      if (sign.image == this.focusURL.image) {
        let item = new Item();
        item.intialize(sign.image, sign.code, sign.top, sign.left, sign.width, sign.height, sign.limit, this.fonts[0]);
        item.updateText(sign.text, sign.size, sign.style, sign.alignment, sign.color);
        this.focusItems.push(item);
      }
    })

    this.photos.forEach(sign => {
      if (sign.image == this.focusURL.image) {
        let photo = new Photo();
        photo.intialize(sign.image, sign.code, sign.top, sign.left, sign.width, sign.height);
        this.focusPhotos.push(photo);
      }
    })
  }

  textareaClick(code: number) {
    this.focusItems.forEach(item => {
      if (item.code == code) {
        this.selected = item;
      }
    });
    this.message = '';
    this.position = 0;
    this.editorvisible = true;
  }

  textareaKeyup(event: any) {
    this.position = event.target.selectionEnd;
    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.text = event.target.value;
      }
    });
  }

  areaClick(event: any) {
    if (this.selected)
      this.position = event.target.selectionEnd;
  }

  textareaFocus(event: any) {
    this.position = event.target.selectionEnd;
  }

  fontChange(event: any) {
    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.style = event.target.value;
      }
    });
  }

  fontColorChange(event: any){
    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.color = event.target.value;
      }
    });
  }

  sizeChange(event: any) {
    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.size = Number(event.target.value);
      }
    });
  }

  alignmentClick(alignment: string) {
    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.alignment = alignment;
      }
    });
  }

  updateDetail(image: string) {
    this.focusItems.forEach(focus => {
      this.items.forEach(item => {
        if ((item.image == image) && (focus.image == image)) {
          if (item.code == focus.code) {
            item.updateText(focus.text, focus.size, focus.style, focus.alignment, focus.color);
          }
        }
      });
    });
  }

  onChangeImage(code: number, image: string){
    let signAndSendPhoto = this.focusPhotos.find(x => x.code == code)!;
    signAndSendPhoto.updateImage(image);
    
    this.focusPhotos.forEach(focus => {
      this.photos.find(x => x.image == focus.image && x.code == code)?.updateImage(image);
    })
  }

  onDetailsImage(code: number, details: any){
    let signAndSendPhoto = this.focusPhotos.find(x => x.code == code)!;
    signAndSendPhoto.updateDetials(details['scale'], details['left'], details['top']);

    this.focusPhotos.forEach(focus => {
      this.photos.find(x => x.image == focus.image && x.code == code)?.updateDetials(details['scale'], details['left'], details['top']);
    })
  }

  clickCancel() {
    this.modalRef.close('Cancel');
  }

  clickClear() {
    this.message = '';
    this.position = -1;
    this.items.forEach(item => { item.clear(); });
    this.focusItems.forEach(item => { item.clear(); })
    this.photos.forEach(photo => { photo.clear(); });
    this.focusPhotos.forEach(photo => { photo.clear(); })
    this.editorvisible = false;
    this.selected = new Item();
  }

  clickDone() {
    this.images.forEach(image => {
      this.updateDetail(image);
    })

    if (this.items.length > 0){
      let signDetails: SignAndSendDetails[] = [];
      this.items.forEach(item => {
        let detail: SignAndSendDetails = new SignAndSendDetails();
        detail.image = item.image;
        detail.code = item.code;
        detail.top = item.top;
        detail.left = item.left;
        detail.width = item.width;
        detail.height = item.height;
        detail.limit = item.limit;
        detail.style = item.style;
        detail.text = item.text;
        detail.size = item.size;
        detail.alignment = item.alignment;
        detail.color = item.color;
        signDetails.push(detail);
      });

      this.signAndSendEvent.emit(signDetails);
    }

    if (this.photos.length > 0){
      let photoDetails: SignAndSendPhotoDetails[] = [];
      this.photos.forEach(photo => {
        let photoDetail: SignAndSendPhotoDetails = new SignAndSendPhotoDetails();
        photoDetail.image = photo.image;
        photoDetail.code = photo.code;
        photoDetail.top = photo.top;
        photoDetail.left = photo.left;
        photoDetail.width = photo.width;
        photoDetail.height = photo.height;
        photoDetail.url = photo.url;
        photoDetail.scale = photo.scale;
        photoDetail.imagetop = photo.imagetop;
        photoDetail.imageleft = photo.imageleft;
        photoDetails.push(photoDetail);
      });
      this.signAndSendPhotoEvent.emit(photoDetails)
    }

    this.editorvisible = false;
    this.selected = new Item();

    this.modalRef.close('Done');
  }

  emoticon(emoji: string) {
    if (this.position == -1) {
      exit;
    }

    if (this.position == this.message.length) {
      this.message += emoji 
    }
    else {
      this.message = this.message.substring(0, this.position) + emoji + this.message.substring(this.position);
    }

    this.focusItems.forEach(item => {
      if (item.code == this.selected.code) {
        item.text = this.message;
      }
    });

    this.position = this.position + emoji.length;
  }

  closeEditor() {
    this.editorvisible = false;
    this.selected = new Item();
  }

  addEmoji(event: any) {
    this.emoticon(event.emoji.native);
  }
}
