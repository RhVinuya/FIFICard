
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { map, take, timer } from 'rxjs';
import firebase from "firebase/compat/app";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TranslateService } from '@ngx-translate/core';
import { ViewportScroller } from '@angular/common';
import { ModalController, Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewStorageService } from './new-services/new-storage.service';
import { register } from 'swiper/element/bundle';
import { AdsModalMobileComponent } from './components-mobile/ads-modal-mobile/ads-modal-mobile.component';
import { NewAdsService } from './new-services/new-ads.service';
import { NewConfigService } from './new-services/new-config.service';
import { IConfig } from './new-models/new-config';
import { NewAdsModalComponent } from './new-components/new-ads-modal/new-ads-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

register();

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
  isLogIn: boolean = true;
  @Output() onSignOut: EventEmitter<void> = new EventEmitter();

  isMobile: boolean = false;
  storageService: NewStorageService;
  adsService: NewAdsService;
  modalCtrl: ModalController;
  configService: NewConfigService;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  url: string = '';
  config: IConfig;

  constructor(
    private translate: TranslateService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public authProcess: AuthProcessService,
    public router: Router,
    public viewportScroller: ViewportScroller,
    public platform: Platform,
    _storageService: NewStorageService,
    _adsService: NewAdsService,
    _configService: NewConfigService,
    _modalService: NgbModal,
    _modalCtrl: ModalController,
    _ref: ChangeDetectorRef
  ) {
    this.setlanguage();
    this.isMobile = platform.is('capacitor') || platform.is('mobileweb');
    this.storageService = _storageService;
    this.adsService = _adsService;
    this.configService = _configService;
    this.modalCtrl = _modalCtrl;
    this.modalService = _modalService;
    this.ref = _ref;
  }

  async ngOnInit(): Promise<void> {

    this.config = await this.configService.get();

    if (!this.isMobile) {
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

      if (this.adsService.showSubject.getValue() === false && this.config.ads.flash.enable) {
        let reference = this.modalService.open(NewAdsModalComponent, { animation: true, size: 'xl', centered: true });
        reference.result.then(_ => {
          this.adsService.showSubject.next(true);
        })
      }

    } else {
      timer(100, 500).subscribe(time => {
        const userDetails = this.storageService.getUser();
        this.isLogIn = userDetails !== undefined ? true : false;
        this.ref.detectChanges();
      });


      this.router.events.subscribe((event) => {
        this.url = this.router.url;

      });

      let subs = timer(3000).subscribe(async () => {
        if (this.adsService.showSubject.getValue() === false && this.config.ads.flashmobile.enable && this.allowModalAds()) {
          this.adsService.showSubject.next(true);
          const modal = await this.modalCtrl.create({
            component: AdsModalMobileComponent,
            breakpoints: [0, 0.9],
            initialBreakpoint: 0.9,
            handle: true,
            backdropDismiss: true,
            canDismiss: true
          });
          modal.present();
        }
        subs.unsubscribe();
      });
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

  allowModalAds() {
    return !this.url.includes('/static/')
  }
}
