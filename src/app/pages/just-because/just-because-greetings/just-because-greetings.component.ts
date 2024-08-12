import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-just-because-greetings',
  templateUrl: './just-because-greetings.component.html',
  styleUrls: ['./just-because-greetings.component.scss']
})
export class JustBecauseGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
