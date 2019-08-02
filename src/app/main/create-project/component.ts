import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { forkJoin, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Categories, Environment, FileTypes } from 'src/globals/config';
import { Errors } from 'src/globals/errors';
import { Web3Provider, MapProvider, ProjectProvider, FileProvider } from 'src/app/providers';
import { LoginDialog } from 'src/app/shared/login-dialog';
import { EmbedVIdeoDialog } from 'src/app/shared/embed-video-dialog';
import { SuccessDialog } from 'src/app/shared/success-dialog';


@Component({
  selector: 'create-project-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateProjectComponent {

  image;
  video;
  project;
  isEdit = false;

  gallery = [];
  removedPhotos = [];
  rewards = [];
  api_url = Environment.api_url;
  categories = Categories;
  submit = false;
  isSubmit = false;
  errors: any = {};

  category = Categories.technology.key;
  categoryMethods = Categories;

  projectForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.max(255)
    ]),
    subtitle: new FormControl('', [
      Validators.required,
      Validators.max(150)
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.max(10240)
    ])
  });

  rewardForm = new FormGroup({
    from: new FormControl('', [
      Validators.required,
    ]),
    to: new FormControl('', [
      Validators.required,
    ]),
    reward: new FormControl('', [
      Validators.required,
      Validators.max(2048)
    ])
  });

  constructor(
    ActivatedRoute: ActivatedRoute,
    private ProjectProvider: ProjectProvider,
    private DomSanitizer: DomSanitizer,
    private Web3Provider: Web3Provider,
    private MapProvider: MapProvider,
    private FileProvider: FileProvider,
    private MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    const project = ActivatedRoute.snapshot.data.project;
    const key = ActivatedRoute.snapshot.params.key;

    if (key) {
      const { title, subtitle = '', address, content } = project;

      this.project = project;

      this.projectForm.setValue({
        title, subtitle, address, content
      });

      this.gallery = project.gallery;
      this.rewards = project.rewards;
      this.video = project.video;
      this.image = project.image;
      this.category = project.category;

      this.isEdit = true;
    }
  }

  changeCategory(event) {
    this.category = event;
    this.ChangeDetectorRef.markForCheck();
  }

  onAddFile() {
    setTimeout(() => {
      let input: any = document.createElement('input');
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
          this.ChangeDetectorRef.detectChanges();
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
          this.ChangeDetectorRef.markForCheck();
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

  getUrl() {
    return this.DomSanitizer.bypassSecurityTrustUrl(this.image.blobUrl);
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

  onSubmit() {
    let hasError = false;
    const user = this.MapProvider.get(this.MapProvider.USER);

    if (user == null) {
      return this.MatDialog.open(LoginDialog);
    }

    if (this.projectForm.invalid) {
      let keys = Object.keys(this.projectForm.controls);
      hasError = true;

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

    if (this.image == null) {
      this.errors.image = ['Cover image is required!'];
      hasError = true;
    }

    if (this.gallery.length == 0) {
      this.errors.gallery = ['Project images are required!'];
      hasError = true;
    }

    if (!this.Web3Provider.checkAddress(this.projectForm.controls.address.value)) {
      if (this.errors.address) {
        this.errors.address.push('Ethereum address is not valid!');
      } else {
        this.errors.address = ['Ethereum address is not valid!'];
      }
      hasError = true;
    }

    if (!hasError) {

      if (!this.isEdit) {
        this.isSubmit = true;

        this.ProjectProvider.post({
          ...this.projectForm.value,
          category: this.category,
          rewards: this.rewards,
          video: this.video
        }).pipe(flatMap((res: any) => {
          if (res.result && this.image instanceof File) {

            const formData: FormData = new FormData();
            const galleryForm: FormData = new FormData();

            const image = this.image;
            this.gallery.forEach((photo) => {
              galleryForm.append('gallery[]', photo, photo.name);
            });

            formData.append('uploads', image, image.name);

            return forkJoin([
              this.FileProvider.postImages(formData, res.result._id),
              this.FileProvider.postGallery(galleryForm, res.result._id, true)
            ])

          }

          return of(false)
        })).subscribe((data) => {
          if (data) {
            this.isSubmit = false;
            this.projectForm.reset();
            this.gallery = [];
            this.image = null;
            this.rewards = [];
            this.video = null;
            this.MatDialog.open(SuccessDialog,{
              data: {
                title: 'Create project',
                description: 'You have successfully created your project !'
              }
            });
            this.ChangeDetectorRef.markForCheck();
          }
        })
      } else {

        this.isSubmit = true;

        this.ProjectProvider.put(this.project._id, {
          ...this.projectForm.value,
          category: this.category,
          rewards: this.rewards,
          video: this.video
        }).pipe(flatMap(() => {

          const join = [];
          const newPhotos = [];

          this.gallery.forEach((i) => {
            if (i instanceof File) {
              newPhotos.push(i);
            }
          })

          if (this.image instanceof File) {

            const formData: FormData = new FormData();

            formData.append('uploads', this.image, this.image.name);

            join.push(this.FileProvider.postImages(formData, this.project._id));

          }

          if (this.removedPhotos.length > 0) {
            join.push(this.ProjectProvider.deletePhotos(this.project._id, this.removedPhotos, true));
          }

          if (newPhotos.length > 0) {
            const galleryForm: FormData = new FormData();

            newPhotos.forEach((photo) => {
              galleryForm.append('gallery[]', photo, photo.name);
            });

            join.push(this.FileProvider.postGallery(galleryForm, this.project._id, true));
          }

          if(join.length > 0){
            return forkJoin(join);
          }

          return of(false);

        })).subscribe(() => {
          this.MatDialog.open(SuccessDialog, {
            data: {
              title: 'Edit project',
              description: 'You have successfully edited your project !'
            }
          });
          this.ChangeDetectorRef.markForCheck();
        });
      }

    }

  }

  onAddReward() {
    if (this.rewardForm.valid) {
      this.rewards.push(this.rewardForm.value);
      this.rewardForm.reset();
      this.ChangeDetectorRef.markForCheck();
    }
  }

  removeReward(i) {
    this.rewards.splice(i, 1);
  }

  setVideo() {
    const dialog = this.MatDialog.open(EmbedVIdeoDialog);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.video = data;
        this.ChangeDetectorRef.markForCheck();
      }
    });
  }

  getVideo() {
    return this.DomSanitizer.bypassSecurityTrustHtml(this.video);
  }

}
