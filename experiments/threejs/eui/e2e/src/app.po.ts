import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getHeaderApplicationName() {
        return element(by.css('#app-header h1.full')).getText();
    }
}
