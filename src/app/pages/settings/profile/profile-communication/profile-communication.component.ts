import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-communication',
  templateUrl: './profile-communication.component.html',
  styleUrls: ['./profile-communication.component.scss']
})
export class ProfileCommunicationComponent implements OnInit {
  uid: string;
  user: User;
  userService: UserService;
  modalService: NgbModal;
  modal: NgbModalRef;

  constructor(
    private _userService: UserService,
    private _modalService: NgbModal
  ) {
    this.userService = _userService;
    this.modalService = _modalService;
  }

  submitted: boolean = false;
  loading: boolean = false;

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    newemail: new FormControl(null, [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser() {
    this.userService.subscribeUser(this.uid).subscribe(user => {
      this.user = user;
    })
  }

  notificationChange(notif: boolean) {
    this.user.notification = !notif;
    this.userService.updateNotification(this.user.id, this.user.notification);
  }

  controls() {
    return this.form.controls;
  }

  open(content: any) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  close() {
    this.modal.close("Cancel");
  }

  async save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.form.controls['email'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['newemail'].setErrors(null);

    this.loading = true;

    if (this.form.value.email! == this.form.value.newemail!) {
      this.form.controls['newemail'].setErrors({ 'newemail': true });
      this.loading = false;
      return;
    }

    this._userService.changeEmail(this.form.value.email!, this.form.value.password!, this.form.value.newemail!).then(authen => {
      if (authen) {
        this._userService.updateEmail(this.uid, this.form.value.newemail!);
        this.loading = false;
        this.modal.close("Done");
      }
      else {
        this.form.controls['email'].setErrors({ 'authen': true });
        this.form.controls['password'].setErrors({ 'authen': true });
        this.loading = false;
        return;
      }
    }).catch(err => {
      this.form.controls['email'].setErrors({ 'authen': true });
      this.form.controls['password'].setErrors({ 'authen': true });
      this.loading = false;
      return;
    })

  }

}
