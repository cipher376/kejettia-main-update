import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorPageComponent } from "../app-main-pages/error-page/error-page.component";
import { LayoutComponent } from "../app-main-pages/layout/layout.component";
import { Home2Component } from "./home2/home2.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    children: [
      {
        path: '', component: LayoutComponent,
        children: [
          { path: 'home', component: Home2Component },

        ]
      },

    ]
  },
  { path: '**', component: ErrorPageComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorePagesRoutingModule { }
