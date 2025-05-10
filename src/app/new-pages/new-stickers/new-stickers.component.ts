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
  events: string[] = [];
  searchstring: string = '';

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
    let list = await this.stickerService.getAll();

    this.stickers = [...list.filter(x => x.featured), ...list.filter(x => x.featured !== true)]

    this.stickerevents.forEach(event => {
      let list = this.stickers.filter(x => x.events.some(y => y.toLowerCase() === event.toLowerCase()))
      if (list.length > 0) this.activeevents.push(event)
    })

    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  filterEvents(events: string[], items: INewSticker[]): INewSticker[] {
    if (events.length === 0) return [...items];
    else return [...items].filter(item => {
      return events.some(event => {
        return item.events.some(x => x.toLowerCase() === event.toLowerCase())
      })
    })
  }

  filterBySearch(search: string, items: INewSticker[]): INewSticker[] {
    if (search === '') return [...items];
    else {
      let searches = search.split(' ');
      let results: INewSticker[] = [];
      [...items].forEach(sticker => {
        if (sticker.code === search) {
          results = [...results, sticker];
          return;
        }
        if (sticker.name.toLowerCase().includes(search.toLowerCase())) {
          results = [...results, sticker];
          return;
        }
        if (searches.some(search => sticker.name.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, sticker];
          return;
        }
        if (sticker.events.some(event => event.toLowerCase().includes(this.searchstring.toLowerCase()))) {
          results = [...results, sticker];
          return;
        }
        if (searches.some(search => sticker.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
          results = [...results, sticker];
          return;
        }
      })
      return results;
    }
  }

  loadDisplay() {
    if (this.stickers.length > 0) {
      this.display = [];
      let filterByEvents = this.filterEvents(this.events, this.stickers);
      let filterBySearch = this.filterBySearch(this.searchstring, filterByEvents);
      this.display = [...filterBySearch];
      this.ref.detectChanges();
      this.updateCount(this.display.length);
    }
  }

  onClickEvent(event: string) {
    if (this.events.length > 0) {
      if (this.events[0] === event) this.events = [];
      else this.events = [event];
    }
    else this.events = [event]
    this.loadDisplay();
  }

  onRemoveEvent(event: string) {
    this.events = [...this.events.filter(x => x !== event)]
    this.loadDisplay();
  }


  updateCount(count: number) {
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

  onSearch(search: string) {
    if (search !== '' && search !== 'all') {
      let event = this.stickerevents.find(x => x.toLowerCase() === search.toLowerCase())
      if (event) this.events = [event];
      else this.events = [];
      
      if (event === undefined) this.searchstring = search;
      else this.searchstring = '';
    }
    else {
      this.events = [];
      this.searchstring = '';
    }
    this.ref.detectChanges();
    this.loadDisplay();
  }
}
