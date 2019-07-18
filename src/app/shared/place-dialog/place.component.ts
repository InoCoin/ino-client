import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Errors } from '../../../globals/errors';

@Component({
  selector: 'place-dialog',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})

export class PlaceDialog {

  submit = false;
  errors: any = {};

  placeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    public MatDialogRef: MatDialogRef<PlaceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    let keys = Object.keys(data);

    keys.forEach((key: string) => {
      if (this.placeForm.controls[key]) {
        this.placeForm.controls[key].setValue(data[key]);
      }
    });

  }

  onPostPlace() {

    this.submit = true;
    this.errors = {};

    if (this.placeForm.valid) {

      this.MatDialogRef.close({
        ...this.placeForm.value
      })

      return true;
    }

    if (this.placeForm.invalid) {
      let keys = Object.keys(this.placeForm.controls);

      keys.forEach((key: string) => {
        if (this.placeForm.controls[key].invalid) {

          let errors = Object.keys(this.placeForm.controls[key].errors);
          this.errors[key] = [];

          errors.forEach((e: string) => {
            this.errors[key].push(Errors[e](this.placeForm.controls[key], key, true))
          });

        }
      });

    }

  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
