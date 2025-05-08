
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

  filterEvents(events: string[], items: INewCard[]): INewCard[] {
    if (events.length === 0) return [...items];
    else return [...items].filter(item => {
      if (events.find(event => event.toLowerCase() === item.event.toLowerCase())) return true;
      return false;
    })
  }

  filterRecipients(recipients: string[], items: INewCard[]): INewCard[] {
    if (recipients.length === 0) return [...items];
    else if (recipients.map(x => x.toLowerCase()).includes(environment.recipientdefault.toLowerCase())) return [...items]
    else return [...items].filter(item => {
      return recipients.some(recipient => {
        if (item.recipients) {
          return item.recipients.some(itemrecipient => {
            if (itemrecipient.toLowerCase() === recipient.toLowerCase()) return true;
            else {
              let recep = this.recipientoptions.find(x => x.main.toLowerCase() === recipient.toLowerCase());
              if (recep && recep.others) return recep.others.map(other => other.toLowerCase()).includes(itemrecipient.toLowerCase())
              else return false;
            }
          })
        }
        else return false;
      });
    });
  }

  filterTags(filters: string[], items: INewCard[]): INewCard[] {
    if (filters.length === 0) return [...items];
    else return [...items].filter(item => {
      return filters.some(filter => {
        if (filter === 'POETRY' && item.messagetype === 'poetry') return true;
        else if (filter === 'MESSAGE' && item.messagetype === 'regular') return true;
        else if (filter === 'PERSONALIZED' && item.signAndSend === true) return true;
        else if (filter === 'TALKING CARD' && item.talkingcard === true) return true;
        else if (filter === 'BUNDLE' && item.cardbundle === true) return true;
        return false;
      });
    });
  }

  filterBySearch(search: string, items: INewCard[]): INewCard[] {
    if (search === '') return [...items];
    else {
      let searches = search.split(' ');
      let results: INewCard[] = [];
      [...items].forEach(card => {
        if (card.code === search) {
          results = [...results, card];
          return;
        }

        if (card.name.toLowerCase().includes(search.toLowerCase())) {
          results = [...results, card];
          return;
        }
        if (searches.some(search => card.name.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, card];
          return;
        }

        if (card.event.toLowerCase().includes(search.toLowerCase())) {
          results = [...results, card];
          return;
        }
        if (searches.some(search => card.event.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, card];
          return;
        }

        if (card.events.some(event => event.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, card];
          return;
        }
        if (searches.some(search => card.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
          results = [...results, card];
          return;
        }

        if (card.recipients) {
          if (card.recipients.some(recipient => recipient.toLowerCase().includes(search.toLowerCase()))) {
            results = [...results, card];
            return;
          }
          if (searches.some(search => card.recipients!.some(recipient => recipient.toLowerCase().includes(search.toLowerCase())))) {
            results = [...results, card];
            return;
          }
        }        
      }) 
      return results;
    }
  }

  loadDisplay() {
    if (this.cards.length > 0) {
      this.display = [];
      let filterByEvents = this.filterEvents(this.events, this.cards);
      let filterByRecipients = this.filterRecipients(this.recipients, filterByEvents);
      let fileterByTags = this.filterTags(this.filters, filterByRecipients);
      let filterBySearch = this.filterBySearch(this.searchstring, fileterByTags);
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
        this.events = [event]
      }
      else {
        this.event = '';
        this.events = [];
      }

      let recipient: string = '';
      this.recipientoptions.forEach(x => {
        if (x.main.toLowerCase() === search.toLowerCase()) recipient = x.main
        else if (x.others) if (x.others.find(other => other.toLowerCase() === search.toLowerCase())) recipient = x.main;
      });

      if (recipient !== '') {
        this.recipient = recipient;
        this.recipients = [recipient]
      }
      else {
        this.recipient = '';
      this.recipients = [];
      }

      let filter = this.filteroptions.find(x => x.toLowerCase() === search.toLowerCase());
      if (filter) {
        this.filter = filter;
        this.filters = [filter]
      }
      else {
        this.filter = '';
        this.filters = [];
      }

      if (event === undefined && recipient === '' && filter === undefined) this.searchstring = search;
      else this.searchstring = '';
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
