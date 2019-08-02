import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'scroller-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScrollerComponent {

  interval;
  api_url = Environment.api_url;
  @Input('data') data: Array<any>;

  step = 500;
  actions = {
    next: 0,
    prev: 1
  }

  @ViewChild('list', { static: true }) list: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  trackByFn(index, item) {
    return item._id;
  }

  next() {
    this.setStep();
    const distance = this.list.nativeElement.scrollLeft + this.step;
    this.scrolltTo(distance, this.actions.next);
  }

  prev() {
    this.setStep();
    const distance = this.list.nativeElement.scrollLeft - this.step;
    this.scrolltTo(distance, this.actions.prev);
  }

  setStep() {
    const element = this.list.nativeElement;
    if (element.clientWidth < 500) {
      return this.step = element.clientWidth - 50;
    }
    this.step = element.clientWidth;
  }

  track(index, item) {
    return item._id;
  }

  private scrolltTo(distance, action) {
    if (isPlatformBrowser(this.platformId)) {

      const element = this.list.nativeElement;
      const interval = setInterval(() => {

        switch (action) {
          case (this.actions.next): {
            if (Math.ceil(element.scrollLeft + element.clientWidth) >= element.scrollWidth || element.scrollLeft > distance) {
              return clearInterval(interval);
            }
            element.scrollLeft += 9;
            break;
          }
          case (this.actions.prev): {
            if (element.scrollLeft <= 0 || element.scrollLeft < distance) {
              return clearInterval(interval);
            }
            element.scrollLeft -= 9;
            break;
          }
        }
      });
    }

  }


}
