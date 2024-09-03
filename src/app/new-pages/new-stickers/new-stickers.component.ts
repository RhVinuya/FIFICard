import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewStickerService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.stickerService = _cardService;
    this.ref = _ref;
  }

  stickerevents = environment.stickerevents;
  activeevents: string[] = [];
  loading: boolean = false;
  stickers: INewSticker[] = [];
  display: INewSticker[] = [];
  displayCount: number = 20;
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
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.events = [];
      if (id !== 'all') {
        if (this.events.findIndex(x => x === id) < 0) this.events.push(id);
      }
      this.ref.detectChanges();
      this.loadDisplay();
    });
    this.loadStickers();
  }

  async loadStickers() {
    this.loading = true;
    this.stickers = await this.stickerService.getAll();

    this.stickerevents.forEach(event => {
      let list = this.stickers.filter(x => x.events.filter(y => y.toLowerCase() === event.toLowerCase()) )
      if (list.length > 0) this.activeevents.push(event)
    })
    
    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  loadDisplay() {
    if (this.stickers.length > 0) {
      this.display = [];
      if (this.events.length === 0) {
        this.stickers.forEach(sticker => {
          let found: boolean = false;
          environment.stickerevents.forEach(event => {
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
    this.ref.detectChanges();
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
    this.ref.detectChanges();
  }
}
