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
  loading: boolean = false;
  postcards: INewPostcard[] = [];
  display: INewPostcard[] = [];
  displayCount: number = 20;
  events: string[] = []

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
    this.postcards = await this.postcardService.getAll();
    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length
  }

  loadDisplay() {
    if (this.postcards.length > 0) {
      this.display = [];
      if (this.events.length === 0) {
        this.postcards.forEach(postcard => {
          let found: boolean = false;
          environment.cardevents.forEach(event => {
            if (postcard.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, postcard];
        });
      }
      else {
        this.postcards.forEach(postcard => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (postcard.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, postcard];
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
        title: "Postcards ( " + count + " )",
        url: "",
        active: true
      }
    ];
    this.ref.detectChanges();
  }

}
