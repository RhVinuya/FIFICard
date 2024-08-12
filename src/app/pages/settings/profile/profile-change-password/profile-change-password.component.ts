import { User } from 'src/app/models/user';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {
  uid: string;

  modalService: NgbModal;
  userService: UserService;
  user: User;
  def: ChangeDetectorRef;

  constructor(
    private _modalService: NgbModal,
    private _userService: UserService,
    private _def: ChangeDetectorRef
  ) {
    this.modalService = _modalService;
    this.userService = _userService;
    this.def = _def;
  }

  modal: NgbModalRef;
  submitted: boolean = false;
  loading: boolean = false;

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
  });

  open(content: any) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  close() {
    this.modal.close("Cancel");
  }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.uid).then(user => {
      this.user = user;
    })
  }

  async save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;

    if (this.form.value.newpassword == this.form.value.confirm) {
      this.form.controls['newpassword'].setErrors(null);
      this.form.controls['confirm'].setErrors(null);
      let authenticate: boolean = await this._userService.changePassword(this.user.email, this.form.value.password!, this.form.value.newpassword!);
      if (authenticate) {
        this.loading = false;
        this.submitted = false;
        this.modal.close("Done");
      }
      else {
        this.form.controls['password'].setErrors({ 'error': true });
        this.loading = false;
        return;
      }
    }
    else {
      this.form.controls['newpassword'].setErrors({ 'mismatch': true });
      this.form.controls['confirm'].setErrors({ 'mismatch': true });
      this.loading = false;
      return;
    }
  }

  controls() {
    return this.form.controls;
  }

}

