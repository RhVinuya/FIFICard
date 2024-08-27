import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewGift } from 'src/app/new-models/new-gift';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-gifts',
  templateUrl: './new-gifts.component.html',
  styleUrls: ['./new-gifts.component.scss']
})
export class NewGiftsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  giftService: NewGiftService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _giftService: NewGiftService,
    _ref: ChangeDetectorRef
  ) { 
    this.activateRoute = _activateRoute;
    this.giftService = _giftService;
    this.ref = _ref;
  }

  all = [...environment.giftscategories, ...environment.giftsrecipients];
  loading: boolean = false;
  gifts: INewGift[] = [];
  display: INewGift[] = [];
  displayCount: number = 20;
  events: string[] = []

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Gifts",
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
    this.loadGifts();
  }

  async loadGifts() {
    this.loading = true;
    this.gifts = await this.giftService.getAll();
    this.loadDisplay();
    this.loading = false;
  }

  loadDisplay() {
    if (this.gifts.length > 0) {
      this.display = [];
      if (this.events.length === 0) {
        this.gifts.forEach(gift => {
          let found: boolean = false;
          this.all.forEach(event => {
            if (gift.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, gift];
        });
      }
      else {
        this.gifts.forEach(gift => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (gift.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, gift];
        })
      }
    }
    this.ref.detectChanges();
    this.updateCount(this.display.length);
  }

  updateCount(count: number){
    this.breadcrumbs = [
      {
        title: "Home",
        url: "/",
        active: false
      },
      {
        title: "Gifts ( " + count + " )",
        url: "",
        active: true
      }
    ];
    this.ref.detectChanges();
  }
}
