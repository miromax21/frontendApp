import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { AccountService } from './account.service';
import { LocalStorageService, LocalStorageEnum } from './local-storage.service';
import { environment } from 'environments/environment';
import { IAdvert } from '../interfaces/i-advert.interface';
import { AuthorizationErrorsEnum } from '../enums/authorization-errors.enum';
import { Utils } from '../utils';
import { AdvertState, STORE_TYPES } from '../value-reducer';


const ADVERT_URL: string = environment.api + '/adverts';

@Injectable()
export class AdvertService {

  private _adverts: IAdvert[] = this._localStorageService.Get(LocalStorageEnum.adverts);

  constructor(
    private _http: HttpClient,
    private _store: Store<AdvertState>,
    private _localStorageService: LocalStorageService,
    private _accountService: AccountService
  ) { }

  Get(): Promise<IAdvert[] | AuthorizationErrorsEnum> {
    return this._http.get<IAdvert[]>(ADVERT_URL)
      .toPromise<IAdvert[]>()
      .then<IAdvert[] | AuthorizationErrorsEnum, AuthorizationErrorsEnum>((adverts: IAdvert[]): IAdvert[] | Promise<AuthorizationErrorsEnum> => {
        if (adverts.length === 0)
          return Promise.reject(AuthorizationErrorsEnum.AccessError);
        this.SetAdverts(adverts);
        return adverts;
      }, (error: any): Promise<AuthorizationErrorsEnum> => {
        return Promise.reject(AuthorizationErrorsEnum.AccessError);
      });
  }

  HasAdvert(advertId: number): boolean {
    return Boolean(advertId) && Utils.Array.Any<IAdvert>(this._adverts, (advert) => advert.id === advertId);
  }

  HasAssignedAdverts(): boolean {
    return Boolean(this._adverts) && this._adverts.length !== 0;
  }

  Reset(): void {
    this._localStorageService.Reset(LocalStorageEnum.currentAdvertId);
    this._store.dispatch({ type: STORE_TYPES.CHANGE_ADVERT, payload: 0 });
    this._localStorageService.Reset(LocalStorageEnum.adverts);
    this._adverts = null;
  }

  private SetAdverts(adverts: IAdvert[]): void {
    if (!this._accountService.IsAuthenticated())
      return;
    this._localStorageService.Set<IAdvert[]>(LocalStorageEnum.adverts, adverts);
    this._adverts = adverts;
    let advertId: number = adverts[0] && adverts[0].id;
    if (advertId) {
      this._localStorageService.Set<number>(LocalStorageEnum.currentAdvertId, advertId);
      this._store.dispatch({ type: STORE_TYPES.CHANGE_ADVERT, payload: advertId });
    }

  }

}
