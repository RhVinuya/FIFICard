import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from 'src/app/new-components/new-title/new-title.component';

@Component({
  selector: 'app-title-mobile',
  templateUrl: './title-mobile.component.html',
  styleUrls: ['./title-mobile.component.scss']
})
export class TitleMobileComponent implements OnInit {


  @Input() set title(_value: string) {
    this._title = _value
  }
  constructor() { }

  _title: string = '';

  ngOnInit(): void {
  }
}
