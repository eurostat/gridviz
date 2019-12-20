import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "screen/home", pathMatch: "full" },
    { path: "index.jsp", redirectTo: "screen/home" },
    { path: "screen/home", loadChildren: "./features/home/home.module#Module" }
    /*     { path: 'screen/module1', loadChildren: './features/module1/module1.module#Module' },
    { path: 'screen/module2', loadChildren: './features/module2/module2.module#Module' } */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
