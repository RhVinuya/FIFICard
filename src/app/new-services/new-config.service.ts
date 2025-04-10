import { Injectable } from '@angular/core';
import { getStringChanges, RemoteConfig } from '@angular/fire/remote-config';
import { IConfig } from '../new-models/new-config';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { production } from 'src/app/remoteconfig/production';
import { development } from 'src/app/remoteconfig/development';

export interface IPaymentKeys {
  publicKey: string;
  secretKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewConfigService {

  remoteConfig: RemoteConfig;
  http: HttpClient;

  constructor(
    _remoteConfig: RemoteConfig,
    _http: HttpClient
  ) {
    this.remoteConfig = _remoteConfig;
    this.http = _http;
  }

  get(): Promise<IConfig> {
    return new Promise((resolve) => {
      const subs = getStringChanges(this.remoteConfig, environment.remoteConfig).subscribe(value => {
        if (value !== '') {
          resolve(JSON.parse(value) as IConfig);
        }
        else {
          if (environment.production) resolve(production as unknown as IConfig)
          else resolve(development as unknown as IConfig)
        }
        subs.unsubscribe();
      })
    });
  }

  getValue(key: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subs = getStringChanges(this.remoteConfig, key).subscribe(value => {
          resolve(value);
          subs.unsubscribe();
        })
      }, 2000);
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
