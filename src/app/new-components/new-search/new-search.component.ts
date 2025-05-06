import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IConfig } from 'src/app/new-models/new-config';
import { LocationType } from 'src/app/new-models/type';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { environment } from 'src/environments/environment';

interface ISuggestion {
  title: string;
  url: string;
}

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.scss']
})
export class NewSearchComponent implements OnInit {
  router: Router;
  locationService: NewLocationService;

  constructor(
    _router: Router,
    _locationService: NewLocationService
  ) {
    this.router = _router;
    this.locationService = _locationService;
  }

  form = new FormGroup({
    search: new FormControl<string>('')
  });

  default = [
    { title: "Cards", url: "/new/cards/all" },
    { title: "Stickers", url: "/new/stickers/all" },
    { title: "Postcards", url: "/new/postcards/all" }
  ]

  location: LocationType;
  suggestions: ISuggestion[] = [];

  async ngOnInit(): Promise<void> {
    this.location = this.locationService.getlocation();
    this.loadSuggestions();
  }

  loadSuggestions() {
    let suggestions: ISuggestion[] = [];
    if (this.location === 'ph') suggestions.push({ title: "Gifts", url: "/new/gifts/all" })

    environment.cardevents.forEach(x => {
      suggestions.push({
        title: x + ' Cards',
        url: 'new/cards/' + x
      });
    });
    environment.recipients.forEach(x => {
      if (x.main !== 'All')
        suggestions.push({
          title: x.main + ' Cards',
          url: 'new/cards/' + x.main
        });
    });
    suggestions.push({
      title: 'Poetry Cards',
      url: 'new/cards/POETRY'
    });
    suggestions.push({
      title: 'Message Cards',
      url: 'new/cards/MESSAGE'
    });
    suggestions.push({
      title: 'Personalized Cards',
      url: 'new/cards/PERSONALIZED'
    });
    suggestions.push({
      title: 'Talking Cards',
      url: 'new/cards/TALKING CARD'
    });

    environment.stickerevents.forEach(x => {
      suggestions.push({
        title: x + ' Stickers',
        url: 'new/stickers/' + x
      });
    });

    environment.postcardevents.forEach(x => {
      suggestions.push({
        title: x + ' Postcards',
        url: 'new/postcards/' + x
      })
    });

    if (this.location === 'ph') {
      environment.giftscategories.forEach(x => {
        suggestions.push({
          title: x + ' Gifts',
          url: 'new/gifts/' + x
        });
      });
      environment.giftsrecipients.forEach(x => {
        suggestions.push({
          title: x + ' Gifts',
          url: 'new/gifts/' + x.toUpperCase()
        });
      });
    }    

    this.suggestions = [...this.default, ...suggestions];
  }

  onSubmit() {
    if (this.form.invalid) return;
    const search = this.form.controls.search.value!;
    let suggestion = this.suggestions.find(x => x.title.toLowerCase() === search.toLowerCase());
    if (suggestion) this.router.navigate([suggestion.url])
    else this.router.navigate(['/new/search/' + search]);
  }

  onClear() {
    this.form.controls.search.setValue('');
  }

  onInput(event: Event) {
    const option = (event.target as HTMLInputElement).value;
    let suggestion = this.suggestions.find(x => x.title === option)
    if (suggestion) this.router.navigate([suggestion.url]);
  }
}
