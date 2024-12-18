import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewReferAFriendModalComponent } from './new-refer-a-friend-modal/new-refer-a-friend-modal.component';
import { NewReferralService } from 'src/app/new-services/new-referral.service';
import { INewReferral, NewReferral } from 'src/app/new-models/new-referral';

@Component({
  selector: 'app-new-refer-a-friend',
  templateUrl: './new-refer-a-friend.component.html',
  styleUrls: ['./new-refer-a-friend.component.scss']
})
export class NewReferAFriendComponent implements OnInit {
  @Input() id: string;

  modalService: NgbModal;
  referralService: NewReferralService;

  constructor(
    _modalService: NgbModal,
    _referralService: NewReferralService
  ) { 
    this.modalService = _modalService;
    this.referralService = _referralService;
  }

  iReferrals: INewReferral[] = [];
  referrals: NewReferral[] = []

  ngOnInit(): void {
    this.loadReferrals();
  }

  loadReferrals() {
    this.referralService.getAll(this.id).then(values => {
      this.iReferrals = values;
      this.referrals = [];
      values.forEach(value => {
        this.referrals.push(new NewReferral(value));
      })
    })
  }

  onClickSendALink(){
    const reference = this.modalService.open(NewReferAFriendModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    reference.componentInstance.id = this.id;
    reference.componentInstance.referrals = this.iReferrals;
    reference.componentInstance.onUpdate.subscribe(() => {
      this.loadReferrals();
    })
  }

}
