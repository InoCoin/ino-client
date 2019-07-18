import { Component, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Web3Provider } from '../../providers';
import { FileTypes, Environment } from '../../../globals/config';
import { Errors } from '../../../globals/errors';

declare const tinymce;


@Component({
  selector: 'project-dialog',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectDialog implements OnDestroy, AfterViewInit {

  editor;
  image;
  rewards;
  
  gallery = [];
  removedPhotos = [];
  api_url = Environment.api_url;
  submit = false;
  errors: any = {};

  projectForm = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    public MatDialogRef: MatDialogRef<ProjectDialog>,
    private DomSanitizer: DomSanitizer,
    private Web3Provider: Web3Provider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    let keys = Object.keys(data);

    keys.forEach((key: string) => {
      if (this.projectForm.controls[key]) {
        this.projectForm.controls[key].setValue(data[key]);
      }
    });

    this.image = data.image;
    this.gallery = data.gallery;
    this.rewards = this.data.rewards || [];
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#editor',
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
      },
      init_instance_callback: (editor) => {
        editor.setContent(this.data.content);
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  onPostProject() {

    this.submit = true;
    this.errors = {};

    this.projectForm.controls.content.setValue(this.editor.getContent());

    if (this.projectForm.valid && this.image != null && this.gallery.length > 0 && this.Web3Provider.checkAddress(this.projectForm.controls.address.value)) {
      this.MatDialogRef.close({
        ...this.projectForm.value,
        image: this.image,
        gallery: this.gallery,
        removedPhotos: this.removedPhotos,
        rewards: this.rewards
      })

      return true;
    }

    if (this.projectForm.invalid) {
      let keys = Object.keys(this.projectForm.controls);

      keys.forEach((key: string) => {
        if (this.projectForm.controls[key].invalid) {

          let errors = Object.keys(this.projectForm.controls[key].errors);
          this.errors[key] = [];

          errors.forEach((e: string) => {
            this.errors[key].push(Errors[e](this.projectForm.controls[key], key, true))
          });

        }
      });

    }

    if (!this.Web3Provider.checkAddress(this.projectForm.controls.address.value)) {
      if (Array.isArray(this.errors.address)) {
        this.errors.address.push('Address is not valid !');
      } else {
        this.errors.address = ['Address is not valid !'];
      }
    }

    if (this.image == null) {
      this.errors.image = ['Profile image is required !'];
    }

    if (this.gallery.length == 0) {
      this.errors.gallery = ['Please upload a gallery !'];
    }

  }

  onAddFile() {
    setTimeout(() => {
      let input: any = document.createElement('input');
      window['d'] = input
      input.type = 'file';
      input.multiple = false;
      input.onchange = this.handleFile.bind(this);
      input.click();
      input.remove();
    }, 200);
  }


  onAddFiles() {
    setTimeout(() => {
      let input: any = document.createElement('input');

      input.type = 'file';
      input.multiple = true;
      input.onchange = this.handleFiles.bind(this);
      input.click();
      input.remove();
    }, 200);
  }



  handleFile(event: any) {
    let files: File = event.target.files;
    if (files) {
      let fs = Object.keys(files);
      fs.forEach((o) => {
        let file = files[o];

        if (this.getFileType(file) == FileTypes.image.type) {
          file.blobUrl = window.URL.createObjectURL(file)
          this.image = file;
        }
      });
    }
  }

  handleFiles(event: any) {
    let files: File = event.target.files;
    if (files) {
      let fs = Object.keys(files);
      fs.forEach((o) => {
        let file = files[o];

        if (this.getFileType(file) == FileTypes.image.type) {
          file.blobUrl = window.URL.createObjectURL(file)
          this.gallery.push(file);
        }
      });
    }
  }


  getFileType(file) {

    let keys = Object.keys(FileTypes);

    for (let i = 0; i < keys.length; i++) {

      let types = FileTypes[keys[i]].suportedTypes;
      let maxSize = FileTypes[keys[i]].maxSize;

      if (file.size > maxSize) {
        return -2;
      }

      for (let j = 0; j < types.length; j++) {
        if (types[j] == file.type) {
          return FileTypes[keys[i]].type;
        }
      }

    }

    return -1;

  }

  getUrl(url) {
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }

  getImageUrl(i) {

    let photo = this.gallery[i];

    if (photo instanceof File) {
      return this.DomSanitizer.bypassSecurityTrustUrl(photo['blobUrl']);
    } else {
      return `${this.api_url}/min_uploads/images/${photo.name}`;
    }

  }

  removeImage(index) {
    if (!(this.gallery[index] instanceof File)) {
      this.removedPhotos.push(this.gallery[index]);
    }
    this.gallery.splice(index, 1);
  }

  getKeys() {
    return Object.keys(this.errors);
  }

  addReward() {
    this.rewards.push({
      from: '',
      to: '',
      reward: ''
    })
  }

  removeReward(i) {
    this.rewards.splice(i, 1);
  }

}
