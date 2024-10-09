import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    public router: Router,
  ) {
    this.accountService = _accountService;
    this.storageService = _storageService;
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

      this.form.reset();
      this.form.markAsPristine();
      this.submitted = false;
      this.processing = false;

      if (user) {
        this.storageService.createUser(user);
        window.location.href = "/cards";
      }
    }).catch(err => {
      console.log(err);
      this.form.controls.password.setErrors({ 'failed': true });
      this.processing = false;
    })
  }

  onGoogleClick() {
  }

  onResetPassword() {
  }

  togglePasswordVisibility(type: string = '') {
      this.showPassword = !!!this.showPassword;
  }
}
