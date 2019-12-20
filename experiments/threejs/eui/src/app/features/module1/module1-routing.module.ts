import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Module1Component } from "./module1.component";

const routes: Routes = [{ path: "", component: Module1Component }];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class Module1RoutingModule {}
