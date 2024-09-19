import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card-events-mobile",
  templateUrl: "./card-events-mobile.component.html",
  styleUrls: ["./card-events-mobile.component.scss"],
})
export class CardEventsMobileComponent implements OnInit {
  columns: number = 2;

  constructor() {}

  ngOnInit(): void {}

  getColumnSize(): number {
    return 12 / this.columns;
  }

  toggleColumns(): void {
    this.columns === 3;
  }
}
