import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { IAccount } from '../interfaces/i-account.interface';
import { LocalStorageService, LocalStorageEnum } from './local-storage.service';
import { UserState, STORE_TYPES } from '../value-reducer';

@Injectable()
export class AccountService {

  private _returnUrl: string;
  private _user: Observable<IAccount> = this._store.select('user');

  constructor(
    private _localStorageService: LocalStorageService,
    private _store: Store<UserState>
  ) { }

  Get(): Observable<IAccount> {
    return this._user;
  }

  Set(user: IAccount): void {
    this._localStorageService.Set<IAccount>(LocalStorageEnum.user, user);
    this._store.dispatch({ type: STORE_TYPES.CHANGE_USER, payload: user });
  }

  Reset(): void {
    this._localStorageService.Reset(LocalStorageEnum.user);
    this._store.dispatch({ type: STORE_TYPES.CHANGE_USER, payload: null });

  }

  IsAuthenticated(): boolean {
    let user: IAccount;
    this._user.first().subscribe(val => user = val);
    if (!user)
      return false;
    return user.authenticated && new Date() < new Date(user.expiredAfter);
  }

  GetReturnUrl(): string {
    return this._returnUrl;
  }

  SetReturnUrl(url: string) {
    this._returnUrl = url;
  }

}
