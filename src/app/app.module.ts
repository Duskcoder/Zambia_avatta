import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyaccountModule } from './myaccount/myaccount.module';
import { GeneralModule } from './general/general.module';
import { ElearnModule } from './elearn/elearn.module';
import { VodModule } from './vod/vod.module';
import { GamesModule } from './games/games.module';
import { KidsModule } from './kids/kids.module';
import { FreeentertainmentModule } from './freeentertainment/freeentertainment.module';
import { CommonsModule } from './common/common.module';
import { CheckmailPipe } from './checkmail.pipe';
import { GoogleanalyticsserviceService } from './googleanalyticsservice.service';
import { HttpinterceptorService } from './httpinterceptor.service';

import * as Sentry from "@sentry/angular";
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CheckmailPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonsModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    SlickCarouselModule,
    ImageCropperModule,
    NgxSpinnerModule,
    MyaccountModule,
    GeneralModule,
    ElearnModule,
    VodModule,
    GamesModule,
    KidsModule,
    FreeentertainmentModule,
    CommonsModule
  ],
  exports: [
    NgxSpinnerModule, 
    SlickCarouselModule,
    MyaccountModule,
    GeneralModule,
    ElearnModule,
    VodModule,
    GamesModule,
    KidsModule,
    FreeentertainmentModule,
    CommonsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler() },
    { provide: Sentry.TraceService, deps: [Router] },
    { 
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true
    }, 
    CheckmailPipe, 
    GoogleanalyticsserviceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
