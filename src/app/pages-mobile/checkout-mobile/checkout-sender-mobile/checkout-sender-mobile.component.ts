import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewSender } from 'src/app/new-models/new-payment';

@Component({
  selector: 'app-checkout-sender-mobile',
  templateUrl: './checkout-sender-mobile.component.html',
  styleUrls: ['./checkout-sender-mobile.component.scss']
})
export class CheckoutSenderMobileComponent implements OnInit {
  @Input() sender: INewSender;
  @Output() onChange: EventEmitter<INewSender> = new EventEmitter();

  activeModal: NgbActiveModal;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _ref: ChangeDetectorRef
  ) { 
    this.activeModal = _activeModal;
    this.ref = _ref;
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required])
  });
  submitted: boolean = false;
  processing: boolean = false;

  ngOnInit(): void {
    this.form.setValue(this.sender)
  }

  close() {
    this.activeModal.close();
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();
    this.onChange.emit(this.form.value as INewSender)
    this.submitted = false;
    this.processing = false;
  }

}
