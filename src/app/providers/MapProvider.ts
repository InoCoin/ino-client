import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapProvider {

  readonly USER = 'user';
  readonly NEWS = 'news';

  private map = new Map<string, any>();
  private change = {};

  constructor() { }

  keys() {
    return this.map.keys();
  }

  get(key: string): any {
    return this.map.get(key);
  }

  set(key: string, value: any): Map<string, any> {
    let r = this.map.set(key, value);

    if (this.change[key] instanceof EventEmitter) {
      this.change[key].emit(this.map.get(key));
    }

    return r;
  }

  toJson(): any {
    const obj = {};
    Array.from(this.keys())
      .forEach(key => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  initialize(obj: any): void {
    Object.keys(obj)
      .forEach(key => {
        this.set(key, obj[key]);
      });
  }

  inject(): void { }

  setSubsription(name) {

    if (this.change[name]) {
      return this.change[name];
    }
    
    this.change[name] = new EventEmitter();
    return this.change[name];
  }

}
