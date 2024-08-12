import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card';
import { SettingService } from 'src/app/services/setting.service';

export class Choice {
  public type: string;
  public price: number;

  constructor(_type: string, _price: number) {
    this.type = _type;
    this.price = _price;
  }
}

@Component({
  selector: 'app-type-upgrade',
  templateUrl: './type-upgrade.component.html',
  styleUrls: ['./type-upgrade.component.scss']
})
export class TypeUpgradeComponent implements OnInit {
  @Input() set def(_default: string) {
    this.setChoices(_default);
  }

  @Input() set sel(_selected: string) {
    this.selected = _selected;
  }

  @Output() additional: EventEmitter<[string, number]> = new EventEmitter();

  service: SettingService;

  constructor(
    _service: SettingService
  ) {
    this.service = _service;
  }

  selected: string = '';
  choices: Choice[] = [];


  standard: number = 0;
  glittered: number = 0;
  embossed: number = 0;

  ngOnInit(): void {
  }

  setChoices(def: string) {
    this.choices = [];
    this.choices.push(new Choice(def, 0));
    this.setUpgrade(def);
  }

  setUpgrade(def: string) {
    this.service.getUpgrade().then(upgrades => {
      upgrades.forEach(upgrade => {
        if (upgrade.from == def) {
          this.choices.push(new Choice(upgrade.to, upgrade.add_price));
        }
      });
    });
  }

  change(choice: Choice) {
    this.selected = choice.type;
    this.additional.emit([choice.type, choice.price]);
  }
}
