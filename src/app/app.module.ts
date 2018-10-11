import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RestService } from './service/rest.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { routing, views} from './app.router';

import { CorrectorPipe} from './pipes/corrector.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { LetraPipe } from './pipes/Letra';
import { PrimeroPipe } from './pipes/decimal';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SkinPinnerComponent } from '././controles/skin-pinner/skin-pinner.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormMercadeoComponent } from './view/form-mercadeo/form-mercadeo.component';

// validaciones


@NgModule({
  declarations: [
    AppComponent, views, CorrectorPipe, HoraPipe , LetraPipe, PrimeroPipe, SkinPinnerComponent, FormMercadeoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, RestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
