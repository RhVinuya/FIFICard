import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPasswordResetComponent } from 'src/app/new-components/new-password-reset/new-password-reset.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent implements OnInit {

  accountService: NewAccountService;
  storageService: NewStorageService;
  modalService: NgbModal;
  toastController: ToastController;
  router: Router;

  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _toastController: ToastController,
    _router: Router
  ) {
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.modalService = _modalService;
    this.toastController = _toastController;
    this.router = _router;
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    remember: new FormControl<boolean>(false)
  });

  formReset = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });


  submitted: boolean = false;
  processing: boolean = false;
  showPassword: boolean = false;

  submittedReset: boolean = false;
  processingReset: boolean = false;
  error: string = '';

  async ngOnInit(): Promise<void> {
    let remember = this.storageService.getRemember();
    if (remember.email !== null) this.form.controls.email.setValue(remember.email);
    if (remember.password !== null) {
      this.form.controls.password.setValue(remember.password);
      this.form.controls.remember.setValue(true);
    }
  }

  onChangeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  close() {
  }

  cancel() {

  }

  confirm() {

  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;

    this.form.controls.email.setErrors(null);
    this.form.controls.password.setErrors(null);

    let email = this.form.controls.email.value!;
    let users = await this.accountService.getByEmail(email);
    if (users.length === 0) {
      this.form.controls.email.setErrors({ 'notfound': true });
      this.processing = false;
      return;
    }

    let password = this.form.controls.password.value!;
    this.accountService.authenticate(email, password).then(async id => {
      let user = await this.accountService.get(id);

      if (this.form.controls.remember.value === true) this.storageService.createRemember(email, password)
      else this.storageService.clearRemember();


      if (user) {
        this.storageService.createUser(user);
        const toast = await this.toastController.create({
          message: 'Welcome ' + (user.firstname ? user.firstname : user.email),
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        this.submitted = false;
        this.processing = false;
        this.form.reset();
        this.form.markAsPristine();
        this.router.navigate(["/new/cards"]);
      }
    }).catch(err => {
      console.log(err);
      this.form.controls.password.setErrors({ 'failed': true });
      this.processing = false;
    })
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
        
        window.location.href = "/cards";
      }
      else {
        this.storageService.createUser(user);
        const toast = await this.toastController.create({
          message: 'Welcome ' + (user.firstname ? user.firstname : user.email),
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        this.processing = false;
        window.location.href = "/cards";
      }
    }).catch(err => {
      this.processing = false;
    })
  }

  onResetPassword() {
    const reference = this.modalService.open(NewPasswordResetComponent, { animation: true, centered: true, size: "sm" });
    if (this.form.controls.email.value) reference.componentInstance.email = this.form.controls.email.value!;
  }

  togglePasswordVisibility(type: string = '') {
      this.showPassword = !!!this.showPassword;
  }

  async submitReset() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;

    let email = this.form.controls.email.value!;
    let iUsers = await this.accountService.getByEmail(email);
    if (iUsers.length === 0) {
      this.error = 'Unregister email address.'
      this.processing = false;
      return;
    }
    else {
      let iUser = iUsers[0];
      if (iUser.providerId === 'google.com') {
        this.error = 'This email address is register via Google.'
        this.processing = false;
        return;
      }
      else {
        this.accountService.passwordReset(email).then( async (_)=> {
          this.processing = false;
          await this.complete();
        }).catch(err => {
          this.error = 'Encounter an error while processing.'
          this.processing = false;
          return;
        })
        
      }
    }
  }

  async complete(){
    const toast = await this.toastController.create({
      message: "Password reset email has been sent to you email..",
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }

}
