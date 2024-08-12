import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})
export class ReadmoreComponent implements OnInit {
  @Input() set text(_text: string){
    this.value = _text;
  }

  constructor() { }

  value: string;
  showall: boolean = false;

  ngOnInit(): void {
  }

  onClick(){
    this.showall = !this.showall;
  }

}
