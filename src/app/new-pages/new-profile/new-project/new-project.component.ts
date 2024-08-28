import { Component, OnInit } from '@angular/core';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) { 
    this.storageService = _storageService;
  }

  projects: INewPersonalize[] = [];

  ngOnInit(): void {
    let ids = this.storageService.getPersonalizeIds();
    ids.forEach(id => {
      let project = this.storageService.getPersonalize(id)
      if (project) this.projects.push(project)
    })
  }

}
