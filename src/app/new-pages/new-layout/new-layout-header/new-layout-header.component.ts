import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewUser } from 'src/app/new-models/new-user';

@Component({
  selector: 'app-new-layout-header',
  templateUrl: './new-layout-header.component.html',
  styleUrls: ['./new-layout-header.component.scss']
})
export class NewLayoutHeaderComponent implements OnInit {
  @Input() type: 0 | 1;
  @Input() isUserLoggedIn: boolean = false;
  @Input() set user(_value: INewUser | undefined) {
    this._user = _value
  }
  
  @Input() set showHeader(_value: boolean) {
    this._showHeader = _value;
    if (_value == true) {
      this.forClose = true
      this.showMenu = false;
    }
  }
  @Output() onShowMenu: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  _user: INewUser | undefined = undefined;
  _showHeader: boolean = false;
  showMenu: boolean = false;
  forClose: boolean = false;
  menuType: 'stickers' | 'postcards' | 'gifts' | undefined;
  hideDivTimeout: any;

  ngOnInit(): void {
  }

  onHover(menu: 'stickers' | 'postcards' | 'gifts' | undefined) {
    if (menu) {
      this.menuType = menu;
    }
    this.forClose = false
    this.showMenu = true;
    this.onShowMenu.emit(this.showMenu)
  }

  onHoverOut() {
    this.forClose = true
    this.hideDivTimeout = setTimeout(() => {
      if (this.forClose) {
        this.showMenu = false;
        this.onShowMenu.emit(this.showMenu)
      }
    }, 200);
  }

}