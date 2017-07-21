import { Component } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  private pageTitle: String = 'TestApp-SurveyJS';

  constructor(private appService: AppService) {
    appService.setPageTitle$.subscribe(pageTitle => {
      this.pageTitle = pageTitle;
    });
  }
}
