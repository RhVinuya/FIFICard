import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-postcards',
  templateUrl: './new-layout-postcards.component.html',
  styleUrls: ['./new-layout-postcards.component.scss']
})
export class NewLayoutPostcardsComponent implements OnInit {

  constructor() { }

  events: string[] = environment.postcardevents;


  ngOnInit(): void {
  }

}
