import { BiZmapPage } from './app.po';

describe('bi-zmap App', () => {
  let page: BiZmapPage;

  beforeEach(() => {
    page = new BiZmapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
