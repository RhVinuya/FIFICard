import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewStorageService } from '../new-services/new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerGuard implements CanActivate {

  storageService: NewStorageService;

  constructor(
    public router: Router,
    _storageService: NewStorageService
  ) {
    this.storageService =  _storageService;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise ( (resolve, reject) => {
      let hasUser = this.checkUser();
      if(hasUser) {
        resolve(true);
      } else {
        this.router.navigateByUrl('/onboarding');
        resolve(false);
      }
    })
  }
  private checkUser() {
    const user = this.storageService.getUser();
    return user !== undefined;
  }
}
