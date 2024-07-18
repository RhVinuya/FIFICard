import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-games-mobile",
  templateUrl: "./games-mobile.component.html",
  styleUrls: ["./games-mobile.component.scss"],
})
export class GamesMobileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToPlaystore(): void {
    window.open(
      "https://play.google.com/store/apps/details?id=com.apolloswing.kepler.gp&hl=ph-en",
      "_blank"
    );
  }
}
