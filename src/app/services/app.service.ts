import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    private pageTitleSource = new Subject<string>();

    public setPageTitle$ = this.pageTitleSource.asObservable();
    public setPageTitle(title: string) {
        this.pageTitleSource.next(title);
    }
}