import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

//import { AccountService } from '../services/account.service';
//import { IAccount } from '../interfaces/i-account.interface';
//import { AdvertState, CampaignState } from '../value-reducer';

@Component({
  selector: 'header',
  template: `<header-unauthorized *ngIf="!isAuthorized"></header-unauthorized>
             <header-authorized *ngIf="isAuthorized" [userName]="userName" [advertId]="advertId" [campaignId]="campaignId"></header-authorized>`,
  styleUrls: ["./header.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthorized: boolean = false;
  userName: string = '';
  advertId: number = null;
  campaignId: number = null;

  private _subscription: Subscription;
  private _campaignSubscription: Subscription;
  //private _currentAdvertId: Observable<number> = this._advertStore.select('currentAdvert');
  //private _currentCampaignId: Observable<number> = this._campaignStore.select('currentCampaign');

  constructor(
    // private _advertStore: Store<AdvertState>, 
    // private _campaignStore: Store<CampaignState>, 
    // private _accountService: AccountService
  ) { }

  ngOnInit() {
    // this._campaignSubscription = this._currentCampaignId.subscribe(id => {
    //   this.campaignId = id;
    // });

    // this._subscription = this._accountService.Get().combineLatest(this._currentAdvertId).map(([user, advertId]) => {
    //   if (!user || !user.authenticated || !advertId)
    //     return false;
    //   this.userName = user.name;
    //   this.advertId = advertId;
    //   return true;
    // }).subscribe(is_auth => {
    //   this.isAuthorized = is_auth;
    // });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._campaignSubscription.unsubscribe();
  }

}
