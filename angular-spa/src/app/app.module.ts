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
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { FooterComponent } from './navigation/footer/footer.component';
import { RealEstateModule } from './real-estate/real-estate.module';
import { UserModule } from './user/user.module';
import { MiscModule } from './misc/misc.module';
import { RealEstatesComponent } from './real-estate/real-estates/real-estates.component';
import { PrimeNGModule } from './primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselBasicComponent } from './shared/carousel-basic/carousel-basic.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    MiscModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
