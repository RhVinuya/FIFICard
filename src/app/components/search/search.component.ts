import { OrderECard } from '../../models/order-ecard';
import { OrderService } from 'src/app/services/order.service';
import { FilterService } from '../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  filterService: FilterService;
  fb: UntypedFormBuilder;
  router: Router;
  orderService: OrderService;

  constructor(
    private _filterService: FilterService,
    private _fb: UntypedFormBuilder,
    private _router: Router,
    private _orderService: OrderService
  ) {
    this.filterService = _filterService
    this.fb = _fb;
    this.router = _router;
    this.orderService = _orderService;
  }

  searchForm: UntypedFormGroup;
  search: string;
  budget: string = '';
  sort: string = '';

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  async searchCard() {
    if (this.searchForm.value['search']) {
      this.search = this.searchForm.value['search'];
      let order: OrderECard = await this.orderService.getECardOrder(this.search);
      if (order) {
        this.router.navigate(['/play/' + this.search]);
      }
      else {
        this.router.navigate(['/search/' + this.search]);
      }
      this.searchForm.setValue({ search: '' })
    }
  }
}
