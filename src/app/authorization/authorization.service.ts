import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../shared/services/account.service'//./account.service';
import { AdvertService } from '../shared/services/advert.service';
import { environment } from 'environments/environment';
import { IAuthorization } from '../shared/interfaces/i-authorization.interface';
import { IAccount } from '../shared/interfaces/i-account.interface';
import { IAdvert } from '../shared/interfaces/i-advert.interface';
import { AuthorizationErrorsEnum } from '../shared/enums/authorization-errors.enum';
import { ServiceLocator } from '../shared/service-locator';

const AUTH_URL: string = 'http://localhost:8087/login';
const ALL_ARTICLESS_URL: string = "http://localhost:8087/article/all-articles"

import { Article } from '../articles/article';

@Injectable()
export class AuthorizationService {

  constructor(
    private _http: HttpClient,
    // private _accountService: AccountService,
    // private _advertService: AdvertService
  ) { }

  getAllArticles(): Promise<Article[]> {
    return this._http.get<Article[]>(AUTH_URL, {})
      .toPromise()
      .then((articles: Article[]): Article[] | Promise<any> => {
        if (articles.length === 0)
          return Promise.reject(null);
        return articles;
      });
  }
  SignIn(authorization: IAuthorization): Promise<Article[]> {
    return this._http.post<IAccount>(AUTH_URL, authorization)
      .toPromise()
      .then((user: any): any | Promise<any> => {
        if (user.length === 0)
          return Promise.reject(null);
        return user;
      }, (error: any): Promise<AuthorizationErrorsEnum> => {
        return Promise.reject(AuthorizationErrorsEnum.LoginError);
      })
      .then<any, AuthorizationErrorsEnum>(null, (error: AuthorizationErrorsEnum): Promise<AuthorizationErrorsEnum> => {
        // this._accountService.Reset();
        return Promise.reject(error);
      });
  }
  // SignIn(authorization: IAuthorization): Promise<AuthorizationErrorsEnum | IAdvert[]> {
  //   alert("sda");
  //   return this._http.post<IAccount>(AUTH_URL, authorization)
  //     .toPromise<IAccount>()
  //     .then<IAdvert[] | AuthorizationErrorsEnum, AuthorizationErrorsEnum>((user: IAccount): Promise<IAdvert[] | AuthorizationErrorsEnum> => {
  //       this._accountService.Set(user);
  //       return this._advertService.Get();
  //     }, (error: any): Promise<AuthorizationErrorsEnum> => {
  //       return Promise.reject(AuthorizationErrorsEnum.LoginError);
  //     })
  //     .then<any, AuthorizationErrorsEnum>(null, (error: AuthorizationErrorsEnum): Promise<AuthorizationErrorsEnum> => {
  //       this._accountService.Reset();
  //       return Promise.reject(error);
  //     });
  // }

  // SignOut() {
  //   this._accountService.Reset();
  //   this._advertService.Reset();
  // }

}
