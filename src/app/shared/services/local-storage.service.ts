import { Injectable } from '@angular/core';

export enum LocalStorageEnum {
  user = 0,
  adverts = 1,
  currentAdvertId = 2,
  campaignTabs = 3
}

@Injectable()
export class LocalStorageService {

  private _hasStorage: boolean;

  constructor() {
    this._hasStorage = this.TestLocalStorage();
  }

  Get<T>(key: LocalStorageEnum): T {
    let locKey = LocalStorageEnum[key];

    if (!locKey)
      return null;

    let val: T;

    if (this._hasStorage) {
      val = JSON.parse(window.localStorage.getItem(locKey));

      if (val != null)
        return val;
    }

    return null;
  }

  Set<T>(key: LocalStorageEnum, value: T): boolean {

    let locKey: string = LocalStorageEnum[key];

    let rawVal: string = JSON.stringify(value);

    if (this._hasStorage)
      window.localStorage.setItem(locKey, rawVal);
    else
      return false;

    return true;
  }

  Reset(key: LocalStorageEnum): boolean {

    let locKey: string = LocalStorageEnum[key];

    if (this._hasStorage)
      window.localStorage.removeItem(locKey);

    return true;
  }

  private TestLocalStorage(): boolean {
    let test = 'test';
    try {
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

}
