import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postcards-mobile',
  templateUrl: './postcards-mobile.component.html',
  styleUrls: ['./postcards-mobile.component.scss']
})
export class PostcardsMobileComponent implements OnInit {

  title: string = "Postcards";

  constructor() { }

  ngOnInit(): void {
  }

}
