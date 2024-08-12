import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valentines-greetings',
  templateUrl: './valentines-greetings.component.html',
  styleUrls: ['./valentines-greetings.component.scss']
})
export class ValentinesGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
