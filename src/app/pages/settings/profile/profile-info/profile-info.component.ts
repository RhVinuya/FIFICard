import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  uid: string;
  user: User;
  userService: UserService;
  fb: UntypedFormBuilder;
  form: UntypedFormGroup;
  currentYear: Number = new Date().getFullYear();
  isEdit: boolean = false;
  submitted: boolean = false;

  constructor(
    private _userService: UserService,
    private _fb: UntypedFormBuilder
  ) {
    this.userService = _userService;
    this.fb = _fb;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: [Number(0), [Validators.required, Validators.min(1), Validators.max(31)]],
      year: [Number(0), [Validators.required, Validators.min(1950), Validators.max((new Date).getFullYear())]]
    });

    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.uid).then(user => {
      this.user = user;
      this.loadUserDisplay();
    })
  }

  loadUserDisplay() {
    let bday: Date = new Date(this.user.birthday);
    this.form.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      gender: this.user.gender,
      contact: this.user.contact,
      month: bday.getMonth() + 1,
      day: bday.getDate(),
      year: bday.getFullYear()
    });
  }

  dateIsValid(date: Date) {
    if (
      typeof date === 'object' &&
      date !== null &&
      typeof date.getTime === 'function' &&
      !isNaN(Number(date))
    ) {
      if (date >= (new Date())){
        return false;
      }
      else{
        return true;
      }
    }

    return false;
  }

  updateMode() {
    if (this.isEdit) {
      this.form.controls['month'].setErrors(null);
      this.form.controls['day'].setErrors(null);
      this.form.controls['year'].setErrors(null);

      this.submitted = true;
      if (this.form.valid) {
        let date = new Date(this.form.value.year + "-" + this.form.value.month + "-" + this.form.value.day);
        if (this.dateIsValid(date)) {
          let user: User = this.form.value as User;
          this.user.firstname = user.firstname;
          this.user.lastname = user.lastname;
          this.user.displayName = user.firstname + " " + user.lastname;
          this.user.gender = user.gender;
          this.user.contact = user.contact;
          this.user.birthday = this.form.value.year + "-" + this.form.value.month + "-" + this.form.value.day;
          this.userService.updateUser(this.user);
          this.isEdit = false;
        }
        else{
          this.form.controls['month'].setErrors({ 'invalid': true });
          this.form.controls['day'].setErrors({ 'invalid': true });
          this.form.controls['year'].setErrors({ 'invalid': true });
        }
      }
    }
    else {
      this.isEdit = true;
    }
  }

  cancelEdit() {
    this.submitted = false;
    this.loadUserDisplay();
    this.isEdit = false;
  }

  controls() {
    return this.form.controls;
  }

  changePhone(e: any){
    if ((e.charCode >= 48) && (e.charCode <= 57)) return true;
    else if (e.charCode === 45) return true;
    else if (e.charCode === 40) return true;
    else if (e.charCode === 41) return true;
    else if (e.charCode === 32) return true;
    else return false;
  }
}
