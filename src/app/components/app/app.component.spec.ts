import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from "./app.component";

import { AppService } from "../../services/app.service";
import { AuthService } from "../../services/auth/auth.service";
import { AuthServiceStub } from "../../stubs/auth.service.stub";

describe("AppComponent", () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                AppService,
                { provide: AuthService, useClass: AuthServiceStub }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.title'));
        el = de.nativeElement;
    });

    it("should update the pageTitle value when it changes through AppService", () => {
        fixture.detectChanges();

        let appService = de.injector.get(AppService);

        let originalTitle: string = el.textContent;
        let newTitle = originalTitle + ".";

        appService.setPageTitle(newTitle);

        fixture.detectChanges();

        expect(el.textContent).toEqual(newTitle);
    });
});