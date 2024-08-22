import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewUser } from 'src/app/new-models/new-user';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewInfoMessageComponent } from '../new-info-message/new-info-message.component';

@Component({
  selector: 'app-new-change-password',
  templateUrl: './new-change-password.component.html',
  styleUrls: ['./new-change-password.component.scss']
})
export class NewChangePasswordComponent implements OnInit {
  @Output() onSuccess: EventEmitter<boolean> = new EventEmitter();

  activeModal: NgbActiveModal;
  accountService: NewAccountService;
  storageService: NewStorageService;
  toastController: ToastController;
  ref: ChangeDetectorRef;
  user: INewUser | undefined;

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
    currentpassword: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    newpassword: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    confirmpassword: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
  });

  submitted: boolean = false;
  processing: boolean = false;
  showPassword: any = {
    current: false,
    new: false,
    confirm: false
  };

  ngOnInit(): void {

    
    this.user = this.storageService.getUser();
  }

  onChangeShowPassword(type: 'current' | 'new' | 'confirm' ) {
    this.showPassword.current = type == 'current'? !this.showPassword.current : this.showPassword.current;
    this.showPassword.new = type == 'new'? !this.showPassword.new : this.showPassword.new;
    this.showPassword.confirm = type == 'confirm'? !this.showPassword.confirm : this.showPassword.confirm;
  }

  close() {
    this.activeModal.close();
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();

    this.form.controls.currentpassword.setErrors(null);
    this.form.controls.newpassword.setErrors(null);
    this.form.controls.confirmpassword.setErrors(null);

    if (this.form.value.newpassword == this.form.value.confirmpassword) {
      this.form.controls['newpassword'].setErrors(null);
      this.form.controls['confirmpassword'].setErrors(null);
      

      let authenticate: boolean = await this.accountService.changePassword(this.user!.email, this.form.value.currentpassword!, this.form.value.newpassword!);
      if (authenticate) {
        this.processing = false;
        this.submitted = false;
        this.onSuccess.emit(true);
        this.close();
      }
      else {
        this.form.controls['currentpassword'].setErrors({ 'error': true });
        this.processing = false;
        return;
      }
    }
    else {
      this.form.controls['newpassword'].setErrors({ 'mismatch': true });
      this.form.controls['confirmpassword'].setErrors({ 'mismatch': true });
      this.processing = false;
      return;
    }
  }
}
