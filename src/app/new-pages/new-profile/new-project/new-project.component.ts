import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  personalizeService: NewPersonalizeService;
  modalService: NgbModal;

  constructor(
    _personalizeService: NewPersonalizeService,
    _modalService: NgbModal
  ) { 
    this.personalizeService = _personalizeService;
    this.modalService = _modalService;
  }

  loading: boolean = false;
  projects: INewPersonalize[] = [];

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.projects = await this.personalizeService.getAll();
    this.loading = false;
  }

  delete(id: string){
    const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
    reference.componentInstance.title = 'Delete';
    reference.componentInstance.message = "Delete Personalize Project " + id;
    reference.componentInstance.yes = 'DELETE';
    reference.componentInstance.no = 'CANCEL';
    let resultSubs = reference.componentInstance.result.subscribe((value: any) => {
      if (value) {
        this.personalizeService.delete(id);
        this.projects = this.projects.filter(x => x.id !== id); 
      }
      reference.close();
      resultSubs.unsubscribe();
    })
  }

}
