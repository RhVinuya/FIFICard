import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newyear-greetings',
  templateUrl: './newyear-greetings.component.html',
  styleUrls: ['./newyear-greetings.component.scss']
})
export class NewyearGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
