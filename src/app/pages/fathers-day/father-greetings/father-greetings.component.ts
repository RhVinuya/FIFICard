import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-father-greetings',
  templateUrl: './father-greetings.component.html',
  styleUrls: ['./father-greetings.component.scss']
})
export class FatherGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
