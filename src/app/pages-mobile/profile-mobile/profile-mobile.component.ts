import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.scss']
})
export class ProfileMobileComponent implements OnInit {

  storageService: NewStorageService;

  constructor(
    public router: Router,
    _storageService: NewStorageService
  ) {
    
    this.storageService = _storageService;
   }

  ngOnInit(): void {

  }


  goto(page: string) {
      this.router.navigate([page])
  }

  onSignout() {
    this.storageService.clearUser();
    window.location.href = "/new/onboarding";
  }

}
