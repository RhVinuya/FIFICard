import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

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
  toastController: ToastController;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _accountService: NewAccountService,
    _storageService: NewStorageService, 
    _toastController: ToastController,
    _ref: ChangeDetectorRef
  ) {
    this.activeModal = _activeModal;
    this.accountService = _accountService;
    this.storageService = _storageService;
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

  ngOnInit(): void {
    let remember = this.storageService.getRemember();
    if (remember.email !== null) this.form.controls.email.setValue(remember.email);
    if (remember.password !== null) this.form.controls.password.setValue(remember.password);
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

      this.storageService.createUser(user);
      
      const toast = await this.toastController.create({
        message: 'Welcome ' + (user.firstname ? user.firstname : user.email),
        duration: 1500,
        position: 'top',
      });
      await toast.present();
      
      this.onLogin.emit(user);
      this.activeModal.close();
    }).catch(err => {
      this.form.controls.password.setErrors({ 'failed': true });
      this.processing = false;
      this.ref.detectChanges();
    })
  }
}