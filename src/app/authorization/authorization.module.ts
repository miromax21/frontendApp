import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from '../shared';
import { AuthorizationComponent } from './authorization.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthorizationRoutingModule,
        SharedModule
    ],
    declarations: [AuthorizationComponent]
})
export class AuthorizationModule { }
