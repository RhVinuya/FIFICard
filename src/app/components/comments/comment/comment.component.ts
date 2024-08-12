import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.prod';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ECardComment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() placeholder: string;
  @Input() maxlength: number = 500;
  @Output() save: EventEmitter<ECardComment> = new EventEmitter<ECardComment>()

  userService: UserService;

  constructor(
    _userService: UserService
  ) { 
    this.userService = _userService;
  }

  min: number = 14;
  max: number = 40;
  fonts = environment.fontstyles;
  colors = environment.fontcolors.filter(x => x.name != 'White');

  text: string = '';
  fontstyle: string = this.fonts[0];
  fontcolor: string = this.colors[0].hex
  fontsize: number = this.min;
  position: number = 0;
  toggle: boolean = false;

  ngOnInit(): void {
  }

  changeStyle(event: any){
    this.fontstyle = event.target.value;
  }

  changeColor(event: any){
    this.fontcolor = event.target.value;
  }

  changeSize(event: any){
    let value: number = Number(event.target.value);
    if (value < this.min)
      value = this.min;
    else if (value > this.max)
      value = this.max;
    this.fontsize = value;
  }

  keyup(event: any){
    this.position = event.target.selectionEnd;
    this.text = event.target.value;
  }

  focus(event: any) {
    this.position = event.target.selectionEnd;
  }

  click(event: any){
    this.position = event.target.selectionEnd;
  }

  emoji(display: boolean){
    this.toggle = display;
  }

  addEmoji(event: any) {
    if (this.position == this.text.length) {
      this.text += event.emoji.native 
    }
    else {
      this.text = this.text.substring(0, this.position) + event.emoji.native + this.text.substring(this.position);
    }
    this.position = this.position + event.emoji.native.length;
    this.toggle = false;
  }

  async getUser(){
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    if ((userDetails == null || userDetails.length < 0 ? true : false) == false){
      let user = await this.userService.getUser(userDetails.uid); 
      return user.firstname + ' ' + user.lastname;
    }
    else{
      return 'Guest'
    }
  }

  clear(){
    this.text = '';
    this.fontstyle = this.fonts[0];
    this.fontcolor = this.fonts[0];
    this.fontsize = this.min;
    this.position = 0;
  }

  async send(){
    let comment: ECardComment = new ECardComment();
    comment.message = this.text;
    comment.fontstyle = this.fontstyle;
    comment.fontcolor = this.colors[0].hex;
    comment.fontsize = this.fontsize;
    comment.user = await this.getUser();
    this.save.emit(comment);
    this.clear();
  }
}
