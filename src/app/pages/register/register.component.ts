import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  modalService: NgbModal;

  constructor(
    _modalService: NgbModal
  ) { 
    this.modalService = _modalService;
  }

  ngOnInit(): void {
  }

  close(){
  }

}
