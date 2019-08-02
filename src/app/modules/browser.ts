import { InjectionToken } from '@angular/core';
import { NetworkLink } from 'src/globals/config';
import { Transaction } from 'ethereumjs-tx';

import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      return new Web3(NetworkLink);
    } catch (err) {
      throw new Error('Non-Ethereum browser detected.!');
    }
  }
});

export const TH = new InjectionToken('Transaction', {
  providedIn: 'root',
  factory: () => {
    try {
      return Transaction;
    } catch (err) {
      throw new Error('Non-Ethereum browser detected.!');
    }
  }
});