import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';
import { SurveyJsService } from '../../services/survey.Service';
import { Guid } from '../../models/Guid';

import * as Survey from 'survey-angular';

@Component({
    selector: 'app-survey-js-form',
    templateUrl: './surveyJsForm.component.html',
    styleUrls: ['./surveyJsForm.component.css']
})
export class SurveyJsFormComponent implements OnInit {
    @Input() json: any;
    surveyTemplate: any;
    constructor(private surveyJsService: SurveyJsService) { }
    ngOnInit(): void {
        Survey.Survey.cssType = 'bootstrap';
        const that = this;
        this.surveyJsService.getTestJson('testTemplate').then((response: any) => {
            this.surveyTemplate = response;

            const surveyModel: any = new Survey.ReactSurveyModel(that.surveyTemplate.template);
            surveyModel.clientId = '06796eb0-0a54-4c3d-98bd-4565d3f926bf'; //Guid.newGuid();

            this.surveyJsService.getSurveyResult(surveyModel.clientId).then((resultRespond: any) => {
                surveyModel.data = JSON.parse(resultRespond.results);
                Survey.SurveyNG.render('surveyElement', { model: surveyModel });

                surveyModel.sendResultOnPageNext = true;
                surveyModel.onValueChanged.add(function (sender, options) {
                    const mySurvey = sender;
                    const questionName = options.name;
                    const newValue = options.value;
                });
                surveyModel.onPartialSend.add(function (survey, options) {
                    that.surveyJsService.saveSurveyResult(that.surveyTemplate.id, survey.clientId, survey.data)
                        .then((saveResponse: any) => {
                            console.log(saveResponse);

                            const text = 'clientId:' + survey.clientId + '. The results are:' + JSON.stringify(survey.data) + String.fromCharCode(13, 10);
                            document.querySelector('#surveyResult').innerHTML = document.querySelector('#surveyResult').innerHTML + text;
                        });
                    surveyModel.onComplete.add(function (result) {
                        that.surveyJsService.saveSurveyResult(that.surveyTemplate.id, survey.clientId, survey.data)
                            .then((saveResponse: any) => {
                                console.log(saveResponse);

                                document.querySelector('#surveyResult').innerHTML = 'result: ' + JSON.stringify(result.data);

                            });
                    });

                });

            });
        });


    }
}