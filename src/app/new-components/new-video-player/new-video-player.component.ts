import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-video-player',
  templateUrl: './new-video-player.component.html',
  styleUrls: ['./new-video-player.component.scss']
})
export class NewVideoPlayerComponent implements OnInit {
  @Input() url: string = '';

  activeModal: NgbActiveModal;

  constructor(
    _activeModal: NgbActiveModal
  ) { 
    this.activeModal = _activeModal;
  }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close()
  }

}
