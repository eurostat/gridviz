import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { ViewerComponent } from "./viewer.component";

@NgModule({
    imports: [SharedModule],
    declarations: [ViewerComponent]
})
export class Module {}
