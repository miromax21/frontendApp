import { Component, Input, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthorizationService } from '../../services/authorization.service';
// import { AccountService } from '../../services/account.service';
// import { RoutingConsts } from '../../enums/routing-consts.enum';

@Component({
  selector: 'header-authorized',
  templateUrl: './header-authorized.component.html'
})
export class HeaderAuthorizedComponent implements OnInit, OnDestroy {

  // routingConsts: any = RoutingConsts;

  @Input()
  userName: string;
  @Input()
  advertId: number;
  @Input()
  campaignId: number;
  expand: boolean = false;

  private _unregister: Function;

  constructor(private _renderer: Renderer2, private _router: Router) { }

  ngOnInit() { }

  MenuToggle(e: MouseEvent) {
    if (this.expand) {
      this._unregister && this._unregister();
      this._unregister = undefined;
      this.expand = false;
    }
    else {
      this.expand = true;
      setTimeout(() => {
        this._unregister = this._renderer.listen('window', 'click', () => {
          this._unregister();
          this.expand = false;
        });
      });
    }

  }

  SignOut() {
    //this._authorizationService.SignOut();
    //  this._router.navigate([RoutingConsts.login]);
  }

  ngOnDestroy() {
    this._unregister && this._unregister();
  }

}
