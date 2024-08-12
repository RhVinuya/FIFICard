import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

class Item {
  public id: number;
  public top: number;
  public left: number;
  public width: number;
  public height: number;
  public style: string;
  public text: string = '';
  public size: number = 20;
  public alignment: string = "left";

  constructor(_id: number, _top: number, _left: number, _width: number, _height: number, _style: string){
    this.id = _id;
    this.top = _top;
    this.left = _left;
    this.width = _width;
    this.height = _height;
    this.style = _style;
  }
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @ViewChild("offcanvas") private offcanvas: TemplateRef<any>;

  image: string;
  items: Item[] = [];
  fonts: string[] = ['Smooch', 'Zen Loop', 'Satisfy', 'Courgette'];
  selected: Item;

  constructor(
    private offcanvasService: NgbOffcanvas
  ) { }

  ngOnInit(): void {
    this.image = '/assets/images/index.png';
    this.createTextArea();
  }

  createTextArea(){
    this.items.push(new Item(1, 150, 200, 400, 100, this.fonts[0]));
    this.items.push(new Item(2, 350, 200, 400, 100, this.fonts[0]));
  }

  textareaClick(id: number){
    this.items.forEach(item => {
      if (item.id == id){
        this.selected = item;
        this.offcanvasService.open(this.offcanvas, { position: 'end' });
      }
    });
  }

  textareaKeyup(event: any){
    this.items.forEach(item => {
      if (item.id == this.selected.id){
        item.text = event.target.value;
      }
    });
  }

  fontChange(event: any){
    this.items.forEach(item => {
      if (item.id == this.selected.id){
        item.style = event.target.value;
      }
    });
  }

  sizeChange(event: any){
    this.items.forEach(item => {
      if (item.id == this.selected.id){
        item.size = Number(event.target.value);
      }
    });
  }

  alignmentClick(alignment: string){
    this.items.forEach(item => {
      if (item.id == this.selected.id){
        item.alignment = alignment;
      }
    });
  }
}
