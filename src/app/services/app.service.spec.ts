
import { AppService } from "./app.service";

describe("AppService", () => {
    let service: AppService;

    beforeEach(() => {
        service = new AppService();
    });

    it("should provide the ability to change and subscribe to changes of the page title", () => {
        let title1: string = "title 1";
        let title2: string = "title 2";

        let title: string;
        
        service.setPageTitle$.subscribe(pageTitle => {
            title = pageTitle;
        });

        service.setPageTitle(title2);

        expect(title).toEqual(title2);

        service.setPageTitle(title1);

        expect(title).toEqual(title1);
    });
});