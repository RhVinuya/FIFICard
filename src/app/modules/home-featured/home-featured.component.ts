
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home-featured',
  templateUrl: './home-featured.component.html',
  styleUrls: ['./home-featured.component.scss']
})
export class HomeFeaturedComponent implements OnInit {
  @Input() homeCardEvent?: string;
  @Input() limit?: string;
  service: CardService;
  cards: Card[] = [];
  randomCards: Card[] = [];
  displayCards: Card[] = [];
  page: number = 1;
  index: number;
  disablePrev: boolean;
  disableNext: boolean;
  temp: any;
  imageUrl: string[] = [];
  cardEvent: string;
  isMobile: boolean;

  constructor(private _service: CardService,) { 
    this.service = _service;
  }
  ngOnInit() {
    this.loadFeatured();
    this.isMobile = window.orientation > -1;
  }
  loadFeatured(){
    this.service.getFeaturedCards(this.homeCardEvent?.trim()!, Number(this.limit)).then(data => {
      this.randomCards = [];
      let ctr = 1;
      data.forEach(async card => {
               this.randomCards.push(card);  
               this.getImage(card);
               if(ctr == data.length){ 
                 this.loadBatch(1);
               }
               ctr = ctr+1;
      });
    });
  }
  getImage(card: Card){
    this.temp = this.getAvailableURL(card.primary!).then(url => {
        this.randomCards.forEach(value => {
           if(card.id == value.id){
             card.imageUrl = url;
           }
        })
    });
  }

  getAvailableURL(image: string): Promise<string>{
    return new Promise((resolve, rejects) => {
      this.service.getImageURL(image + environment.imageSize.medium).then(url => {
        resolve(url);
      }).catch(err => {
        this.service.getImageURL(image).then(url => {
          resolve(url);
        });
      });
    });
  }

  loadBatch(_index: number){
      this.displayCards = [];
      const cardCount = Number(this.limit);
      const displayCount = this.isMobile? 2 : 4;
      let pageCount = cardCount/displayCount; 
          if(_index == 1){
            for(let i = (displayCount*(_index-1)); i <= (displayCount*_index)-1; i++){
              this.displayCards.push(this.randomCards[i]);
              this.disablePrev = true;
              this.disableNext = (this.randomCards.length>(displayCount*1)-1) ? false : true;
            }
          }else if(_index > 1 && _index < pageCount){
            for(let i = (displayCount*(_index-1)); i <= (displayCount*_index)-1; i++){
              this.displayCards.push(this.randomCards[i]);
              this.disablePrev = false;
              this.disableNext = (this.randomCards.length>(displayCount*1)-1) ? false : true;
            }
          }else{
            for(let i = (displayCount*(_index-1)); i <=(displayCount*_index)-1; i++){
              this.displayCards.push(this.randomCards[i]);
              this.disablePrev = false;
              this.disableNext = true;
            }
          }

  }
  
  leftClick(){
    this.page-=1;
    this.loadBatch(this.page);
  }
  
  rightClick(){
    this.page+=1;
    this.loadBatch(this.page);
  }

}