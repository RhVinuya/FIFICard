import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';
import { INewReferral } from 'src/app/new-models/new-referral';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewReferralService } from 'src/app/new-services/new-referral.service';

@Component({
  selector: 'app-new-refer-a-friend-modal',
  templateUrl: './new-refer-a-friend-modal.component.html',
  styleUrls: ['./new-refer-a-friend-modal.component.scss']
})
export class NewReferAFriendModalComponent implements OnInit {
  @Input() id: string;
  @Input() referrals: INewReferral[];
  @Output() onUpdate: EventEmitter<void> = new EventEmitter();

  referralService: NewReferralService;
  accountService: NewAccountService;
  activeModal: NgbActiveModal;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _referralService: NewReferralService,
    _accountService: NewAccountService,
    _activeModal: NgbActiveModal,
    _modalService: NgbModal,
    _ref: ChangeDetectorRef
  ) {
    this.referralService = _referralService;
    this.accountService = _accountService;
    this.activeModal = _activeModal;
    this.modalService = _modalService;
    this.ref = _ref;
  }

  submitted: boolean = false;
  processing: boolean = false;

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.form.controls.email.setErrors(null);
    
    this.processing = true;
    this.ref.detectChanges();

    let email = this.form.controls.email.value!

    let users = await this.accountService.getByEmail(email);
    if (users.length > 0) {
      this.form.controls.email.setErrors({ 'used': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    let search = this.referrals.find(x => x.email === email)
    if (search) {
      this.form.controls.email.setErrors({ 'pending': true });
      this.processing = false;
      this.ref.detectChanges();
      return;
    }

    let referral: INewReferral = {
      id: this.referralService.getRandomString(),
      referredby: this.id,
      email: email,
      status: 'Pending',
      created: undefined
    }

    await this.referralService.create(referral);

    const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
    reference.componentInstance.title = "REFER A FRIEND";
    reference.componentInstance.message = "LINK SEND SUCCESSFULLY.";
    reference.componentInstance.button = "CONTINUE";
    reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
      this.form.reset();
      this.form.markAsPristine();
      this.submitted = false;
      this.processing = false;
      this.referrals.push(referral);
      this.onUpdate.emit();
      this.ref.detectChanges();
    })
  }

}
