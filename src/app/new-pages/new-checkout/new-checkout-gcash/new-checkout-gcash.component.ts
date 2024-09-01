import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-new-checkout-gcash',
  templateUrl: './new-checkout-gcash.component.html',
  styleUrls: ['./new-checkout-gcash.component.scss']
})
export class NewCheckoutGcashComponent implements OnInit {
  @Output() onFileReceived: EventEmitter<string> = new EventEmitter();

  activeModal: NgbActiveModal;
  fileService: NewFileService;

  constructor(
    _activeModal: NgbActiveModal,
    _fileService: NewFileService
  ) { 
    this.activeModal = _activeModal
    this.fileService = _fileService;
  }

  step: number = 1;
  processing: boolean;

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  prev() {
    if (this.step > 1) this.step = this.step - 1;
  }

  next(){
    if (this.step <= 4) this.step = this.step + 1;
  }

  async onFileSelected(event: Event): Promise<void> {
    this.processing = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      let uploadResult = await this.fileService.uploadFile(file);
      this.onFileReceived.emit(uploadResult.metadata.fullPath);
    }
    this.processing = false;
  }

}
