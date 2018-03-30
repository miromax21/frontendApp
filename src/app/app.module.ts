import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { INITIAL_STATE, StoreModule } from '@ngrx/store';
import localeRu from '@angular/common/locales/ru';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './articles/article.component';
import { ArticleService } from './articles/article.service';
import { AuthorizationService } from './authorization/authorization.service';
import { HomeComponent } from './home.component';
import {
      SharedModule,
      ServiceLocator,
      LocalStorageService,
      LocalStorageEnum
      // userStateReducer,
      // currentAdvertReducer,
      // currentCampaignReducer,
      // currentCampaignInfoReducer
} from './shared';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
      declarations: [
            AppComponent,
            PageNotFoundComponent,
            ArticleComponent,
            HomeComponent
      ],
      imports: [
            BrowserModule,
            SharedModule.forRoot(),
            AppRoutingModule,
            HttpModule,
            ReactiveFormsModule
      ],
      providers: [
            ArticleService,
            AuthorizationService
      ],
      bootstrap: [
            AppComponent
      ]
})
export class AppModule {
      constructor(injector: Injector) {
            ServiceLocator.Injector = injector;
      }
}
