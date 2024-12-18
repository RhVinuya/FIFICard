import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewErrorMessageComponent } from 'src/app/new-components/new-error-message/new-error-message.component';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewReferralService } from 'src/app/new-services/new-referral.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.scss']
})
export class NewRegistrationComponent implements OnInit {

  activateRoute: ActivatedRoute;
  accountService: NewAccountService;
  storageService: NewStorageService;
  referralService: NewReferralService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _referralService: NewReferralService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.referralService = _referralService;
    this.modalService = _modalService;
    this.router = _router;
    this.ref = _ref;
  }

  form = new FormGroup({
    code: new FormControl<string>(''),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    birthday: new FormControl<Date | null>(null, [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    confirm: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    notification: new FormControl<boolean>(true),
    terms: new FormControl<boolean>(false),
  });

  code: string = '';
  submitted: boolean = false;
  processing: boolean = false;
  showPassword: boolean = false;
  showConfirm: boolean = false;


  ngOnInit(): void {
    this.activateRoute.params.subscribe(async params => {
      if (params['code']) {
        this.code = params['code'];
        this.ref.detectChanges();
        this.referralService.get(this.code).then(value => {
          if (value) {
            if (value.status === 'Signin') {
              const reference = this.modalService.open(NewErrorMessageComponent, { animation: true });
              reference.componentInstance.title = "REFERRAL";
              reference.componentInstance.message = "User already sign in.";
              reference.componentInstance.button = "OK";
              reference.componentInstance.onContinue.subscribe((value: any) => {
                reference.close();
              })
            }
            else {
              this.form.controls.code.setValue(this.code);
              this.form.controls.email.setValue(value.email);
            }
          }
          else {
            const reference = this.modalService.open(NewErrorMessageComponent, { animation: true });
            reference.componentInstance.title = "REFERRAL";
            reference.componentInstance.message = `Referral Code ${this.code} not found`;
            reference.componentInstance.button = "OK";
            reference.componentInstance.onContinue.subscribe((value: any) => {
              reference.close();
            })
          }
        })
      }
    });
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
    this.ref.detectChanges();

    const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
    reference.componentInstance.title = "SUCCESSFULL";
    reference.componentInstance.message = "Account created successfully.";
    reference.componentInstance.button = "CONTINUE";
    reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
      this.router.navigate(['/new/profile/info']);
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
          address: '',
          greetings_wishlist: []
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
          this.router.navigate(['/new/registration/complete/' + user.id]);
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
