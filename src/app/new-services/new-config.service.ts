import { Injectable } from '@angular/core';
import { getStringChanges, RemoteConfig } from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';
import { IConfig } from '../new-models/new-config';

export interface IPaymentKeys {
  publicKey: string;
  secretKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewConfigService {

  remoteConfig: RemoteConfig;

  constructor(
    _remoteConfig: RemoteConfig
  ) {
    this.remoteConfig = _remoteConfig;
  }

  get(): Promise<IConfig> {
    return new Promise((resolve) => {
      const subs = getStringChanges(this.remoteConfig, environment.remoteConfig).subscribe(value => {
        resolve(JSON.parse(value) as IConfig);
        subs.unsubscribe();
      })
    });
  }

  getValue(key: string): Promise<string> {
    return new Promise((resolve) => {
      const subs = getStringChanges(this.remoteConfig, key).subscribe(value => {
        resolve(value);
        subs.unsubscribe();
      })
    });
  }

  getPaymongoKeys(): Promise<IPaymentKeys> {
    return new Promise(async (resolve) => {
      let publicKey: string = await this.getValue(environment.paymentkeys.paymongo.publicKey);
      let secretKey: string = await this.getValue(environment.paymentkeys.paymongo.secretKey);
      resolve({
        publicKey: publicKey,
        secretKey: secretKey
      })
    });
  }

  getStripeKeys(): Promise<IPaymentKeys> {
    return new Promise(async (resolve) => {
      let publicKey: string = await this.getValue(environment.paymentkeys.stripe.publicKey);
      let secretKey: string = await this.getValue(environment.paymentkeys.stripe.secretKey);
      resolve({
        publicKey: publicKey,
        secretKey: secretKey
      })
    });
  }
}
