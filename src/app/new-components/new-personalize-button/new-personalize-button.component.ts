import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPersonalizeComponent } from 'src/app/new-pages/new-personalize/new-personalize.component';

@Component({
  selector: 'app-new-personalize-button',
  templateUrl: './new-personalize-button.component.html',
  styleUrls: ['./new-personalize-button.component.scss']
})
export class NewPersonalizeButtonComponent implements OnInit {

  modalService: NgbModal;

  constructor(
    _modalService: NgbModal
  ) { 
    this.modalService = _modalService;
  }

  isHover: boolean = false

  ngOnInit(): void {
  }

  mouserEnter(){
    this.isHover = true;
  }

  mouseLeave(){
    this.isHover = false;
  }

  onPersonalize() {
    this.modalService.open(NewPersonalizeComponent, { animation: true, fullscreen: true });
  }

}
