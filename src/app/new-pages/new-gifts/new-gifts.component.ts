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

  giftevents = environment.giftscategories;
  recipientoptions = environment.giftsrecipients;
  activeevents: string[] = [];
  loading: boolean = false;
  gifts: INewGift[] = [];
  display: INewGift[] = [];
  displayCount: number = 20;
  events: string[] = [];
  event: string
  recipients: string[] = [];
  recipient: string;

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
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];
      
      if (id !== 'all') {
        if (this.giftevents.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.event = id;
          this.events.push(id);
        }
        else if (this.recipientoptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.recipient = id;
          this.recipients.push(id);
        }
      }


      this.ref.detectChanges();
      this.loadDisplay();
    });
    this.loadGifts();
  }

  async loadGifts() {
    this.loading = true;
    this.gifts = await this.giftService.getAll();

    this.giftevents.forEach(event => {
      let list = this.gifts.filter(x => x.events.filter(y => y.toLowerCase() === event.toLowerCase()) )
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
    if (this.gifts.length > 0) {
      this.display = [];
      //filter events
      if (this.events.length === 0) {
        this.gifts.forEach(gift => {
          let found: boolean = false;
          this.giftevents.forEach(event => {
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

      //filter recipients
      if (this.recipients.length > 0 && this.display.length > 0) {
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(gift => {
          let found: boolean = false;
          this.recipients.forEach(recipient => {
            if (recipient === 'FOR ALL') found = true
            else if (gift.recipients.findIndex(x => x.toLowerCase() === recipient.toLowerCase()) >= 0) found = true
          })
          if (found) this.display = [...this.display, gift];
        })
      }
    }
    this.ref.detectChanges();
    this.updateCount(this.display.length);
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

  onClickRecipient(e: any) {
    let idx = this.recipients.findIndex(x => x === e.target.value);
    if (e.target.checked === true) {
      if (idx <= 0) this.recipients.push(e.target.value)
    }
    else {
      if (idx >= 0) this.recipients = this.recipients.filter(x => x !== e.target.value)
    }
    this.loadDisplay();
  }
}
