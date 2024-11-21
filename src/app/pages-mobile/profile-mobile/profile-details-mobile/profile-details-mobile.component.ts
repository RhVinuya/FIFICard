import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';



@Component({
  selector: 'app-profile-details-mobile',
  templateUrl: './profile-details-mobile.component.html',
  styleUrls: ['./profile-details-mobile.component.scss']
})
export class ProfileDetailsMobileComponent implements OnInit {
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  
  user: INewUser | undefined;
  submitted: boolean = false;
  processing: boolean = false;
  isEditing = false;
  showPasswordForm = false;
  showPassCurrent = false;
  showPassNew = false;
  showPassConfirm = false;

  
  form = new FormGroup({
    firstname: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
    lastname: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthday: new FormControl<string>('', [Validators.required]),
  });

  passwordForm = new FormGroup({
    current: new FormControl<string>('', [Validators.required,  Validators.minLength(5)]),
    new: new FormControl<string>('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    confirm: new FormControl<string>('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)])
  });

  accountService: NewAccountService;
  storageService: NewStorageService;

  constructor(
    public router: Router,
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    private toastController: ToastController
  ) {
    
    this.accountService = _accountService;
    this.storageService = _storageService;
  }
  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.storageService.getUser();

    if(this.user) {
      this.form.controls.firstname.setValue(this.user.firstname);
      this.form.controls.lastname.setValue(this.user.lastname);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.birthday.setValue(this.user.birthday);
    }

    this.form.markAsPristine();
  }

  async submit() {
    console.log('submit');
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;

    let iUser = this.user;
    iUser!.firstname = this.form.controls.firstname.value!;
    iUser!.lastname = this.form.controls.lastname.value!;
    iUser!.birthday = this.form.controls.birthday.value!;

    await this.accountService.updateUserInfo(iUser!);
    this.storageService.createUser(iUser!);

    this.submitted = false;
    this.processing = false;
    this.loadUserData();        
    const toast = await this.toastController.create({
      message: 'Profile successfully updated!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

  }


  async changePasswordSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) return;
    this.processing = true;

    this.passwordForm.controls.current.setErrors(null);
    this.passwordForm.controls.new.setErrors(null);
    this.passwordForm.controls.confirm.setErrors(null);

    if (this.passwordForm.value.new == this.passwordForm.value.confirm) {
      this.passwordForm.controls['new'].setErrors(null);
      this.passwordForm.controls['confirm'].setErrors(null);
      

      let authenticate: boolean = await this.accountService.changePassword(this.user!.email, this.passwordForm.value.current!, this.passwordForm.value.new!);
      if (authenticate) {
        this.processing = false;
        this.submitted = false;

        this.passwordForm.markAsPristine();
        this.showPasswordForm = false;

        const toast = await this.toastController.create({
          message: 'Password successfully changed!',
          duration: 1500,
          position: 'bottom',
        });
    
        await toast.present();
        window.location.reload();
      }
      else {
        this.passwordForm.controls['current'].setErrors({ 'incorrect': true });
        this.processing = false;
        return;
      }
    }
    else {
      this.passwordForm.controls['new'].setErrors({ 'mismatch': true });
      this.passwordForm.controls['confirm'].setErrors({ 'mismatch': true });
      this.processing = false;
      return;
    }
  }

  changePasswordToggle() {
    this.showPasswordForm = !!!this.showPasswordForm;
    if(this.showPasswordForm) {
      this.passwordForm.controls['current'].setErrors(null);
      this.passwordForm.controls['new'].setErrors(null);
      this.passwordForm.controls['confirm'].setErrors(null);
    }
  }

}
