import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input() cardId?: string;
  service: CardService;
  userService: UserService;
  count: string;
  isFavorite: boolean = false;
  cardFavorite: string[] = [];
  userFavorite: string[] = [];
  uid: string;
  user: User;

  constructor(
    private _service: CardService,
    private _userService: UserService
  ) { 
    this.service = _service;
    this.userService = _userService;
  }

  ngOnInit(): void {
    this.loadCardFavorite();
    
    const userDetails = JSON.parse(localStorage.getItem('user')!); 
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser(){
    this.userService.subscribeUser(this.uid).subscribe(user => {
      this.user = user;
      if (user.favorites){
        this.userFavorite = user.favorites;
      }
      this.updateMark();
    })
  }

  updateMark(){
    this.isFavorite = false;
    this.userFavorite.forEach(card => {
      if (this.cardId! == card){
        this.isFavorite = true;
      }
    })
  }

  loadCardFavorite(){
    this.service.getACard(this.cardId!).then(card => {
      if (card.favorites){
        this.cardFavorite = card.favorites;
      }
      this.updateCount();
    });
  }

  updateCount(){
    if (this.cardFavorite.length == 0){
      this.count = '';
    }
    else{
      this.count = this.cardFavorite.length.toString();
    }
  }

  updateFavorite(){
    this.isFavorite = !this.isFavorite;
    if(this.isFavorite){
      this.addToFavorite();
      this.addCardToFavorite();
    }
    else
    {
      this.removeToFavorite();
      this.removeCardToFavorite();
    }
  }

  addToFavorite(){
    const index = this.cardFavorite.indexOf(this.uid, 0);
    if (index < 0){
      this.cardFavorite.push(this.uid);
      this.updateCount();
      this.service.updateFavorite(this.cardId!, this.cardFavorite);
    }
  }

  removeToFavorite(){
    const index = this.cardFavorite.indexOf(this.uid, 0);
    if (index > -1) {
      this.cardFavorite.splice(index, 1);
    }
    this.updateCount();
    this.service.updateFavorite(this.cardId!, this.cardFavorite);
  }

  addCardToFavorite(){
    const index = this.userFavorite.indexOf(this.cardId!, 0);
    if (index < 0){
      this.userFavorite.push(this.cardId!);
      this.updateMark();
      this.userService.updateFavorites(this.uid!, this.userFavorite);
    }
  }

  removeCardToFavorite(){
    const index = this.userFavorite.indexOf(this.cardId!, 0);
    if (index > -1) {
      this.userFavorite.splice(index, 1);
    }
    this.updateMark();
    this.userService.updateFavorites(this.uid!, this.userFavorite);
  }
}
