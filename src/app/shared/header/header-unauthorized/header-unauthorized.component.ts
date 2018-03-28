import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
//import { RoutingConsts } from '../../enums/routing-consts.enum';

@Component({
  selector: 'header-unauthorized',
  templateUrl: './header-unauthorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUnauthorizedComponent implements OnInit {

  //routingConsts: any = RoutingConsts;

  constructor() { }

  ngOnInit() {
  }

}
