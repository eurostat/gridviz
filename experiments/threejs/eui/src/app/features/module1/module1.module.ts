import { NgModule } from "@angular/core";
import { Module1RoutingModule } from "./module1-routing.module";
import { Module1Component } from "./module1.component";

import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [SharedModule, Module1RoutingModule],
    declarations: [Module1Component]
})
export class Module {}
