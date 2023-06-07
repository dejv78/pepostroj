import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsComponent} from "./pages/dash/projects.component";
import {PeopleComponent} from "./pages/public/people.component";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {StyleClassModule} from "primeng/styleclass";

const routes: Routes = [
  {
    path: "projects",
    component: ProjectsComponent
  },
  {
    path: "people",
    component: PeopleComponent
  },
  {
    path: '**',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AsyncPipe,
    NgForOf,
    ButtonModule,
    CardModule,
    TableModule,
    NgIf,
    DatePipe,
  ],
  declarations: [
    ProjectsComponent,
    PeopleComponent
  ],
  exports: [
    RouterModule,
    ButtonModule,
    CardModule,
  ]
})
export class AppRoutingModule { }
