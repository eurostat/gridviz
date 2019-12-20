import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class RouterMock {
    routerState = { root: '' };
    public navigationEnd = new NavigationEnd(0, 'http://url1', 'http://url2');
    public events = new Observable(observer => {
        observer.next(this.navigationEnd);
        observer.complete();
    });

    constructor() {}

    createUrlTree() {}

    serializeUrl() {}

}
