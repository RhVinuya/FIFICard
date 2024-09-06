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
  }

  onChangeShowPassword() {
  }

  close() {
  }

  async submit() {
  }

  onGoogleClick() {
  }

  onResetPassword() {
  }
}
