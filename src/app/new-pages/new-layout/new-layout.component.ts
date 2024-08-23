import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  storageService: NewStorageService;
  modalService: NgbModal;

  constructor(
    _storageService: NewStorageService,
    _modalService: NgbModal
  ) { 
    this.storageService = _storageService;
    this.modalService = _modalService
  }

  showHeader: boolean = false;
  showMenu: boolean = false;
  user: INewUser | undefined;

  ngOnInit(): void {
    timer(100, 500).subscribe(time => {
      let value = this.storageService.getUser()
      this.user = value === undefined ? undefined : value;
    });
  }

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }

  ionViewDidEnter() {
    this.content.scrollToTop(0);
  }

  onShowMenu(value: boolean) {
    this.showMenu = value;
  }

  onClickSignIn(){
    this.modalService.open(NewLoginComponent, { animation: true});
  }
}
