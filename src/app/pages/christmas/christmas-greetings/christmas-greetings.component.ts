import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-christmas-greetings',
  templateUrl: './christmas-greetings.component.html',
  styleUrls: ['./christmas-greetings.component.scss']
})
export class ChristmasGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
