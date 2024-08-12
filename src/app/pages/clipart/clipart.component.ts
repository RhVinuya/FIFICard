import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-clipart',
  templateUrl: './clipart.component.html',
  styleUrls: ['./clipart.component.scss']
})
export class ClipartComponent implements OnInit {
  cardService: CardService;

  constructor(
    _cardService: CardService
  ) {
    this.cardService = _cardService
  }

  cliparts: Card[] = [];
  display: Card[] = [];
  alphabet: string[] = ['a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'];
    selected: string = 'all';

  ngOnInit(): void {
    this.loadCliparts()
  }

  loadCliparts() {
    this.cardService.getCardsByType('clipart').then(cliparts => {
      this.cliparts = cliparts;
      this.loadDisplay();
    });
  }

  loadDisplay() {
    if (this.selected == 'all'){
      this.display = this.cliparts;
    }
    else{
      this.display = this.cliparts.filter(x => {
        return x.name!.toUpperCase().startsWith(this.selected.toUpperCase());
      })
    }
  }

  onSelectChange(value: string){
    this.selected = value;
    this.loadCliparts();
  } 

  isThereAClipartFor(letter: string): boolean{
    return this.cliparts.filter(x => {
      return x.name!.toUpperCase().startsWith(letter.toUpperCase());
    }).length > 0
  }

}
