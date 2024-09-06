
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-layout-mobile',
  templateUrl: './layout-mobile.component.html',
  styleUrls: ['./layout-mobile.component.scss']
})
export class LayoutMobileComponent implements OnInit {

  storageService: NewStorageService;
  user: INewUser | undefined;


  constructor(
    public router: Router,
    _storageService: NewStorageService
  ) { 
    this.storageService = _storageService;
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    if (this.user === undefined)
      this.router.navigate(['/mobile/login']);
    else
      this.router.navigate(['/mobile/']);



  }

}
