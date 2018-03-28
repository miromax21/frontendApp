import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './articles/article.component';
import { ArticleService } from './articles/article.service';
import {
      SharedModule,
      ServiceLocator,
      // LocalStorageService,
      // LocalStorageEnum,
      // userStateReducer,
      // currentAdvertReducer,
      // currentCampaignReducer,
      // currentCampaignInfoReducer
} from './shared';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
      imports: [
            BrowserModule,
            SharedModule.forRoot(),
            AppRoutingModule,
            HttpModule,
            ReactiveFormsModule
      ],
      declarations: [
            AppComponent,
            PageNotFoundComponent,
            ArticleComponent
      ],
      providers: [
            ArticleService
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
