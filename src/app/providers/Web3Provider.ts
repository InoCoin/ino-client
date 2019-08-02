import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Contract, ABI, ChainId, ChainName } from '../../globals/config';

import { Buffer } from 'buffer';
import { WEB3, TH } from '../modules/browser';

@Injectable({
  providedIn: 'root'
})

export class Web3Provider {

  private contract;

  constructor(
    @Inject(WEB3) private web3,
    @Inject(TH) private th,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.contract = new this.web3.eth.Contract(ABI, Contract);
    }

  }

  checkAddress(address) {
    if (isPlatformBrowser(this.platformId)) {
      return this.web3.utils.isAddress(address);
    }
    return false;
  }

  getBalance(address) {

    if (isPlatformBrowser(this.platformId)) {
      return this.contract.methods.balanceOf(address).call({ from: address }).then((tokens) => {
        return this.web3.utils.fromWei(tokens.toString(), 'wei');
      });
    }

    return new Promise((resolve) => {
      resolve(0);
    });

  }

  getEthBalance(address) {

    if (isPlatformBrowser(this.platformId)) {
      return this.web3.eth.getBalance(address).then((value) => {
        value = this.web3.utils.fromWei(value, 'ether')
        return Number(value).toFixed(6);
      });
    }

    return new Promise((resolve) => {
      resolve(0);
    });

  }

  getPrivKey(keyStore, password) {
    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platformId)) {
        return setTimeout(() => {
          try {
            let r = this.web3.eth.accounts.decrypt(keyStore, password);
            resolve(r);
          } catch (e) {
            reject(e);
          }
        }, 200);
      }
      return resolve('');
    });
  }

  exportKeyStore(privateKey, password) {
    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platformId)) {
        return resolve(this.web3.eth.accounts.encrypt(privateKey, password));
      }
      return resolve('');
    });
  }

  createTransaction(privatekey, address, amount, to) {

    if (isPlatformBrowser(this.platformId)) {

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
          gasPrice: this.web3.utils.toHex(gas*2),
          gasLimit: this.web3.utils.toHex(gasLimit),
          to: Contract,
          value: txValue,
          data: this.contract.methods.transfer(to, this.web3.utils.toWei(amount.toString(), 'wei')).encodeABI(),
          chainId: ChainId
        }

        const tx = new this.th(rawTx, {
          chain: ChainName
        });        

        tx.sign(privateKey);

        return new Promise((resolve, reject) => {
          this.web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .once('receipt', (log) => {
              console.log("-> receipt");
              console.log(log);
              // return Promise.resolve(log);
            })
            .on('error', (error) => {
              console.log("-> error");
              console.log(error.message);
              return reject(error);
            })
            .once('transactionHash', (transactionHash) => {
              console.log("-> transactionHash");
              console.log(transactionHash);
              return resolve(transactionHash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
              console.log("-> confirmation " + confirmationNumber);
            });
        });

      });

    }

    return new Promise((resolve) => {
      resolve(0);
    });

  }

  sendEthers(privatekey, address, amount, to) {

    if (isPlatformBrowser(this.platformId)) {

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
          value: txValue,
          chainId: ChainId
        }

        const tx = new this.th(rawTx, {
          chain: ChainName
        });

        tx.sign(privateKey);

        return new Promise((resolve, reject) => {
          return this.web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .once('receipt', (log) => {
              console.log(log)
            })
            .on('error', function (error) {
              console.log("-> error");
              console.log(error.message);
              return reject(error);
            })
            .once('transactionHash', function (transactionHash) {
              console.log("-> transactionHash");
              resolve(transactionHash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              console.log("-> confirmation " + confirmationNumber);
            });
        });
      });

    }

    return new Promise((resolve) => {
      resolve(0);
    });

  }

  createAccount() {
    if (isPlatformBrowser(this.platformId)) {
      return this.web3.eth.accounts.create();
    }
    return false;
  }

}
