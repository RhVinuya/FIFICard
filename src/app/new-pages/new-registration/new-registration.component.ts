import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.scss']
})
export class NewRegistrationComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    birthday: new FormControl<Date | null>(null, [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    confirm: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    newsletter: new FormControl<boolean>(true),
    terms: new FormControl<boolean>(false),
  });

  submitted: boolean = false;
  processing: boolean = false;

  ngOnInit(): void {
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid) return;
    this.processing = true;
  }

}
