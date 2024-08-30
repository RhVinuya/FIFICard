import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewInfoMessageComponent } from '../new-info-message/new-info-message.component';
import { NewPasswordResetComponent } from '../new-password-reset/new-password-reset.component';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {
  @Output() onLogin: EventEmitter<INewUser> = new EventEmitter();

  activeModal: NgbActiveModal;
  accountService: NewAccountService;
  storageService: NewStorageService;
  modalService: NgbModal;
  router: Router;
  toastController: ToastController;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router,
    _toastController: ToastController,
    _ref: ChangeDetectorRef
  ) {
    this.activeModal = _activeModal;
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.modalService = _modalService;
    this.router = _router;
    this.toastController = _toastController;
    this.ref = _ref
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    remember: new FormControl<boolean>(false)
  });

  submitted: boolean = false;
  processing: boolean = false;
  showPassword: boolean = false;

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
    this.activeModal.close();
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();

    this.form.controls.email.setErrors(null);
    this.form.controls.password.setErrors(null);

    let email = this.form.controls.email.value!;
    let users = await this.accountService.getByEmail(email);
    if (users.length === 0) {
      this.form.controls.email.setErrors({ 'notfound': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    let password = this.form.controls.password.value!;
    this.accountService.authenticate(email, password).then(async id => {
      let user = await this.accountService.get(id);

      if (this.form.controls.remember.value === true) this.storageService.createRemember(email, password)
      else this.storageService.clearRemember();

      this.form.reset();
      this.form.markAsPristine();
      this.submitted = false;
      this.processing = false;
      this.ref.detectChanges();

      if (user) {
        this.storageService.createUser(user);
        
        const toast = await this.toastController.create({
          message: 'Welcome ' + (user.firstname ? user.firstname : user.email),
          duration: 1500,
          position: 'top',
        });
        await toast.present();

        this.onLogin.emit(user);
        this.activeModal.close();
      }
    }).catch(err => {
      this.form.controls.password.setErrors({ 'failed': true });
      this.processing = false;
      this.ref.detectChanges();
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
          address: ''
        }
        await this.accountService.setUser(user);
        this.form.reset();
        this.form.markAsPristine();
        this.submitted = false;
        this.processing = false;
        this.storageService.createUser(user);
        this.onLogin.emit(user);
        this.activeModal.close();
        this.ref.detectChanges();
        const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
        reference.componentInstance.title = "SUCCESSFULL";
        reference.componentInstance.message = "Account created successfully.";
        reference.componentInstance.button = "CONTINUE";
        reference.componentInstance.onContinue.subscribe((value: any) => {
          reference.close();
          this.router.navigate(['/new/registration/complete/' + value.id]);
        })
      }
      else {
        this.storageService.createUser(user);
        const toast = await this.toastController.create({
          message: 'Welcome ' + (user.firstname ? user.firstname : user.email),
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        this.onLogin.emit(user);
        this.activeModal.close();
        this.processing = false;
      }
    }).catch(err => {
      this.processing = false;
    })
  }

  onResetPassword() {
    this.activeModal.close();
    const reference = this.modalService.open(NewPasswordResetComponent, { animation: true });
    if (this.form.controls.email.value) reference.componentInstance.email = this.form.controls.email.value!;
  }
}
