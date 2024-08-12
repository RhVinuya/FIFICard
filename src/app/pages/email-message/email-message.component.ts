import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent implements OnInit {
  activateRoute: ActivatedRoute;
  emailService: EmailService;
  orderService: OrderService;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _emailService: EmailService,
    private _orderService: OrderService
  ) { 
    this.activateRoute = _activateRoute;
    this.emailService = _emailService;
    this.orderService = _orderService
  }

  htmlString: string;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let type: string = params['type'];
      let id: string = params['id'];
      if (type == 'ecard'){
        this.orderService.getECardOrder(id).then(order => {
          this.emailService.generateECardEmail(order).then(html => {
            this.htmlString = html;
          })
        })
      }
      else if (type == 'confirm'){
        this.orderService.getECardOrder(id).then(order => {
          this.emailService.generateECardConfimation(order).then(html => {
            this.htmlString = html;
          })
        })
      }
      else if (type == 'opened'){
        this.orderService.getECardOrder(id).then(order => {
          this.emailService.generateECardOpenedEmail(order).then(html => {
            this.htmlString = html;
          })
        })
      }
      else if (type == 'openedconfirm'){
        this.orderService.getECardOrder(id).then(order => {
          this.emailService.generateECardOpenedConfirmEmail(order).then(html => {
            this.htmlString = html;
          })
        })
      }
    });
  }

}
