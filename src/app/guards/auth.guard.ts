import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NewStorageService } from '../new-services/new-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  storageService: NewStorageService;

  constructor(
    public router: Router,
    _storageService: NewStorageService
  ) {
    this.storageService =  _storageService;
  }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return new Promise ( (resolve, reject) => {
        let hasUser = this.checkUser();
        if(hasUser) {
          this.router.navigateByUrl('/cards');
          resolve(false);
        } else {
          //this.router.navigateByUrl('/onboarding');
          resolve(true);
        }
      })
  }

  private checkUser() {
    const user = this.storageService.getUser();
    return user !== undefined;
  }


}
