import { Component, Input, OnInit } from '@angular/core';

export interface IBreadcrumb {
  title: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-new-title',
  templateUrl: './new-title.component.html',
  styleUrls: ['./new-title.component.scss']
})
export class NewTitleComponent implements OnInit {
  @Input() set title(_value: string) {
    this._title = _value
  }
  @Input() set breadcrumbs(_value: IBreadcrumb[]) {
    console.log(_value)
    this._breadcrumbs = _value;
  }

  constructor() { }

  _title: string = '';
  _breadcrumbs: IBreadcrumb[] = []

  ngOnInit(): void {
  }

}
