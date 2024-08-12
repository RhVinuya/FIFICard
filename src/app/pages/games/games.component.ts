import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToPlaystore(): void {
    window.open('https://play.google.com/store/apps/details?id=com.apolloswing.kepler.gp&hl=ph-en', '_blank');
  }
}
