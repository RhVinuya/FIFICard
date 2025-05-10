import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewGift } from 'src/app/new-models/new-gift';
import { LocationType } from 'src/app/new-models/type';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-gifts',
  templateUrl: './new-gifts.component.html',
  styleUrls: ['./new-gifts.component.scss']
})
export class NewGiftsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  giftService: NewGiftService;
  locationService: NewLocationService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _giftService: NewGiftService,
    _locationService: NewLocationService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.giftService = _giftService;
    this.locationService = _locationService;
    this.ref = _ref;
  }

  location: LocationType;
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
  searchstring: string = '';

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
    this.location = this.locationService.getlocation();

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
    let list = (await this.giftService.getAll()).filter(x => x.locations.includes(this.location));

    this.gifts = [...list.filter(x => x.featured), ...list.filter(x => x.featured !== true)]

    this.giftevents.forEach(event => {
      let list = this.gifts.filter(x => x.events.some(y => y.toLowerCase() === event.toLowerCase()))
      if (list.length > 0) this.activeevents.push(event)
    })

    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  filterEvents(events: string[], items: INewGift[]): INewGift[] {
    if (events.length === 0) return [...items];
    else return [...items].filter(item => {
      return events.some(event => {
        return item.events.some(x => x.toLowerCase() === event.toLowerCase())
      })
    })
  }

  filterRecipients(recipients: string[], items: INewGift[]): INewGift[] {
    if (recipients.length === 0) return [...items];
    else if (recipients.map(x => x.toLowerCase()).includes('FOR ALL'.toLowerCase())) return [...items]
    else return [...items].filter(item => {
      return recipients.some(recipient => {
        if (item.recipients) {
          return item.recipients.some(itemrecipient => {
            if (itemrecipient.toLowerCase() === recipient.toLowerCase()) return true;
            else {
              let recep = environment.recipients.find(x => x.main.toLowerCase() === recipient.toLowerCase());
              if (recep && recep.others) return recep.others.map(other => other.toLowerCase()).includes(itemrecipient.toLowerCase())
              else return false;
            }
          })
        }
        else return false;
      });
    });
  }

  filterBySearch(search: string, items: INewGift[]): INewGift[] {
    if (search === '') return [...items];
    else {
      let searches = search.split(' ');
      let results: INewGift[] = [];
      [...items].forEach(gift => {
        if (gift.code === search) {
          results = [...results, gift];
          return;
        }
        if (gift.name.toLowerCase().includes(search.toLowerCase()))  {
          results = [...results, gift];
          return;
        }
        if (searches.some(search => gift.name.toLowerCase().includes(search.toLowerCase())))  {
          results = [...results, gift];
          return;
        }
        if (gift.events.some(event => event.toLowerCase().includes(this.searchstring.toLowerCase())))  {
          results = [...results, gift];
          return;
        }
        if (searches.some(search => gift.events.some(event => event.toLowerCase().includes(search.toLowerCase()))))  {
          results = [...results, gift];
          return;
        }
        if (gift.recipients) {
          if (gift.recipients.some(recipient => recipient.toLowerCase().includes(search.toLowerCase())))  {
            results = [...results, gift];
            return;
          }
          if (searches.some(search => gift.recipients!.some(recipient => recipient.toLowerCase().includes(search.toLowerCase()))))  {
            results = [...results, gift];
            return;
          }
        }
      })
      return results;
    }
  }

  loadDisplay() {
    if (this.gifts.length > 0) {
      this.display = [];
      let filterByEvents = this.filterEvents(this.events, this.gifts);
      let filterByRecipients = this.filterRecipients(this.recipients, filterByEvents);
      let filterBySearch = this.filterBySearch(this.searchstring, filterByRecipients);
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

  onSearch(search: string) {
    if (search !== '' && search !== 'all') {
      let event = this.giftevents.find(x => x.toLowerCase() === search.toLowerCase())
      if (event) {
        this.event = event;
        this.events = [event]
      }
      else {
        this.event = '';
        this.events = [];
      }

      let recipient = this.recipientoptions.find(x => x.toLowerCase() === search.toLowerCase())
      if (recipient) {
        this.recipient = recipient.toUpperCase();
        this.recipients = [recipient.toUpperCase()]
      }
      else {
        this.recipient = '';
        this.recipients = [];
      }

      if (event === undefined && recipient === undefined) this.searchstring = search;
      else this.searchstring = '';
    }
    else {
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];
      this.searchstring = '';
    }
    this.ref.detectChanges();
    this.loadDisplay();
  }
}
