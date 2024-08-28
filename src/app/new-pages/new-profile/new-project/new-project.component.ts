import { Component, OnInit } from '@angular/core';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  personalizeService: NewPersonalizeService;

  constructor(
    _personalizeService: NewPersonalizeService
  ) { 
    this.personalizeService = _personalizeService;
  }

  loading: boolean = false;
  projects: INewPersonalize[] = [];

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.projects = await this.personalizeService.getAll();
    this.loading = false;
  }

}
