import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { UserState, getUserState, UxLink, UxLanguage } from "@eui/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    userState: Observable<UserState>;

    menuLinks: UxLink[] = [];
    notificationLinks: UxLink[] = [];

    sidebarLinksWithIconsInner: UxLink[] = [];

    constructor(
        private translateService: TranslateService,
        private store: Store<any>
    ) {}

    ngOnInit() {
        this.userState = <any>this.store.select(getUserState);

        this._createMenuLinks();
        this._createNotifications();

        this.sidebarLinksWithIconsInner = [
            new UxLink({
                label: "*Home",
                iconClass: "ion ion-ios-home-outline",
                url: "/screen/app/app-default-shell",
                isHome: true
            }),
            new UxLink({
                label: "*Portfolio",
                iconClass: "ion ion-ios-briefcase-outline",
                url: "portfolio"
            }),
            new UxLink({
                label: "*Tasks",
                iconClass: "ion ion-ios-list-outline",
                url: "tasks"
            }),
            new UxLink({
                label: "*Results",
                iconClass: "ion ion-ios-browsers-outline",
                url: "results"
            }),
            new UxLink({
                label: "*OE",
                iconClass: "ion ion-ios-star-outline",
                url: "oe"
            })
        ];
    }

    onLanguageChanged(language: UxLanguage) {
        this.translateService.use(language.code);
    }

    private _createMenuLinks() {
        this.menuLinks = [
            /*             new UxLink({
                label: "HOME",
                url: "/screen/home",
                isHome: true
            }), */
            /*             new UxLink({
                label: "Module1",
                url: "/screen/module1",
                children: [
                    new UxLink({ label: "disabled item", disabled: true }),
                    new UxLink({
                        label: "Page 1",
                        url: "/screen/module1/page1"
                    }),
                    new UxLink({
                        label: "Page 2",
                        url: "/screen/module1/page2"
                    })
                ]
            }), */
            /*             new UxLink({
                label: "Module2",
                url: "/screen/module2"
            }) */
        ];
    }

    private _createNotifications() {
        this.notificationLinks = [
            new UxLink({
                label: "Notification title",
                subLabel: "This is the description of the noficiation"
            }),
            new UxLink({
                label: "Notification title",
                subLabel: "This is the description of the noficiation"
            }),
            new UxLink({
                label: "Notification title",
                subLabel: "This is the description of the noficiation"
            })
        ];
    }
}
