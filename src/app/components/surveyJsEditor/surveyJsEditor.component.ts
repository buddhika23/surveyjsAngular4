import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params, } from '@angular/router';
import { SurveyJsService } from '../../services/survey.Service';

import * as SurveyEditor from 'surveyjs-editor';

@Component({
    selector: 'app-survey-js-editor',
    templateUrl: './surveyJsEditor.component.html',
    styleUrls: ['./surveyJsEditor.component.css']
})
export class SurveyJsEditorComponent implements OnInit {
    editor: SurveyEditor.SurveyEditor;
    @Input() json: any;
    @Output() surveySaved: EventEmitter<Object> = new EventEmitter();
    constructor(private surveyJsService: SurveyJsService) { }

    ngOnInit() {
        this.surveyJsService.getTestJson('testTemplate').then((response: any) => {
            let editorOptions = { showEmbededSurveyTab: true, generateValidJSON: true };
            SurveyEditor.SurveyQuestionEditorDefinition.definition = {
                "questionbase": {
                    "properties": [
                        "title",
                        "name",
                        {
                            "name": "tag",
                            "title": "Tag"
                        },
                        {
                            "name": "visible",
                            "category": "checks"
                        },
                        {
                            "name": "isRequired",
                            "category": "checks"
                        }
                    ],
                    "tabs": [
                        {
                            "name": "visibleIf",
                            "index": 1
                        }
                    ]
                },
                "comment": {
                    "properties": [
                        "rows",
                        "placeHolder"
                    ]
                },
                "html": {
                    "tabs": [
                        {
                            "name": "html",
                            "index": 10
                        }
                    ]
                },
                "matrixdropdownbase": {
                    "properties": [
                        "cellType"
                    ],
                    "tabs": [
                        {
                            "name": "columns",
                            "index": 10
                        },
                        {
                            "name": "rows",
                            "index": 11
                        },
                        {
                            "name": "choices",
                            "index": 12
                        }
                    ]
                },
                "matrixdynamic": {
                    "properties": [
                        "rowCount",
                        "addRowText",
                        "removeRowText"
                    ]
                },
                "matrix": {
                    "tabs": [
                        {
                            "name": "columns",
                            "index": 10
                        },
                        {
                            "name": "rows",
                            "index": 11
                        }
                    ]
                },
                "multipletext": {
                    "properties": [
                        "colCount"
                    ],
                    "tabs": [
                        {
                            "name": "items",
                            "index": 10
                        }
                    ]
                },
                "rating": {
                    "properties": [
                        "minRateDescription",
                        "maxRateDescription"
                    ],
                    "tabs": [
                        {
                            "name": "rateValues",
                            "index": 10
                        }
                    ]
                },
                "selectbase": {
                    "properties": [
                        "hasOther",
                        'choicesOrder',
                        'colCount'
                    ],
                    'tabs': [
                        {
                            'name': 'choices',
                            'index': 10
                        },
                        {
                            'name': 'choicesByUrl',
                            'index': 11
                        }
                    ]
                },
                'dropdown': {
                    'properties': [
                        'optionsCaption'
                    ]
                },
                'text': {
                    'properties': [
                        'inputType',
                        'placeHolder'
                    ]
                },
                'multipletextitem': {
                    'properties': [
                        'inputType',
                        'placeHolder'
                    ],
                    'tabs': [
                        {
                            'name': 'validators',
                            'index': 10
                        }
                    ]
                },
                'panel': {
                    'properties': [
                        'name',
                        'title',
                        {
                            'name': 'visible',
                            'category': 'checks'
                        }
                    ],
                    'tabs': [
                        {
                            'name': 'visibleIf',
                            'index': 100
                        }
                    ]
                }
            };
            var editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
            let template: any = '';
            template = JSON.stringify(response.template);
            editor.text = template;
            editor.saveSurveyFunc = this.saveMySurvey;
        }, (error: any) => {
            console.log(error);
        });
    }

    saveMySurvey = () => {
        console.log(this.editor.text);
        this.surveySaved.emit(JSON.parse(this.editor.text));
        this.surveyJsService.json = JSON.parse(this.editor.text);
        this.surveyJsService.saveTestJson('testTemplate', this.editor.text);
    }
}