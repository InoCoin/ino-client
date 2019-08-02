import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserProvider } from 'src/app/providers';

@Component({
  selector: 'configuration-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfigurationComponent {

  limit = 5;
  skip = 0;
  users = [];
  loaded = false;


  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.onLoadUsers();
  }

  onLoadUsers() {
    if (!this.loaded) {
      this.UserProvider.getAdmin(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((u) => {
            this.users.push(u);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

}
