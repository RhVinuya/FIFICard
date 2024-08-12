import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from "@angular/material/tabs";
import { AuthComponent, AuthProcessService, AuthProvider, AuthProvidersComponent } from 'ngx-auth-firebaseui';
import { map, take } from 'rxjs';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {  
  isAuthenticated: boolean;
  email: string;
  error: boolean;
  public index: number;
  providers = AuthProvider;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public authProcess: AuthProcessService,
    ) {}
    
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onCloseClick(event: any) {
    try{
      this.dialogRef.close({
        //isAuthenticated: this.isAuthenticated
      });
    }catch(ex){

      const _users = this.authProcess.user$.pipe(
        take(1),
        map((currentUser: firebase.User | null) => {
          return currentUser;
        })
      );

      _users.subscribe(userDetails => {
        localStorage.setItem("user", JSON.stringify(userDetails));
           window.location.href = "/profile";
        });
    }
   
  }

  printUser(event: any) {
    this.error = false;
    this.index = 2;
    //this.isAuthenticated = true;
  }

  printError(event: any) {
    this.error = true;
    //this.isAuthenticated = false;
    // this.snackbar.open(event.message, 'OK', {duration: 5000});
  }
  
  onTabChange(event: MatTabChangeEvent) {
  }



}
