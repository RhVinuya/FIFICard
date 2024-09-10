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
  router: Router;

  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router,
  ) {
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.router = _router;
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
    console.log(0);
    this.submitted = true;
    console.log(this.form);
    if (this.form.invalid) return;
    this.processing = true;

    console.log(1);
    this.form.controls.email.setErrors(null);
    this.form.controls.password.setErrors(null);

    console.log(2);
    let email = this.form.controls.email.value!;
    let users = await this.accountService.getByEmail(email);
    if (users.length === 0) {
      this.form.controls.email.setErrors({ 'notfound': true });
      this.processing = false;
      return;
    }

    console.log(3);
    let password = this.form.controls.password.value!;
    this.accountService.authenticate(email, password).then(async id => {
      console.log(4);
      let user = await this.accountService.get(id);

      if (this.form.controls.remember.value === true) this.storageService.createRemember(email, password)
      else this.storageService.clearRemember();

      this.form.reset();
      this.form.markAsPristine();
      this.submitted = false;
      this.processing = false;

      if (user) {
        this.storageService.createUser(user);
        this.router.navigate(['/home']);
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
}
