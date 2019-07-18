import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Contract, ABI, NetworkLink } from '../../globals/config';

import Web3 from '../../../dist/web3';
import Tx from '../../../dist/tx';

import { Buffer } from 'buffer';

// declare let Web3: any;
// declare let Tx: any;

@Injectable()
export class Web3Provider {

  private web3;
  private contract;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.web3 = new Web3(new Web3.providers.HttpProvider(NetworkLink));
      this.contract = new this.web3.eth.Contract(ABI, Contract);
    }

  }

  checkAddress(address) {
    return this.web3.utils.isAddress(address);
  }

  getBalance(address) {
    return this.contract.methods.balanceOf(address).call({ from: address }).then((tokens) => {
      return this.web3.utils.fromWei(tokens, 'wei');
    });
  }

  getEthBalance(address) {
    return this.web3.eth.getBalance(address).then((value) => {
      value = this.web3.utils.fromWei(value, 'ether')
      return Number(value).toFixed(6);
    });
  }

  getPrivKey(keyStore, password) {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        try {
          let r = this.web3.eth.accounts.decrypt(keyStore, password);
          resolve(r);
        } catch (e) {
          reject(e);
        }
      }, 200);
    });
  }

  exportKeyStore(privateKey, password) {
    return new Promise((resolve, reject) => {
      return resolve(this.web3.eth.accounts.encrypt(privateKey, password));
    });
  }

  createTransaction(privatekey, address, amount, to) {

    privatekey = privatekey.slice(2, privatekey.length);

    return Promise.all([
      this.web3.eth.getTransactionCount(address),
      this.web3.eth.getGasPrice()
    ]).then(([count, gas]) => {

      const gasLimit = 90000;

      const privateKey = new Buffer(privatekey, 'hex');
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0.0', 'ether'));

      const rawTx = {
        nonce: (this.web3.utils.numberToHex(count)),
        gasPrice: this.web3.utils.toHex(gas),
        gasLimit: this.web3.utils.toHex(gasLimit),
        to: Contract,
        value: txValue,
        data: this.contract.methods.transfer(to, this.web3.utils.toWei(amount.toString(), 'wei')).encodeABI(),
      }

      const tx = new Tx(rawTx);

      tx.sign(privateKey);

      return this.web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .on('receipt', (log) => {
          console.log("-> receipt");
          console.log(log);
          return Promise.resolve(log);
        })
        .on('error', function (error) {
          console.log("-> error");
          console.log(error.message);
        })
        .on('transactionHash', function (transactionHash) {
          console.log("-> transactionHash");
          console.log(transactionHash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log("-> confirmation " + confirmationNumber);
        });
    });

  }

  sendEthers(privatekey, address, amount, to) {

    privatekey = privatekey.slice(2, privatekey.length);

    return Promise.all([
      this.web3.eth.getTransactionCount(address),
      this.web3.eth.getGasPrice()
    ]).then(([count, gas]) => {

      const gasPrice = gas;
      const gasLimit = 90000;
      const privateKey = new Buffer(privatekey, 'hex');
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));

      const rawTx = {
        nonce: (this.web3.utils.numberToHex(count)),
        gasPrice: this.web3.utils.toHex(gasPrice),
        gasLimit: this.web3.utils.toHex(gasLimit),
        to: to,
        value: txValue
      }

      const tx = new Tx(rawTx);

      tx.sign(privateKey);

      return this.web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .on('receipt', (log) => {
          console.log(log)
          return Promise.resolve(log);
        })
        .on('error', function (error) {
          console.log("-> error");
          console.log(error.message);
        })
        .on('transactionHash', function (transactionHash) {
          console.log("-> transactionHash");
          console.log(transactionHash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log("-> confirmation " + confirmationNumber);
        });

    });

  }

  createAccount() {
    return this.web3.eth.accounts.create();
  }

}