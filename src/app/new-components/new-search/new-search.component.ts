import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.scss']
})
export class NewSearchComponent {
  @ViewChild(IonSearchbar, { static: false }) searchbar!: IonSearchbar;

  @Input() placeholder: string = '';
  @Input() set enable(value: boolean) {
    this.available = value;
    if (value) this.searchbar.setFocus();
  }
  @Output() onsearch: EventEmitter<string> = new EventEmitter<string>();

  available: boolean = false;
  form = new FormGroup({
    search: new FormControl<string>('')
  });

  onSubmit()  {
    if (this.form.invalid) return;
    const search = this.form.controls.search.value!.trim().replace('-',' ');
    this.onsearch.emit(search);
  }

  onClear() {
    this.onsearch.emit("");
  }
}
