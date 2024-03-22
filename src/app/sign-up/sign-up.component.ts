import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SignUp } from '../models/sign-up';
import { SignUpService } from '../services/sign-up.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loadingController: LoadingController;
  signupService: SignUpService;

  constructor(
    _loadingController: LoadingController,
    _formBuilder: UntypedFormBuilder,
    _signupService: SignUpService
  ) { 
    this.loadingController = _loadingController;
    this.formBuilder = _formBuilder;
    this.signupService = _signupService;
  }

  form: UntypedFormGroup;
  formBuilder: UntypedFormBuilder;
  submitted: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    }, {});
  }

  async add(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    try {
      let signup: SignUp = this.form.value as SignUp;
      await this.signupService.add(signup);
      this.submitted = false;
      this.form.controls['firstname'].patchValue("");
      this.form.controls['lastname'].patchValue("");
      this.form.controls['email'].patchValue("");
    }
    finally{
      await loading.dismiss();
    }
  }

}
