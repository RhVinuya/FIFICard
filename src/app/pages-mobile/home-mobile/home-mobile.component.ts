import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss']
})
export class HomeMobileComponent implements OnInit {

  user: INewUser | undefined;
  storageService: NewStorageService;


  constructor(
    public router: Router,
    _storageService: NewStorageService
  ) {
    this.storageService = _storageService;
  }

  ngOnInit(): void{
    this.user = this.storageService.getUser();

    if( this.user === undefined) {
      this.router.navigate(['/onboarding']);
    }


  }

}
