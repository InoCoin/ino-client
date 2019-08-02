import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})

export class UpdateProvider {
  constructor(
    private SwUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platformId
  ) {
    if (isPlatformBrowser(this.platformId) && this.SwUpdate.isEnabled) {
      this.SwUpdate.available.subscribe(() => {
        location.reload(true);
      });
    }
  }
}