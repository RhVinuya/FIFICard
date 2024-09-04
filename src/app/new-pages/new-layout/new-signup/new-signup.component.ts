import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NewAccountService } from 'src/app/new-services/new-account.service';

@Component({
  selector: 'app-new-signup',
  templateUrl: './new-signup.component.html',
  styleUrls: ['./new-signup.component.scss']
})
export class NewSignupComponent implements OnInit {
  @Input() email: string;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter();

  activeOffcanvas: NgbActiveOffcanvas;
  accountService: NewAccountService;

  constructor(
    _activeOffcanvas: NgbActiveOffcanvas,
    _accountService: NewAccountService
  ) { 
    this.activeOffcanvas = _activeOffcanvas;
    this.accountService = _accountService;
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required])
  });
  submitted: boolean = false;
  processing: boolean = false

  ngOnInit(): void {
    this.form.controls.email.setValue(this.email);
  }

  close(){
    this.activeOffcanvas.close();
  }

  async onSubmit(){
    this.submitted = true;
    if (this.form.invalid) return;

    this.processing = true;
    let email = this.form.controls.email.value!;
    let firstname = this.form.controls.firstname.value!;
    let lastname = this.form.controls.lastname.value!;
    await this.accountService.addSignUp(email, firstname, lastname);
    this.onSuccess.emit();
    this.activeOffcanvas.close();
  }
}
