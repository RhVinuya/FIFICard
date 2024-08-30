import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCreateAddressComponent } from 'src/app/new-components/new-create-address/new-create-address.component';
import { INewAddress, INewAddressConfig, NewAddress } from 'src/app/new-models/new-address';
import { NewAccountService } from 'src/app/new-services/new-account.service';
import { NewAddressService } from 'src/app/new-services/new-address.service';
import { LocationType, NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-profile-addresses',
  templateUrl: './new-profile-addresses.component.html',
  styleUrls: ['./new-profile-addresses.component.scss']
})
export class NewProfileAddressesComponent implements OnInit {
  @Input() id: string;
  @Input() default: string;

  @Output() onChangeDefault: EventEmitter<string> = new EventEmitter();

  locationService: NewLocationService;
  addressService: NewAddressService;
  accountService: NewAccountService;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _locationService: NewLocationService,
    _addressService: NewAddressService,
    _accountService: NewAccountService,
    _modalService: NgbModal,
    _ref: ChangeDetectorRef
  ) { 
    this.locationService = _locationService;
    this.addressService = _addressService;
    this.accountService = _accountService;
    this.modalService = _modalService;
    this.ref = _ref;
  }

  location: LocationType = 'ph';
  defaultId: string;
  addresses: NewAddress[] = [];

  async ngOnInit() {
    this.location = this.locationService.getlocation();
    this.defaultId = this.default;
    this.loadAdderesses();
  }

  async loadAdderesses() {
    let data = await this.addressService.getAll(this.id); 
    data.forEach(value => {
      if (this.location === 'ph' && value.country === 'Philippines') this.addresses.push(new NewAddress(value));
      else if (this.location === 'sg' && value.country === 'Singapore') this.addresses.push(new NewAddress(value));
      else if (this.location === 'us' && value.country === 'United States') this.addresses.push(new NewAddress(value));
    })
  }

  onClickCreate() {
    const reference = this.modalService.open(NewCreateAddressComponent, { animation: true, size: 'lg' });
    reference.componentInstance.title = "Create Shipping Address";
    reference.componentInstance.userid = this.id;
    const onSaveReference = reference.componentInstance.onSave.subscribe((value: any) => {
      this.addresses = [...this.addresses, new NewAddress(value as INewAddress)];
      this.ref.detectChanges();
      reference.close();
    })
    const defaultReference = reference.componentInstance.onDefault.subscribe(async (value: any) => {
      if (value !== '') {
        this.defaultId = value;
        await this.accountService.updateDefaultAddress(this.id, this.defaultId);
        this.onChangeDefault.emit(this.defaultId)
        this.ref.detectChanges();
      }
    })
    reference.result.then(_ => {
      defaultReference.unsubscribe();
      onSaveReference.unsubscribe();
    })
  }

  onClickEdit(user: NewAddress) {
    let iUser: INewAddress  = user as INewAddress;
    const reference = this.modalService.open(NewCreateAddressComponent, { animation: true, size: 'lg' });
    reference.componentInstance.title = "Update Shipping Address";
    reference.componentInstance.userid = this.id;
    reference.componentInstance.data = iUser;
    reference.componentInstance.isDefault = this.defaultId === iUser.id;
    const onSaveReference = reference.componentInstance.onSave.subscribe((value: any) => {
      let idx = this.addresses.findIndex(x => x.id === value.id);
      if (idx >= 0) this.addresses[idx] = new NewAddress(value);
      this.ref.detectChanges();
      reference.close();
    })
    const defaultReference = reference.componentInstance.onDefault.subscribe(async (value: any) => {
      if (value !== this.defaultId) {
        this.defaultId = value;
        await this.accountService.updateDefaultAddress(this.id, this.defaultId);
        this.onChangeDefault.emit(this.defaultId)
        this.ref.detectChanges();
      }
    });
    reference.result.then(_ => {
      defaultReference.unsubscribe();
      onSaveReference.unsubscribe();
    })
  }
}
