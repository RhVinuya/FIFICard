import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewChangePasswordComponent } from 'src/app/new-components/new-change-password/new-change-password.component';
import { ChangePasswordConfirmMessageComponent } from 'src/app/new-components/new-change-password/change-password-confirm-message/change-password-confirm-message.component';
import { NewChangeEmailComponent } from 'src/app/new-components/new-change-email/new-change-email.component';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit, OnDestroy {

  storageService: NewStorageService;
  modalService: NgbModal;
  router: Router;

  constructor(
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router
  ) {
    this.storageService = _storageService;
    this.modalService = _modalService;
    this.router = _router;
  }

  subs: Subscription;
  user: INewUser | undefined;

  ngOnInit(): void {
    this.subs = timer(100, 500).subscribe(time => {
      this.user = this.storageService.getUser();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }

  onChangePasswordClicked() {
    const reference = this.modalService.open(NewChangePasswordComponent, { animation: true });
    reference.componentInstance.onSuccess.subscribe((value: any) => {
      reference.close();
      const reference2 = this.modalService.open(ChangePasswordConfirmMessageComponent, { animation: true });
      reference2.componentInstance.onContinue.subscribe((value: any) => {
        reference2.close();
      });
    })
  }

  onChangeEmailClicked() {
    this.modalService.open(NewChangeEmailComponent, { animation: true });
  }

  onChangeDefault(addressId: string) {
    if (this.user) {
      this.user.address = addressId;
      this.storageService.createUser(this.user);
    }
  }

  onLogout(){
    const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
    reference.componentInstance.title = 'Logout';
    reference.componentInstance.message = "Confirm User Logout?";
    reference.componentInstance.yes = 'LOGOUT';
    reference.componentInstance.no = 'CANCEL';
    let resultSubs = reference.componentInstance.result.subscribe((value: any) => {
      if (value) this.storageService.clearUser();
      reference.close();
      resultSubs.unsubscribe();
    })
  }
}
