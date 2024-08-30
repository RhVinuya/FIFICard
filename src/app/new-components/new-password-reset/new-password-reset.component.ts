import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewInfoMessageComponent } from '../new-info-message/new-info-message.component';

@Component({
  selector: 'app-new-password-reset',
  templateUrl: './new-password-reset.component.html',
  styleUrls: ['./new-password-reset.component.scss']
})
export class NewPasswordResetComponent implements OnInit {
  @Input() email: string; 

  activeModal: NgbActiveModal;
  modalService: NgbModal;
  accountService: NewAccountService;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _modalService: NgbModal,
    _accountService: NewAccountService,
    _ref: ChangeDetectorRef
  ) {
    this.activeModal = _activeModal;
    this.modalService = _modalService;
    this.accountService = _accountService;
    this.ref = _ref
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  submitted: boolean = false;
  processing: boolean = false;
  error: string = '';

  ngOnInit(): void {
    if (this.email !== '') this.form.controls.email.setValue(this.email);
  }

  close() {
    this.activeModal.close();
  }

  complete(){
    this.activeModal.close();
    const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
    reference.componentInstance.title = 'Password Reset'
    reference.componentInstance.message = 'Password reset email has been sent to you email.'
    reference.componentInstance.button = 'Continue';
    const continueRef = reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
      continueRef.unsubscribe();
    })
  }

  async submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();

    let email = this.form.controls.email.value!;
    let iUsers = await this.accountService.getByEmail(email);
    if (iUsers.length === 0) {
      this.error = 'Unregister email address.'
      this.processing = false;
      return;
    }
    else {
      let iUser = iUsers[0];
      if (iUser.providerId === 'google.com') {
        this.error = 'This email address is register via Google.'
        this.processing = false;
        return;
      }
      else {
        this.accountService.passwordReset(email).then(_=> {
          this.processing = false;
          this.complete();
        }).catch(err => {
          this.error = 'Encounter an error while processing.'
          this.processing = false;
          return;
        })
        
      }
    }
  }

}
