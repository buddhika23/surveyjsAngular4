import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import {SurveyJsFormComponent} from './components/surveyJsForm/surveyJsForm.component';
import {SurveyJsEditorComponent} from './components/surveyJsEditor/surveyJsEditor.component';


import { AppService } from './services/app.service';
import { SurveyJsService } from './services/survey.Service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SurveyJsFormComponent,
    SurveyJsEditorComponent
  ],
  providers: [
    SurveyJsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
