
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { map, take } from 'rxjs';
import firebase from "firebase/compat/app";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TranslateService } from '@ngx-translate/core';
import { ViewportScroller } from '@angular/common';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewStorageService } from './new-services/new-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FibeiGreetings';
  isAuthenticated: boolean;
  user: any;
  userDetails: any;
  isLogIn = true;
  @Output() onSignOut: EventEmitter<void> = new EventEmitter();

  isMobile: boolean = false;
  storageService: NewStorageService;


  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public authProcess: AuthProcessService,
    public router: Router,
    public viewportScroller: ViewportScroller,
    public platform: Platform,
    _storageService: NewStorageService
  ) {
    this.setlanguage();
    this.isMobile = platform.is('capacitor') || platform.is('mobileweb');
    this.storageService = _storageService;
  }

  async ngOnInit(): Promise<void> {

    if(!this.isMobile) {
      this.platform.ready().then(() => {
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        });
      });
  
      const userDetails = JSON.parse(localStorage.getItem('user')!);
      this.userDetails = userDetails;
      this.isLogIn = userDetails == null || userDetails.length < 0 ? true : false;
    } else {
      const userDetails = this.storageService.getUser();
      this.isLogIn = userDetails !== undefined ? true : false;
    }

  }

  openLoginDialog(id: any): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'full-width-dialog'
      //width: '250px'
      // data: { name: this.name, animal: this.city }
    });

    dialogRef.afterClosed().subscribe(result => {

      const _users = this.authProcess.user$.pipe(
        take(1),
        map((currentUser: firebase.User | null) => {
          return currentUser;
        })
      );

      _users.subscribe(userDetails => {
        this.userDetails = userDetails;

        this.isLogIn = userDetails == null ? true : false;

        if (!this.isLogIn) {
          localStorage.setItem("user", JSON.stringify(userDetails));
          if (id != null) window.location.href = "/order/" + id;
        }

      });

    });
  }

  signOut(): void {
    this.isLogIn = true;
    localStorage.removeItem("user");
    this.auth
      .signOut()
      .then(() => this.onSignOut.emit())
      .catch((e) => console.error("An error happened while signing out!", e));
    window.location.href = "";
  }

  setlanguage() {
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem("language")! ? localStorage.getItem("language")! : 'en';
    this.translate.use(lang);
  }
}
