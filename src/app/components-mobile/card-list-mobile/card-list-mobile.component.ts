import { Component, Input, OnInit } from "@angular/core";
import { INewCard } from "src/app/new-models/new-card";

@Component({
  selector: "app-card-list-mobile",
  templateUrl: "./card-list-mobile.component.html",
  styleUrls: ["./card-list-mobile.component.scss"],
})
export class CardListMobileComponent implements OnInit {
  @Input() cards: INewCard[];

  columns: number = 3;

  constructor() {}

  ngOnInit(): void {}
}
