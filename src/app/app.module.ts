import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';


import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { DataService } from './services/data.service';
import { KeysPipe } from './helpers/keys-pipes';
import { FilterStringPipe } from './helpers/filter-string.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RowComponent } from './dashboard/record-row/record-row.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KeysPipe,
    FilterStringPipe,
    RowComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    AppRouting,
    MyDatePickerModule
  ],
  providers: [
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
