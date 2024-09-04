import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NewSignupComponent } from '../new-signup/new-signup.component';
import { NewInfoMessageComponent } from 'src/app/new-components/new-info-message/new-info-message.component';

@Component({
  selector: 'app-new-layout-footer',
  templateUrl: './new-layout-footer.component.html',
  styleUrls: ['./new-layout-footer.component.scss']
})
export class NewLayoutFooterComponent implements OnInit {

  offCanvas: NgbOffcanvas;
  modalService: NgbModal;

  constructor(
    _offCanvas: NgbOffcanvas,
    _modalService: NgbModal
  ) {
    this.offCanvas = _offCanvas;
    this.modalService = _modalService;
  }

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });
  submitted: boolean = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const reference = this.offCanvas.open(NewSignupComponent, { position: 'bottom', panelClass: 'sign-up-offcanvas' });
    reference.componentInstance.email = this.form.controls.email.value!;
    const successRef = reference.componentInstance.onSuccess.subscribe(() => {
      successRef.unsubscribe();
      const modalRef = this.modalService.open(NewInfoMessageComponent, { animation: true });
      modalRef.componentInstance.title = "Sign Up";
      modalRef.componentInstance.message = "Thank your for signing up.";
      modalRef.componentInstance.button = "CONTINUE";
      modalRef.componentInstance.onContinue.subscribe((value: any) => {
        modalRef.close();
      })
    });
  }
}
