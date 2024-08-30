import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { INewAddress, INewAddressConfig } from 'src/app/new-models/new-address';
import { NewAddressService } from 'src/app/new-services/new-address.service';
import { LocationType, NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-create-address',
  templateUrl: './new-create-address.component.html',
  styleUrls: ['./new-create-address.component.scss']
})
export class NewCreateAddressComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() userid: string;
  @Input() data: INewAddress;
  @Input() isDefault: boolean;
  @Output() onSave: EventEmitter<INewAddress> = new EventEmitter();
  @Output() onDefault: EventEmitter<string> = new EventEmitter();

  activeModal: NgbActiveModal;
  addressService: NewAddressService;
  locationService: NewLocationService;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _addressService: NewAddressService,
    _locationService: NewLocationService,
    _ref: ChangeDetectorRef
  ) { 
    this.activeModal = _activeModal;
    this.addressService = _addressService;
    this.locationService = _locationService;
    this.ref = _ref;
  }

  location: LocationType = 'ph';
  config: INewAddressConfig[] = [];
  provinceSubscription: Subscription;
  provinces: string[] = [];
  city: string[] = []

  form = new FormGroup({
    default: new FormControl<boolean>(true),
    id: new FormControl<string>(""),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    province: new FormControl<string>(''),
    city: new FormControl<string>(''),
    country: new FormControl<string>('Philippines', [Validators.required]),
    postcode: new FormControl<string>('', [Validators.required])
  });

  submitted: boolean = false;
  processing: boolean = false;

  async ngOnInit(): Promise<void> {
    this.location = this.locationService.getlocation();
    this.config = await this.addressService.getConfig();
    this.provinces = this.config.map(x => x.name);

    this.form.controls.city.disable();
    this.provinceSubscription = this.form.controls.province.valueChanges.subscribe(value => {
      if (value !== '') {
        this.city = this.config.find(x => x.name === value)!.city;
        this.form.controls.city.enable();
      }
      else {
        this.form.controls.city.disable();
      }
    });

    if (this.data) {
      this.form.setValue({
        default: this.isDefault,
        id: this.data.id ? this.data.id : '',
        email: this.data.email ? this.data.email : '',
        firstname: this.data.firstname ? this.data.firstname : '',
        lastname: this.data.lastname ? this.data.lastname : '',
        address: this.data.address ? this.data.address : '',
        province: this.data.province ? this.data.province : '',
        city: this.data.city ? this.data.city : '',
        country: this.data.country ? this.data.country : '',
        postcode: this.data.postcode ? this.data.postcode : '',
      });
      this.ref.detectChanges();
    }
    else{
      if (this.location === 'us') this.form.controls.country.setValue('United States');
      if (this.location === 'sg') this.form.controls.country.setValue('Singapore');
    }

    if (this.location === 'ph') {
      this.form.controls.province.setValidators([Validators.required]);
      this.form.controls.city.setValidators([Validators.required]);
    }
  }

  ngOnDestroy(): void {
    this.provinceSubscription.unsubscribe();
  }

  close() {
    this.activeModal.close();
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
    this.ref.detectChanges();
    let value: INewAddress = this.form.value as INewAddress;
    value.userId = this.userid;
    if (this.data === undefined) {
      let id = await this.addressService.create(value);
      value.id = id;
      await this.onDefault.emit(this.form.controls.default.value ? id : '')
    }
    else {
      await this.addressService.update(value);
      await this.onDefault.emit(this.form.controls.default.value ? value.id : '')
    }
    this.onSave.emit(value)
  }

}
