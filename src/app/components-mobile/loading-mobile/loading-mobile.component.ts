import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-mobile',
  templateUrl: './loading-mobile.component.html',
  styleUrls: ['./loading-mobile.component.scss']
})
export class LoadingMobileComponent implements OnInit {
  @Input() set loading(value: boolean){
    this._loading = value;
  }

  constructor() { }

  _loading: boolean = false

  ngOnInit(): void {
  }

}
