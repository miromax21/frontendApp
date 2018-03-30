import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'

import { IAuthorization, AuthorizationErrorsEnum, RoutingConsts } from '../shared';
import { AuthorizationService } from './authorization.service';
@Component({
  selector: 'app-authorization',
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.less"]
})
export class AuthorizationComponent implements OnInit {

  model: IAuthorization = {
    username: '',
    password: ''
  };
  inProcess: boolean = false;
  hasLoginError: boolean = false;
  hasAccessError: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authorizationService: AuthorizationService,
    //  private _accountService: AccountService
  ) { }

  ngOnInit() {
  }

  Submit() {
    if (this.inProcess)
      return;

    this.inProcess = true;

    this.hasLoginError = false;
    this.hasAccessError = false;

    this._authorizationService.SignIn(this.model).then(
      data => {
        debugger
        alert(data);

        // data => data,
        // errorCode => errorCode);
      }, (error: AuthorizationErrorsEnum): void => {
        this.inProcess = false;
        switch (error) {
          case AuthorizationErrorsEnum.LoginError:
            this.hasLoginError = true;
            break;
          case AuthorizationErrorsEnum.AccessError:
            this.hasAccessError = true;
            break;
        }

      });
  }
  //   let returnUrl = "adsasdaasdad";
  //   if (returnUrl) {

  //     // this._accountService.SetReturnUrl(null);

  //     this._router.navigateByUrl(returnUrl);
  //   }
  //   else
  //     this._router.navigate([RoutingConsts.root]);
  // }, (error: AuthorizationErrorsEnum): void => {
  //   this.inProcess = false;
  //   switch (error) {
  //     case AuthorizationErrorsEnum.LoginError:
  //       this.hasLoginError = true;
  //       break;
  //     case AuthorizationErrorsEnum.AccessError:
  //       this.hasAccessError = true;
  //       break;
  //   }
  // });


}
