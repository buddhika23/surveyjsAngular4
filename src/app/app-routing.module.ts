import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {SurveyJsFormComponent } from './components/surveyJsForm/surveyJsForm.component';
import {SurveyJsEditorComponent } from './components/surveyJsEditor/surveyJsEditor.component';


const routes: Routes = [

    {
    path: 'survey-js',
    component: SurveyJsFormComponent
  },
      {
    path: 'survey-js-editor',
    component: SurveyJsEditorComponent
  },


  { path: '', redirectTo: 'survey-js', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}