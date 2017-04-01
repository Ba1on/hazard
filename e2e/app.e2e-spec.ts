import { HazardPage } from './app.po';

describe('hazard App', () => {
  let page: HazardPage;

  beforeEach(() => {
    page = new HazardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
