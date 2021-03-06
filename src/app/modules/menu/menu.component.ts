import { UserService } from './../../services/user.service';
import { EventService } from './../../services/event.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { LoginComponent } from 'src/app/login/login.component';
import { map, take } from 'rxjs';
import firebase from "firebase/compat/app";
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  service: EventService;
  userService: UserService;
  events: Event[] = [];
  ak: Event;
  user: any;
  userDetails: any;
  userProfile: User;
  isLogIn = false;
  @Output() onSignOut: EventEmitter<void> = new EventEmitter();
  redirectEvent: string;
  isMothersDay: boolean;

  constructor(
    private _service: EventService,
    private _activateRoute: ActivatedRoute,
    private _userService: UserService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public authProcess: AuthProcessService
  ) { 
    this.service = _service;
    this.userService = _userService;
  }

  ngOnInit(): void {
    environment.redirect.forEach(element => {
      if (window.location.hostname.toLowerCase() == element.host.toLowerCase()){
        this.redirectEvent = element.event;
        this.isMothersDay = this.redirectEvent == element.event;
      }
    });

    this.loadEvents();

    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.userDetails = userDetails;
    this.getProfile();
    //console.log("userDetails ->",  userDetails);
    this.isLogIn = userDetails == null || userDetails.length < 0 ? true : false;
    //console.log("isLogIn ->",   String(this.isLogIn));
  }

  getProfile(){
    if (this.userDetails){
      this.userService.subscribeUser(this.userDetails.uid).subscribe(user => {
        this.userProfile = user;
        //console.log(user);
      })
    }
  }

  loadEvents(){
    this.service.getEvents().then((data: Event[]) => {
      data.forEach(event => {
        if (event.active){
          if (event.name?.toUpperCase() == 'CREATIONS'){
            this.ak = event;
          }
          else{
            this.events.push(event);
          }
        }
      })
    })
  }

  openLoginDialog(id: any): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'full-width-dialog'
      //width: '250px'
      // data: { name: this.name, animal: this.city }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
  
     const _users = this.authProcess.user$.pipe(
        take(1),
        map((currentUser: firebase.User | null) => {
          return currentUser;
        })
      );

      _users.subscribe(userDetails => {
        this.userDetails = userDetails;
        //console.log("displayName ->",  userDetails?.displayName);
        //console.log("emailVerified ->",  userDetails?.emailVerified);
        //console.log("IdToken ->",  userDetails?.getIdToken());

        this.isLogIn = this.userDetails == null  ? true : false;
        //console.log("isLogIn ->",  String(this.isLogIn));
        

        if(!this.isLogIn){
        localStorage.setItem("user", JSON.stringify(userDetails));
            if(id != null) {
              window.location.href = "/order/" + id;
            }else{
              //console.log("RELOAD");
              window.location.reload();
            }
        }

      });
       
    });
  }

  signOut(): void {
    //console.log("Sign Out");
    this.isLogIn = true;
    localStorage.removeItem("user");
    this.auth
      .signOut()
      .then(() =>this.onSignOut.emit())
      .catch((e) => console.error("An error happened while signing out!", e));
    window.location.href = "";  
  }
}
