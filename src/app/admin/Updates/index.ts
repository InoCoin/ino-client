import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { flatMap } from 'rxjs/operators';

import { ConfigurationProvider, FileProvider, LoaderProvider } from '../../providers';

@Component({
  selector: 'configuration',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Updates implements OnInit {

  configuration;
  version;
  files = [];

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private ConfigurationProvider: ConfigurationProvider,
    private FileProvider: FileProvider,
    private LoaderProvider: LoaderProvider
  ) { }

  ngOnInit() {
    this.ConfigurationProvider.get().subscribe((res) => {
      if (res.result) {
        this.configuration = res.result;
        this.version = this.configuration.version;
        this.ChangeDetectorRef.markForCheck()
      }
    })
  }

  onAddFile() {
    setTimeout(() => {
      let input: any = document.createElement('input');

      input.type = 'file';
      input.multiple = true;
      input.onchange = this.handleFiles.bind(this);
      input.click();
    }, 200);
  }

  handleFiles(event: any) {
    let files: File = event.target.files;
    this.files = [];

    if (files) {
      let fs = Object.keys(files);

      fs.forEach((o) => {
        this.files.push(files[o]);
      });

      this.ChangeDetectorRef.markForCheck()

    }
  }

  onSubmit() {
    if (this.version.length > 0 && this.files.length > 0) {

      this.LoaderProvider.show();

      this.ConfigurationProvider.put({
        version: this.version
      }).pipe(flatMap(() => {

        const formData: FormData = new FormData();

        this.files.forEach((file) => {
          formData.append('files[]', file, file.name);
        })

        return this.FileProvider.postFiles(formData)
      })).subscribe((res: any) => {
        this.files = [];
        this.LoaderProvider.hide();
        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
