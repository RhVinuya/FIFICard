import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService, UpdateResponse } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-change-email',
  templateUrl: './new-change-email.component.html',
  styleUrls: ['./new-change-email.component.scss']
})
export class NewChangeEmailComponent implements OnInit {
  @Output() onSuccess: EventEmitter<boolean> = new EventEmitter();


  step: number = 1;
  activeModal: NgbActiveModal;
  accountService: NewAccountService;
  storageService: NewStorageService;
  toastController: ToastController;
  ref: ChangeDetectorRef;
  user: INewUser | undefined;

  emailError: string = "";
  passwordError: string = "";

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
  });

  submitted: boolean = false;
  processing: boolean = false;
  showPassword: boolean = false;

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    this.form.patchValue({
      email: this.user!.email,
      password: ""
    })
  
  }
  get email() {
    return this.form.get('email');
  }
  
  get password() {
    return this.form.get('password');
  }

  onChangeShowPassword( ) {
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

    this.form.controls.password.setErrors(null);
    let result: UpdateResponse  = await this.accountService.changeEmail(this.user!.email, this.form.value.email! , this.form.value.password!);
    if (result.status == "success") {
      this.processing = false;
      this.submitted = false;
      this.onSuccess.emit(true);
      this.close();
    } else {

      switch(result.type) {
        case 'updateemail': 
            this.form.controls['email'].setErrors({ 'error': true });
            this.emailError = result.message;
            this.step = 1;
          break;
        case 'signin':
            this.form.controls['password'].setErrors({ 'error': true });
            this.passwordError = result.message;
            this.step = 2;
          break;
      }

      this.processing = false;

      return;
    }
  }

  checkEmail() {
    this.step = 2;
    this.emailError = "";
  }

  confirmPassword() {
    this.passwordError = "";
    this.processing = true;
    this.submit().then( () => {

    })
  }
}
