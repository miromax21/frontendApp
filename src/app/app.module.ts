import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
@NgModule({
      imports: [
            BrowserModule,
            SharedModule.forRoot(),
            HttpModule,
            ReactiveFormsModule
      ],
      declarations: [
            AppComponent,
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
