import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-register-mobile',
  templateUrl: './register-mobile.component.html',
  styleUrls: ['./register-mobile.component.scss']
})
export class RegisterMobileComponent implements OnInit {
 

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  submitted: boolean = false;
  processing: boolean = false;
  showPassword:boolean = false;
  showConfirmPassword: boolean = false;
  isModalOpen: boolean = false;

  accountService: NewAccountService;
  storageService: NewStorageService;
  toastController: ToastController;

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    confirm: new FormControl<string>('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    notification: new FormControl<boolean>(false),
    terms: new FormControl<boolean>(false),
  });


  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _toastController: ToastController,
    public router: Router
  ) {
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.toastController = _toastController;
  }

  ngOnInit(): void {
  }


 
  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;

    this.form.controls.password.setErrors(null);
    this.form.controls.confirm.setErrors(null);
    this.form.controls.terms.setErrors(null);
    this.form.controls.email.setErrors(null);

    if (this.form.controls.password.value !== this.form.controls.confirm.value) {
      this.form.controls.password.setErrors({ 'mismatch': true });
      this.form.controls.confirm.setErrors({ 'mismatch': true });
      this.processing = false;

      return;
    }

    if (Boolean(this.form.controls.terms.value) !== true) {
      this.form.controls.terms.setErrors({ 'on': true });
      this.processing = false;

      return;
    }

    let email = this.form.controls.email.value!;
    let users = await this.accountService.getByEmail(email);
    if (users.length > 0) {
      this.form.controls.email.setErrors({ 'used': true });
      this.processing = false;

      return;
    }

    let user: INewUser = {
      id: '',
      email: this.form.controls.email.value!,
      firstname: this.form.controls.firstname.value!,
      lastname: this.form.controls.lastname.value!,
      customer: true,
      birthday: '',
      notification: this.form.controls.notification.value!,
      providerId: '',
      photoURL: '',
      address: '',
      greetings_wishlist: []
    }
    user.id = await this.accountService.register(this.form.controls.email.value!, this.form.controls.password.value!);
    await this.accountService.setUser(user);
    this.form.reset();
    this.form.markAsPristine();
    this.submitted = false;
    this.processing = false;
    this.storageService.createUser(user);

    const toast = await this.toastController.create({
      message: "Account created successfully.",
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    window.location.href = "/profile/details";
  }

  togglePasswordVisibility(type: string = '') {

    if(type == '') 
      this.showPassword = !!!this.showPassword;
    else
      this.showConfirmPassword = !!!this.showConfirmPassword;
  }

  onGoogleClick() {
    this.processing = true;
    this.accountService.googleAuthenticate().then(async value => {
      let user = await this.accountService.get(value.id);
      if (user === undefined) {
        let user: INewUser = {
          id: value.id,
          email: value.email,
          firstname: '',
          lastname: '',
          customer: true,
          birthday: '',
          notification: true,
          providerId: value.providerId,
          photoURL: value.photoURL,
          address: '',
          greetings_wishlist: []
        }
        await this.accountService.setUser(user);
        this.form.reset();
        this.form.markAsPristine();
        this.submitted = false;
        this.processing = false;
        this.storageService.createUser(user);

        const toast = await this.toastController.create({
          message: "Account created successfully.",
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        
        window.location.href = "/profile/details";
      }
      else {
        this.storageService.createUser(user);
        this.processing = false;
        window.location.href = "/onboarding";
      }
    }).catch(err => {
      this.processing = false;
    })
  }


  onFacebookClick() {
    this.processing = true;
    this.accountService.googleAuthenticate().then(async value => {
      let user = await this.accountService.get(value.id);
      if (user === undefined) {
        let user: INewUser = {
          id: value.id,
          email: value.email,
          firstname: '',
          lastname: '',
          customer: true,
          birthday: '',
          notification: true,
          providerId: value.providerId,
          photoURL: value.photoURL,
          address: '',
          greetings_wishlist: []
        }
        await this.accountService.setUser(user);
        this.form.reset();
        this.form.markAsPristine();
        this.submitted = false;
        this.processing = false;
        this.storageService.createUser(user);

        const toast = await this.toastController.create({
          message: "Account created successfully.",
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        
        window.location.href = "/profile/details";
      }
      else {
        this.storageService.createUser(user);
        this.router.navigate(['/onboarding']);
        this.processing = false;
      }
    }).catch(err => {
      this.processing = false;
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${event.detail.data}!`;
    }
  }

  setOpen() {
    this.isModalOpen = !!!this.isModalOpen;
  }
  
  cancel() {
    this.isModalOpen = !!!this.isModalOpen;
  }

}
