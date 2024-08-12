import { ImageService } from 'src/app/services/image.service';
import { CardService } from 'src/app/services/card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  userService: UserService;
  cardService: CardService;

  constructor(
    private _userService: UserService,
    private _cardService: CardService
  ) {
    this.userService = _userService;
    this.cardService = _cardService;
  }

  uid: string;
  user: User;
  start: number = 0;
  limit: number = 5;
  favorites: string[] = []
  cards: Card[] = [];

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.uid).then(user => {
      this.user = user;
      if (user.favorites) {
        this.favorites = user.favorites;
        this.loadBatch();
      }
    })
  }

  loadBatch() {
    let end = this.start + this.limit;
    if (end > this.favorites.length){
      end = this.favorites.length
    }
    let ids = this.favorites.slice(this.start, end);
    this.start = end;
    this.getCards(ids);
  }

  getCards(ids: string[]) {
    ids.forEach(async id => {
      let card = await this.cardService.getACard(id);
      this.cards.push(card);
    });
  }

  onLoadMore(){
    this.loadBatch();
  }
}
