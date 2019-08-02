import { Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'menu-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {

  show = false;
  @Input('data') data;
  @Input('name') name: string;
  @Input('value') value: string;
  @Output('change') change = new EventEmitter();

  constructor(
    private ElementRef: ElementRef,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  @HostListener("document:click", ['$event']) onClick(event) {
    if (!this.ElementRef.nativeElement.contains(event.target)) {
      this.show = false;
      this.ChangeDetectorRef.markForCheck();
    }
  }

  orderKeyValue(akv: KeyValue<number, string>, bkv: KeyValue<number, string>): number {
    return 0;
  }

  toggle() {
    this.show = !this.show;
    this.ChangeDetectorRef.markForCheck();
  }

  setValue(value) {
    this.value = value.key;
    this.change.emit(this.value);
    this.toggle();
    this.ChangeDetectorRef.markForCheck();
  }

  trackByFn(index, item) {
    return index;
  }

}
