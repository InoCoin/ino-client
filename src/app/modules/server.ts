import { InjectionToken } from '@angular/core';

export const WEB3 = new InjectionToken('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      return {};
    } catch (err) {
      throw new Error('Non-Ethereum browser detected.!');
    }
  }
});

export const TH = new InjectionToken('Transaction', {
  providedIn: 'root',
  factory: () => {
    try {
      return {};
    } catch (err) {
      throw new Error('Non-Ethereum browser detected.!');
    }
  }
});