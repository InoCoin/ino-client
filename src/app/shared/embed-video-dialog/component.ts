import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Errors } from '../../../globals/errors';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'embed-video-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class EmbedVIdeoDialog {

  errors: any = {};

  form = new FormGroup({
    video: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private MatDialogRef: MatDialogRef<EmbedVIdeoDialog>) { }

  submit() {

    let keys = Object.keys(this.form.controls);
    this.errors = {};

    if (this.form.valid) {
      return this.MatDialogRef.close(this.form.value.video);
    }

    keys.forEach((key: string) => {
      if (this.form.controls[key].invalid) {
        let errors = Object.keys(this.form.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.form.controls[key], key))
        });
      }
    });

  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
