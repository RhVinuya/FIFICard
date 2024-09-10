import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewStorageService } from '../new-services/new-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) {
    this.storageService =  _storageService;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkUser();
  }

  private checkUser() {
    const user = this.storageService.getUser();
    return user !== undefined;
  }


}
