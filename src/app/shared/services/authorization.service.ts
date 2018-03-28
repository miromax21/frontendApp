import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AccountService } from './account.service';
import { AdvertService } from '../services/advert.service';
import { environment } from 'environments/environment';
import { IAuthorization } from '../interfaces/i-authorization.interface';
import { IAccount } from '../interfaces/i-account.interface';
import { IAdvert } from '../interfaces/i-advert.interface';
import { AuthorizationErrorsEnum } from '../enums/authorization-errors.enum';


const AUTH_URL: string = environment.api + '/authentication';

@Injectable()
export class AuthorizationService {

  constructor(
    private _http: HttpClient,
    private _accountService: AccountService,
    private _advertService: AdvertService
  ) { }

  SignIn(authorization: IAuthorization): Promise<AuthorizationErrorsEnum | IAdvert[]> {
    return this._http.post<IAccount>(AUTH_URL, authorization)
      .toPromise<IAccount>()
      .then<IAdvert[] | AuthorizationErrorsEnum, AuthorizationErrorsEnum>((user: IAccount): Promise<IAdvert[] | AuthorizationErrorsEnum> => {
        this._accountService.Set(user);
        return this._advertService.Get();
      }, (error: any): Promise<AuthorizationErrorsEnum> => {
        return Promise.reject(AuthorizationErrorsEnum.LoginError);
      })
      .then<any, AuthorizationErrorsEnum>(null, (error: AuthorizationErrorsEnum): Promise<AuthorizationErrorsEnum> => {
        this._accountService.Reset();
        return Promise.reject(error);
      });
  }

  SignOut() {
    this._accountService.Reset();
    this._advertService.Reset();
  }

}
