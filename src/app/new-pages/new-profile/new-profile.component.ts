import { AddressService } from './../../services/address.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewChangePasswordComponent } from 'src/app/new-components/new-change-password/new-change-password.component';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';
import { ChangePasswordConfirmMessageComponent } from 'src/app/new-components/new-change-password/change-password-confirm-message/change-password-confirm-message.component';
import { NewChangeEmailComponent } from 'src/app/new-components/new-change-email/new-change-email.component';
import { INewAddress } from 'src/app/new-models/new-address';
import { NewAddressService } from 'src/app/new-services/new-address.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit, OnDestroy {

  storageService: NewStorageService;
  addressService: NewAddressService;
  modalService: NgbModal;
  fb: UntypedFormBuilder;
  router: Router;

  profileInfoForm: FormGroup;
  addressForm: FormGroup;
  showAddressForm: boolean = false;
  addressActionType: '' | 'add' | 'edit' = '';

  constructor(
    _storageService: NewStorageService,
    _addressService: NewAddressService,
    _fb: UntypedFormBuilder,
    _modalService: NgbModal,
    _router: Router
  ) { 
    this.storageService = _storageService;
    this.addressService = _addressService;
    this.modalService = _modalService;
    this.router = _router;
    this.fb = _fb;
  }

  subs: Subscription;
  user: INewUser | undefined;
  addressList: INewAddress[] | [] = [];
  
  ngOnInit(): void {

    this.profileInfoForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      //month: ['', [Validators.required]],
      //day: [Number(0), [Validators.required, Validators.min(1), Validators.max(31)]],
      //year: [Number(0), [Validators.required, Validators.min(1950), Validators.max((new Date).getFullYear())]]
    });

    this.addressForm = this.fb.group({
      id: ['', [ Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      email: ['', [Validators.required, Validators.email]],        
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      province: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      postcode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      //month: ['', [Validators.required]],
      //day: [Number(0), [Validators.required, Validators.min(1), Validators.max(31)]],
      //year: [Number(0), [Validators.required, Validators.min(1950), Validators.max((new Date).getFullYear())]]
    });

    this.subs = timer(100, 500).subscribe( time => {
      let value = this.storageService.getUser();
      
      if(value === undefined) 
        this.router.navigate(['/new/']);

      if(value !== undefined && this.user === undefined) 
        
        this.user = value === undefined ? undefined : value;
        this.loadUserDisplay();
        if(this.addressList.length == 0)
          this.getUserAddressList();

    });

    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadUserDisplay() {
    let bday: Date = new Date(this.user!.birthday);

    this.profileInfoForm.patchValue({
      firstname: this.user!.firstname,
      lastname: this.user!.lastname,
      email: this.user!.email,
      birthday: this.user!.birthday
    });


    // ,
    // month: bday.getMonth() + 1,
    // day: bday.getDate(),
    // year: bday.getFullYear()
  }

  getUserAddressList() {
    console.log('getUserAddressList');
    this.addressService.getAddressByUser(this.user!.id).then( 
      (addresses: INewAddress[]) => {
        this.addressList = addresses;
        
         console.log(this.addressList);
    })
  }

  toggleAddressForm(address: INewAddress | null = null) {
    this.showAddressForm = !this.showAddressForm;
    this.addressActionType = address !== null ? 'edit' : 'add';

    if ( address !== null ) {

      this.addressForm.setValue({
        id: address,
        firstname: address.firstname,
        lastname: address.lastname,
        email: address.email,
        address: address.address,
        province: address.province,
        city: address.city,
        country: address.country,
        postcode: address.postcode,
      });
    } else {
      this.addressForm.setValue({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        province: "",
        city: "",
        country: "",
        postcode: "",
      })
    }


  }

  onClickSignIn(){
    this.modalService.open(NewLoginComponent, { animation: true });
  }

  onChangePasswordClicked() {
    const reference = this.modalService.open(NewChangePasswordComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });

    reference.componentInstance.onSuccess.subscribe((value: any) => {
      reference.close();

      const reference2 = this.modalService.open(ChangePasswordConfirmMessageComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });

      reference2.componentInstance.onContinue.subscribe((value: any) => {
          reference2.close();
          this.router.navigate(['/new/profile']);
      });
    })
  }

  onChangeEmailClicked() {
    const reference = this.modalService.open(NewChangeEmailComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });

    reference.componentInstance.onSuccess.subscribe((value: any) => {
      reference.close();
      this.router.navigate(['/new/profile']);
    });
  }

  async addressFormSubmit() {
    let address = this.addressForm.value as INewAddress;
    address.userId = this.user!.id;
    console.log(address);

    if(address.id !== null) {
      console.log('updateAddress');
      this.addressService.updateAddress(address);
    } else {
      console.log('createAddress');
      await this.addressService.createAddress(address);
    }
    this.router.navigate(['/new/profile']);
  }

  getAddressDetails(type: 'name' | 'address', address: INewAddress): string {
    if(type == 'name') {
      return address.firstname + " " + address.lastname;
    } else {
      return [
        address.address,
        address.city,
        address.province,
        address.country,
        address.postcode
      ].join(', ');
    }
  }
}
