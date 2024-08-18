import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit, OnDestroy {

  storageService: NewStorageService;
  modalService: NgbModal;

  constructor(
    _storageService: NewStorageService,
    _modalService: NgbModal
  ) { 
    this.storageService = _storageService;
    this.modalService = _modalService
  }

  subs: Subscription;
  user: INewUser | undefined;
  
  ngOnInit(): void {
    this.subs = timer(100, 500).subscribe(time => {
      let value = this.storageService.getUser()
      this.user = value === undefined ? undefined : value;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onClickSignIn(){
    this.modalService.open(NewLoginComponent, { animation: true });
  }

}
