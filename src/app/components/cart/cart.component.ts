import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userService: UserService;
  count: number = 0;

  constructor(
    _userService: UserService
  ) { 
    this.userService = _userService;
  }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    if (userDetails){
      this.userService.subscribeUser(userDetails?.uid).subscribe(user => {
        this.count = 0;
        if (user.carts){
          this.count += user.carts.length;
        }
        if (user.ecarts){
          this.count += user.ecarts.length;
        }
      })
    }
  }

}
