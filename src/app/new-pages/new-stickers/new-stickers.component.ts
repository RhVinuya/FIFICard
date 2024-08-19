import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-stickers',
  templateUrl: './new-stickers.component.html',
  styleUrls: ['./new-stickers.component.scss']
})
export class NewStickersComponent implements OnInit {

  activateRoute: ActivatedRoute;
  stickerService: NewStickerService;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewStickerService
  ) {
    this.activateRoute = _activateRoute;
    this.stickerService = _cardService
  }

  stickerevents = environment.stickerevents;
  loading: boolean = false;
  stickers: INewSticker[] = [];
  display: INewSticker[] = [];
  displayCount: number = 24;
  events: string[] = []

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Stickers",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
    this.loadStickers();
  }

  async loadStickers() {
    this.loading = true;
    this.stickers = await this.stickerService.getAll();
    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 24;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  loadDisplay() {
    if (this.stickers.length > 0) {
      this.display = [];
      if (this.events.length === 0) {
        this.stickers.forEach(sticker => {
          let found: boolean = false;
          environment.cardevents.forEach(event => {
            if (sticker.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, sticker];
        });
      }
      else {
        this.stickers.forEach(sticker => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (sticker.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, sticker];
        })
      }
    }
    this.updateCount(this.display.length);
  }

  onClickEvent(event: string) {
    if (this.events.findIndex(x => x === event) < 0) this.events.push(event);
    this.loadDisplay();
  }

  onRemoveEvent(event: string) {
    this.events = [...this.events.filter(x => x !== event)]
    this.loadDisplay();
  }


  updateCount(count: number){
    this.breadcrumbs = [
      {
        title: "Home",
        url: "/",
        active: false
      },
      {
        title: "Stickers ( " + count + " )",
        url: "",
        active: true
      }
    ];
  }
}
