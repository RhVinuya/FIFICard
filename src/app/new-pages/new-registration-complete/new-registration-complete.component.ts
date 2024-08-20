import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-registration-complete',
  templateUrl: './new-registration-complete.component.html',
  styleUrls: ['./new-registration-complete.component.scss']
})
export class NewRegistrationCompleteComponent implements OnInit {

  activateRoute: ActivatedRoute;
  accountService: NewAccountService;
  storageService: NewStorageService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _accountService: NewAccountService,
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef
  ) { 
    this.activateRoute = _activateRoute;
    this.accountService = _accountService;
    this.storageService = _storageService;
    this.modalService = _modalService;
    this.router = _router;
    this.ref = _ref;
  }

  form = new FormGroup({
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    birthday: new FormControl<Date | null>(null, [Validators.required]),
    notification: new FormControl<boolean>(true),
    terms: new FormControl<boolean>(false),
  });

  user: INewUser | undefined;
  submitted: boolean = false;
  processing: boolean = false;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async params => {
      this.user = await this.accountService.get(params['id']);
      console.log(this.user)
    });
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();

    this.form.controls.birthday.setErrors(null);
    this.form.controls.terms.setErrors(null);

    if (new Date(this.form.controls.birthday.value!).getTime() >= (new Date).getTime()) {
      this.form.controls.birthday.setErrors({ 'invalid': true });
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

    if(this.user) {
      this.user.firstname = this.form.controls.firstname.value!;
      this.user.lastname = this.form.controls.lastname.value!;
      this.user.birthday = this.form.controls.birthday.value!.toString();
      this.user.notification = this.form.controls.notification.value!
      await this.accountService.setUser(this.user);
      this.form.reset();
      this.form.markAsPristine();
      this.submitted = false;
      this.processing = false;
      this.ref.detectChanges();

      const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
      reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
      this.router.navigate(['/']);
    })

    }
  }
}
