import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { ViewerComponent } from "src/app/components/viewer/viewer.component";

@NgModule({
    imports: [SharedModule, HomeRoutingModule, ViewerComponent],
    declarations: [HomeComponent]
})
export class Module {}
