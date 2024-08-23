import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-profile-details',
  templateUrl: './new-profile-details.component.html',
  styleUrls: ['./new-profile-details.component.scss']
})
export class NewProfileDetailsComponent implements OnInit {
  @Input() user: INewUser;

  accountService: NewAccountService;
  storageService: NewStorageService;
  toastController: ToastController;
  ref: ChangeDetectorRef;

  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _toastController: ToastController,
    _ref: ChangeDetectorRef
  ) { 
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.toastController = _toastController;
    this.ref = _ref;
  }

  form = new FormGroup({
    firstname: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
    lastname: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthday: new FormControl<string>('', [Validators.required]),
  });

  id: string;
  isEdit: boolean = false;
  submitted: boolean = false;
  processing: boolean = false;

  ngOnInit(): void {
    this.form.controls.firstname.setValue(this.user.firstname);
    this.form.controls.lastname.setValue(this.user.lastname);
    this.form.controls.email.setValue(this.user.email);
    this.form.controls.birthday.setValue(this.user.birthday);
  }

  onClickEdit() {
    this.isEdit = true;
  }

  onClickCancel() {
    this.isEdit = false;
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;

    let iUser = this.user;
    iUser.firstname = this.form.controls.firstname.value!;
    iUser.lastname = this.form.controls.lastname.value!;
    iUser.birthday = this.form.controls.birthday.value!;

    await this.accountService.updateUserInfo(iUser);
    this.storageService.createUser(iUser);

    this.submitted = false;
    this.processing = false;
    this.isEdit = false;

    const toast = await this.toastController.create({
      message: "User basic information saved!",
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    
    this.ref.detectChanges();
  }

}
