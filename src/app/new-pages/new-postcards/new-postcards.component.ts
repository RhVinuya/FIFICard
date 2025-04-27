import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-postcards',
  templateUrl: './new-postcards.component.html',
  styleUrls: ['./new-postcards.component.scss']
})
export class NewPostcardsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  postcardService: NewPostcardService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _postcardService: NewPostcardService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.postcardService = _postcardService;
    this.ref = _ref;
  }

  postcardevents = environment.postcardevents;
  activeevents: string[] = [];
  loading: boolean = false;
  postcards: INewPostcard[] = [];
  display: INewPostcard[] = [];
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
      title: "Postcards",
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
    this.loadPostcards();
  }

  async loadPostcards() {
    this.loading = true;
    let list = await this.postcardService.getAll();

    this.postcards = [...list.filter(x => x.featured), ...list.filter(x => x.featured !== true)]

    this.postcardevents.forEach(event => {
      let list = this.postcards.filter(x => x.events.filter(y => y.toLowerCase() === event.toLowerCase()))
      if (list.length > 0) this.activeevents.push(event)
    })

    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  filterEvents(events: string[], items: INewPostcard[]): INewPostcard[] {
    if (events.length === 0) return [...items];
    else return [...items].filter(item => {
      return events.some(event => {
        return item.events.some(x => x.toLowerCase() === event.toLowerCase())
      })
    })
  }

  filterBySearch(search: string, items: INewPostcard[]): INewPostcard[] {
      if (search === '') return [...items];
      else {
        let searches = search.split(' ');
        return [...items].filter(postcard => {
          if (postcard.name.toLowerCase().includes(search.toLowerCase())) return true;
          if (searches.some(search => postcard.name.toLowerCase().includes(search.toLowerCase()))) return true;
  
          if (postcard.events.some(event => event.toLowerCase().includes(this.searchstring.toLowerCase()))) return true;
          if (searches.some(search => postcard.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) return true;
  
          if (postcard.code === search) return true;
  
          return false
        })
      }
    }

  loadDisplay() {
    if (this.postcards.length > 0) {
      this.display = [];
      let filterByEvents = this.filterEvents(this.events, this.postcards);
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
        title: "Postcards ( " + count + " )",
        url: "",
        active: true
      }
    ];
    this.ref.detectChanges();
  }

  onSearch(search: string) {
    if (search !== '' && search !== 'all') {
      let event = this.postcardevents.find(x => x.toLowerCase() === search.toLowerCase())
      if (event) this.events = [event];

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
