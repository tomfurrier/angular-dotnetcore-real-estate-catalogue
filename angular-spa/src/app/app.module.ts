import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { RealEstateModule } from './real-estate/real-estate.module';
import { UserModule } from './user/user.module';
import { RealEstatesComponent } from './real-estate/real-estates/real-estates.component';
import { PrimeNGModule } from './primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselBasicComponent } from './shared/carousel-basic/carousel-basic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FooterModule } from './footer/footer.module';
import { ContactComponent } from './navigation/header/contact/contact.component';
import { SearchService } from './shared/search/search.service';
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig
} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    SidenavListComponent,
    FooterComponent,
    WelcomeComponent,
    CarouselBasicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimeNGModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    SharedModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    RealEstateModule,
    UserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FooterModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [AuthService, UIService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
