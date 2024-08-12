import { UploadTask } from '@angular/fire/storage';
import { ImageService } from 'src/app/services/image.service';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  @Input() set image(_image: string) {
    if (_image != '')
      this.loadImage(_image);
    else {
      this.url = '';
      this.status = 'NOIMAGE';
    }
  }
  @Input() set scale(_scale: number) {
    this.imageScale = _scale;
    this.ref.detectChanges();
  }
  @Input() set top(_top: number) {
    this.imageTop = _top;
    this.ref.detectChanges();
  }
  @Input() set left(_left: number) {
    this.imageLeft = _left;
    this.ref.detectChanges();
  }

  @Output() onChange: EventEmitter<string> = new EventEmitter();
  @Output() onDetails: EventEmitter<any> = new EventEmitter();

  imageService: ImageService;
  ref: ChangeDetectorRef;

  constructor(
    _imageService: ImageService,
    _ref: ChangeDetectorRef
  ) {
    this.imageService = _imageService;
    this.ref = _ref;
  }

  status: 'NOIMAGE' | 'UPLOADING' | 'WITHIMAGE' = 'NOIMAGE';
  percentage: number = 0;
  url: string = '';
  imageScale: number = 1;
  imageTop: number = 0;
  imageLeft: number = 0;

  ngOnInit(): void {
  }

  onUpload(event: any) {
    this.status = 'UPLOADING';
    let uploadTask: UploadTask = this.imageService.upload(event.target.files[0]);
    uploadTask.on('state_changed',
      snapshot => {
        this.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.ref.detectChanges();
      },
      error => {
        //
      },
      () => {
        this.onChange.emit(uploadTask.snapshot.ref.fullPath);
        this.loadImage(uploadTask.snapshot.ref.fullPath);
        this.ref.detectChanges();
      });
  }

  loadImage(image: string) {
    this.status = 'WITHIMAGE';
    this.ref.detectChanges();
    this.imageService.getImageURL(image).then(url => {
      this.url = url;
      this.ref.detectChanges();
    })
  }

  getScale(){
    return 'scale(' + this.imageScale + ',' +  this.imageScale + ')';
  }

  changeSize(add:boolean){
    if (add){
      this.imageScale += 0.1;
    }
    else{
      this.imageScale -= 0.1;
    }
    this.onDetails.emit({
      scale: this.imageScale,
      top: this.imageTop,
      left: this.imageLeft
    })
    this.ref.detectChanges();
  }

  changeTop(add: boolean){
    if (add){
      this.imageTop += 1;
    }
    else{
      this.imageTop -= 1;
    }
    this.onDetails.emit({
      scale: this.imageScale,
      top: this.imageTop,
      left: this.imageLeft
    })
    this.ref.detectChanges();
  }

  changeLeft(add: boolean){
    if (add){
      this.imageLeft += 1;
    }
    else{
      this.imageLeft -= 1;
    }
    this.onDetails.emit({
      scale: this.imageScale,
      top: this.imageTop,
      left: this.imageLeft
    })
    this.ref.detectChanges();
  }
}
