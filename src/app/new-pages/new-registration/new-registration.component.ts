import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.scss']
})
export class NewRegistrationComponent implements OnInit {

  accountService: NewAccountService;
  storageService: NewStorageService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;

  constructor(
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef
  ) {
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.modalService = _modalService;
    this.router = _router;
    this.ref = _ref;
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    birthday: new FormControl<Date | null>(null, [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    confirm: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    notification: new FormControl<boolean>(true),
    terms: new FormControl<boolean>(false),
  });

  submitted: boolean = false;
  processing: boolean = false;
  showPassword: boolean = false;
  showConfirm: boolean = false;


  ngOnInit(): void {
  }

  onChangeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onChangeShowConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();

    this.form.controls.birthday.setErrors(null);
    this.form.controls.password.setErrors(null);
    this.form.controls.confirm.setErrors(null);
    this.form.controls.terms.setErrors(null);
    this.form.controls.email.setErrors(null);

    if (new Date(this.form.controls.birthday.value!).getTime() >= (new Date).getTime()) {
      this.form.controls.birthday.setErrors({ 'invalid': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    if (this.form.controls.password.value !== this.form.controls.confirm.value) {
      this.form.controls.password.setErrors({ 'mismatch': true });
      this.form.controls.confirm.setErrors({ 'mismatch': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    if (Boolean(this.form.controls.terms.value) !== true) {
      this.form.controls.terms.setErrors({ 'on': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    let email = this.form.controls.email.value!;
    let users = await this.accountService.getByEmail(email);
    if (users.length > 0) {
      this.form.controls.email.setErrors({ 'used': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    let user: INewUser = {
      id: '',
      email: this.form.controls.email.value!,
      firstname: this.form.controls.firstname.value!,
      lastname: this.form.controls.lastname.value!,
      customer: true,
      birthday: this.form.controls.birthday.value!.toString(),
      notification: this.form.controls.notification.value!,
      providerId: '',
      photoURL: '',
      address: ''
    }
    user.id = await this.accountService.register(this.form.controls.email.value!, this.form.controls.password.value!);
    await this.accountService.setUser(user);
    this.form.reset();
    this.form.markAsPristine();
    this.submitted = false;
    this.processing = false;
    this.storageService.createUser(user);
    this.ref.detectChanges();

    const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
    reference.componentInstance.title = "SUCCESSFULL";
    reference.componentInstance.message = "Account created successfully.";
    reference.componentInstance.button = "CONTINUE";
    reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
      this.router.navigate(['/new/profile']);
    })
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
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
        this.router.navigate(['/']);
        this.processing = false;
      }
    }).catch(err => {
      this.processing = false;
    })
  }

}
