import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Errors } from 'src/globals/errors';

@Component({
  selector: 'input-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputComponent implements OnInit {

  control: AbstractControl;

  @Input('errors') errors: Array<string>;
  @Input('image') image: string;
  @Input('formGroup') formGroup: FormGroup;
  @Input('formName') formName: string;
  @Input('type') type: string;
  @Input('placeholder') placeholder: string;
  @Input('autocomplete') autocomplete: string;

  constructor(private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.control = this.formGroup.controls[this.formName];
  }

  getImage() {
    if (!this.control.pristine && this.control.invalid) {
      return `url(/assets/images/wrong-${this.image})`;
    }
    return `url(/assets/images/${this.image})`;
  }

  onChange(event){
    if(event.keyCode !== 13){
      this.setErrors();
    }
  }

  setErrors() {

    this.errors = [];

    if (this.control.invalid) {

      for (let key in this.control.errors) {
        this.errors.push(Errors[key](this.control))
      }

    }

    this.ChangeDetectorRef.markForCheck();

  }

}
