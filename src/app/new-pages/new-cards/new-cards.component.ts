
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { IConfig, IPriority } from 'src/app/new-models/new-config';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-cards',
  templateUrl: './new-cards.component.html',
  styleUrls: ['./new-cards.component.scss']
})
export class NewCardsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  configService: NewConfigService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _configService: NewConfigService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.configService = _configService;
    this.ref = _ref;
  }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cards",
      url: "",
      active: true
    }
  ];

  cardevents = environment.cardevents;
  recipientoptions = environment.recipients;
  filteroptions = ['POETRY', 'MESSAGE', 'PERSONALIZED', 'TALKING CARD'];
  featuredEvent = "Mother's day";

  activeevents: string[] = [];
  event: string;
  recipient: string = environment.recipientdefault;
  filter: string;
  loading: boolean = false;
  cards: INewCard[] = [];
  display: INewCard[] = [];
  displayCount: number = 20;
  events: string[] = [];
  recipients: string[] = [environment.recipientdefault];
  filters: string[] = [];
  searchstring: string = '';

  priorityId: string = '3E4Ng5wsPpxXEWNh35lC';
  priorities: IPriority[] = [];
  config: IConfig;

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();

    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];
      this.filter = '';
      this.filters = [];

      if (id !== 'all') {
        if (this.cardevents.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.event = id;
          this.events.push(id);
          if (id.toLowerCase() === this.featuredEvent.toLowerCase()) this.priorities = this.config.priorities.filter(x => x.type === 'card').filter(x => x.event === this.featuredEvent);   
        }
        else if (this.recipientoptions.findIndex(x => x.main.toLowerCase() === id.toLowerCase()) >= 0) {
          this.recipient = id;
          this.recipients.push(id);
        }
        else if (this.filteroptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.filter = id;
          this.filters.push(id);
        }
      }
      else {
        this.priorities = this.config.priorities.filter(x => x.type === 'card').filter(x => x.event === this.featuredEvent);
      }

      this.ref.detectChanges();
      this.loadDisplay();
    });
    this.loadCards();
  }

  async loadCards() {
    this.loading = true;
    let temp = await this.cardService.getAll();
    let list = temp.filter(x => x.cardbundle !== true)

    this.cards = [...list.filter(x => x.featured), ...list.filter(x => x.featured !== true)]

    this.cardevents.forEach(event => {
      let list = this.cards.filter(x => x.event.toLowerCase() === event.toLowerCase())
      if (list.length > 0) this.activeevents.push(event)
    })

    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length;
  }

  loadDisplay() {
    if (this.cards.length > 0) {

      this.display = [];

      //if (this.priorityId !== '') {
      //  if (this.cards.findIndex(x => x.id === this.priorityId) >= 0) {
      //    let temp = [...this.cards]
      //    this.cards = [...temp.filter(x => x.id === this.priorityId), ...temp.filter(x => x.id !== this.priorityId)]
      //  }
      //}

      if (this.priorities.length > 0) {
        let ids: string[] = [];
        let temp: INewCard[] = [];
        this.priorities.forEach(priority => {
          ids = [...ids, ...priority.ids];
        })

        ids.forEach(id => {
          let card = this.cards.find(x => x.id === id);
          if (card) temp.push(card);
        });

        this.cards = [...temp, ...this.cards.filter(x => !ids.includes(x.id))];
      }

      //filter events
      if (this.events.length === 0) {
        this.cards.forEach(card => {
          let found: boolean = false;
          environment.cardevents.forEach(event => {
            if (card.event.toLowerCase() === event.toLowerCase()) found = true
          })
          if (found) this.display = [...this.display, card];
        });
      }
      else {
        this.cards.forEach(card => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (card.event.toLowerCase() === event.toLowerCase()) found = true
          })
          if (found) this.display = [...this.display, card];
        })
      }

      this.validateRecipientOptions(this.display.map(object => ({ ...object })));

      //filter recipients
      if (this.recipients.length > 0 && this.display.length > 0) {
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(card => {
          let found: boolean = false;
          this.recipients.forEach(recipient => {
            if (recipient.toUpperCase() === environment.recipientdefault.toUpperCase()) found = true
            else {
              if (card.recipients!.findIndex(x => x.toLowerCase() === recipient.toLowerCase()) >= 0) found = true;
              else {
                let item = environment.recipients.find(x => x.main.toUpperCase() === recipient.toUpperCase())
                if (item && item.others) {
                  item.others.forEach(other => {
                    if (card.recipients!.findIndex(x => x.toLowerCase() === other.toLowerCase()) >= 0) found = true;
                  })
                }
              }
            }
          })
          if (found) this.display = [...this.display, card];
        })

      }

      //filter
      if (this.filters.length > 0 && this.display.length > 0) {
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(card => {
          let found: boolean = false;
          this.filters.forEach(filter => {
            if (filter === 'POETRY' && card.messagetype === 'poetry') found = true;
            else if (filter === 'MESSAGE' && card.messagetype === 'regular') found = true;
            else if (filter === 'PERSONALIZED' && card.signAndSend === true) found = true;
            else if (filter === 'TALKING CARD' && card.talkingcard === true) found = true;
            else if (filter === 'BUNDLE' && card.cardbundle === true) found = true;
          })
          if (found) this.display = [...this.display, card];
        })
      }

      if (this.searchstring !== '') {

        let searches = this.searchstring.split(' ');

        const temp = this.display.map(object => ({ ...object }))
        this.display = temp.filter(card => {

          if (card.name.toLowerCase().includes(this.searchstring.toLowerCase())) return true;
          if (searches.some(search => card.name.toLowerCase().includes(search.toLowerCase()))) return true;

          if (card.event.toLowerCase().includes(this.searchstring.toLowerCase())) return true;
          if (searches.some(search => card.event.toLowerCase().includes(search.toLowerCase()))) return true;

          if (card.events.some(event => event.toLowerCase().includes(this.searchstring.toLowerCase()))) return true;
          if (searches.some(search => card.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) return true;

          if (card.recipients) {
            if (card.recipients.some(recipient => recipient.toLowerCase().includes(this.searchstring.toLowerCase()))) return true;
            if (searches.some(search => card.recipients!.some(recipient => recipient.toLowerCase().includes(search.toLowerCase())))) return true;
          }

          if (card.code === this.searchstring) return true;

          return false
        })
      }

      this.ref.detectChanges();
      this.updateCount(this.display.length);
    }
  }

  validateRecipientOptions(items: INewCard[]) {
    this.recipientoptions = [];
    environment.recipients.forEach(recipient => {
      if (recipient.main !== 'All') {
        if (items.some(item => {
          if (item.recipients!.findIndex(x => x.toUpperCase() === recipient.main.toUpperCase()) >= 0) return true;
          return false;
        })) {
          this.recipientoptions.push(recipient)
        }
        else {
          if (recipient.others) {
            if (recipient.others.some(other => {
              return items.some(item => {
                if (item.recipients!.findIndex(x => x.toUpperCase() === other.toUpperCase()) >= 0) return true;
                return false;
              });
            })) {
              this.recipientoptions.push(recipient)
            }
          }
        }
      }
      else this.recipientoptions.push(recipient)
    })
    let temp: string[] = [];
    this.recipients.forEach(recipient => {
      if (this.recipientoptions.findIndex(x => x.main === recipient) >= 0) temp.push(recipient);
    })
    this.recipients = [...temp];
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

  onClickFilter(e: any) {
    let idx = this.filters.findIndex(x => x === e.target.value);
    if (e.target.checked === true) {
      if (idx <= 0) this.filters.push(e.target.value)
    }
    else {
      if (idx >= 0) this.filters = this.filters.filter(x => x !== e.target.value)
    }
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
        title: "Cards ( " + count + " )",
        url: "",
        active: true
      }
    ];
    this.ref.detectChanges();
  }

  onSearch(search: string) {
    if (search !== '' && search !== 'all') {

      let event = this.cardevents.find(x => x.toLowerCase() === search.toLowerCase())
      if (event) {
        this.event = event;
        this.events.push(event);
      }
      else {
        this.event = '';
        this.events = [];
      }

      let recipient: string = '';
      this.recipientoptions.forEach(x => {
        if (x.main.toLowerCase() === search.toLowerCase()) recipient = x.main
        else {
          if (x.others) {
            if (x.others.find(other => other.toLowerCase() === search.toLowerCase())) recipient = x.main;
          }
        }
      });

      if (recipient !== '') {
        this.recipient = recipient;
        this.recipients.push(recipient);
      }
      else {
        this.recipient = '';
        this.recipients = [];
      }

      let filter = this.filteroptions.find(x => x.toLowerCase() === search.toLowerCase());
      if (filter) {
        this.filter = filter;
        this.filters.push(filter);
      } else {
        this.filter = '';
        this.filters = [];
      }

      if (this.event === '' && this.recipient === '' && this.filter === '') this.searchstring = search;
    }
    else {
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];
      this.filter = '';
      this.filters = [];
      this.searchstring = '';
    }
    this.ref.detectChanges();
    this.loadDisplay();
  }
}
