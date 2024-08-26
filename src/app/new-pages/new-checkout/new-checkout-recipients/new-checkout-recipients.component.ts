import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCreateAddressComponent } from 'src/app/new-components/new-create-address/new-create-address.component';
import { INewAddress, NewAddress } from 'src/app/new-models/new-address';
import { NewAccountService } from 'src/app/new-services/new-account.service';

@Component({
  selector: 'app-new-checkout-recipients',
  templateUrl: './new-checkout-recipients.component.html',
  styleUrls: ['./new-checkout-recipients.component.scss']
})
export class NewCheckoutRecipientsComponent implements OnInit {
  @Input() id: string;
  @Input() iAddresses: INewAddress[];
  @Input() defaultAddressId: string;
  @Input() selected: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  @Output() onChangeDefault: EventEmitter<string> = new EventEmitter();
  @Output() onAddressChange: EventEmitter<INewAddress> = new EventEmitter();

  accountService: NewAccountService;
  activeOffcanvas: NgbActiveOffcanvas;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _accountService: NewAccountService,
    _activeOffcanvas: NgbActiveOffcanvas,
    _modalService: NgbModal,
    _ref: ChangeDetectorRef 
  ) { 
    this.accountService = _accountService;
    this.activeOffcanvas = _activeOffcanvas;
    this.modalService = _modalService;
    this.ref = _ref;
  }

  addresses: NewAddress[] = [];

  ngOnInit(): void {
    this.iAddresses.forEach(value => {
      this.addresses.push(new NewAddress(value))
    })
  }

  close(){
    this.activeOffcanvas.close()
  }

  onClick(id: string) {
    if (id !== this.selected) this.onChange.emit(id);
  }

  onClickCreate() {
    const reference = this.modalService.open(NewCreateAddressComponent, { animation: true, size: 'lg' });
    reference.componentInstance.title = "Create Receiver and Shipping Address";
    reference.componentInstance.userid = this.id;
    const onSaveReference = reference.componentInstance.onSave.subscribe((value: INewAddress) => {
      this.onAddressChange.emit(value);
      let address = new NewAddress(value as INewAddress)
      this.addresses = [...this.addresses, address];
      this.ref.detectChanges();
      this.onChange.emit(address.id);
      reference.close();
    })
    const defaultReference = reference.componentInstance.onDefault.subscribe(async (value: string) => {
      if (value !== '') {
        await this.accountService.updateDefaultAddress(this.id, value);
        this.onChangeDefault.emit(value)
        this.ref.detectChanges();
      }
    })
    reference.result.then(_ => {
      defaultReference.unsubscribe();
      onSaveReference.unsubscribe();
    })
  }

  onClickEdit(address: NewAddress) {
    const reference = this.modalService.open(NewCreateAddressComponent, { animation: true, size: 'lg' });
    reference.componentInstance.title = "Edit Receiver and Shipping Address";
    reference.componentInstance.userid = this.id;
    reference.componentInstance.data = address as INewAddress;
    reference.componentInstance.isDefault = this.defaultAddressId === this.id;
    const onSaveReference = reference.componentInstance.onSave.subscribe((value: INewAddress) => {
      this.onAddressChange.emit(value);
      let idx = this.addresses.findIndex(x => x.id === value.id);
      if (idx >= 0) this.addresses[idx] = new NewAddress(value);
      this.ref.detectChanges();
      this.onChange.emit(address.id);
      reference.close();
    })
    const defaultReference = reference.componentInstance.onDefault.subscribe(async (value: string) => {
      await this.accountService.updateDefaultAddress(this.id, value);
      this.onChangeDefault.emit(value)
      this.ref.detectChanges();
    })
    reference.result.then(_ => {
      onSaveReference.unsubscribe();
      defaultReference.unsubscribe();
    })
  }
}
