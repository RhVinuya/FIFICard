import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-loading',
  templateUrl: './new-loading.component.html',
  styleUrls: ['./new-loading.component.scss']
})
export class NewLoadingComponent implements OnInit {
  @Input() set loading(value: boolean){
    this._loading = value;
  }

  constructor() { }

  _loading: boolean = false

  ngOnInit(): void {
  }

}
