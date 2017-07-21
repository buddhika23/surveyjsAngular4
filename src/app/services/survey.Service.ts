import { Injectable } from "@angular/core";
import { HttpModule, Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SurveyJsService {
    constructor(protected http: Http) { }


    json = {
        "pages": [
            {
                "elements": [
                    {
                        "type": "comment",
                        "name": "suggestions",
                        "title": "What would make you more satisfied with the Product?"
                    },
                    {
                        "type": "matrix",
                        "name": "question2",
                        "columns": [
                            "Column 1",
                            "Column 2",
                            "Column 3"
                        ],
                        "rows": [
                            "Row 1",
                            "Row 2"
                        ]
                    },
                    {
                        "type": "radiogroup",
                        "name": "question1",
                        "choices": [
                            "item1",
                            "item2",
                            "item3"
                        ]
                    }
                ]
            },
            {
                "elements": [
                    {
                        "type": "comment",
                        "name": "question3"
                    }
                ],
                "name": "page1"
            }
        ],
        "showProgressBar": "top",
        "title": "Product Feedback Survey Example"
    };

    public saveTestJson(id, parama) {
        this.http.post(environment.apiUrl + '/member/TemplateSave', JSON.parse(parama), {
        }).toPromise().then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });

        if (id) {
            localStorage.setItem(id, JSON.stringify(parama));
        } else {
            localStorage.removeItem(id);
        }

    }


    public getTestJson(id: any): Promise<any> {
        // if (id) {
        //     var result = localStorage.getItem(id);
        //     if (!result) {
        //         return this.json;
        //     }

        //     return JSON.parse(result);
        // }
        // return '';
        return this.http.get(environment.apiUrl + '/member/TemplateGet', {
        }).toPromise().then(result => {
            console.log(result);
            return Promise.resolve(result.json());
        }).catch(error => {
            console.log(error);
        });

    }

    public saveSurveyResult(templateId: any, respondId: any, surveyResult: any) {
        // let resultId: any = templateId + ':' + respondId;
        // if (resultId) {
        //     localStorage.setItem(resultId, JSON.stringify(result));
        // }
        return this.http.post(environment.apiUrl + '/member/resultsave', {
            TemplateId: templateId,
            Id: respondId,
            Results: JSON.stringify(surveyResult)
        })
            .toPromise().then(result => {
                console.log(result);
                return Promise.resolve(result.json());
            }).catch(error => {
                console.log(error);
            });
    }

    public getSurveyResult(respondId: any) {
        return this.http.get(environment.apiUrl + '/member/resultget/' + respondId)
            .toPromise().then(result => {
                console.log(result);
                return Promise.resolve(result.json());
            }).catch(error => {
                console.log(error);
            });
    }

    public getAllSurveys() {
        // this.http.get(environment.apiUrl + '/member/TestPost', {
        // }).toPromise().then(result => {
        //     console.log(result);
        // }).catch(error => {
        //     console.log(error);
        // });
    }
}