import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NewEvent } from "src/app/new-models/new-event";
import { NewFileService } from "src/app/new-services/new-file.service";

@Component({
  selector: "app-card-category-mobile",
  templateUrl: "./card-category-mobile.component.html",
  styleUrls: ["./card-category-mobile.component.scss"],
})
export class CardCategoryMobileComponent implements OnInit {
  @Input() event: NewEvent;
  @Input() bundle: boolean = false;
  
  fileService: NewFileService;
  iconUrl: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  constructor(
    public router: Router,
    _fileService: NewFileService,
  ) {
    this.fileService = _fileService;
  }

  async ngOnInit(): Promise<void> {
    if(this.event.icon) {
      this.iconUrl =  await this.fileService.getImageURL(this.event.icon);
    }
  }

  onClick() {
    if (this.bundle) {
      this.router.navigate(['/new/cards/' + this.event.name], { queryParams: {bundle: true}});
    } else {
      this.router.navigate(['/new/cards/' + this.event.name]);
    }
  }
}
