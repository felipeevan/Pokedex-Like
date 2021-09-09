import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: '404', component: Error404Component},
  { path: 'lista', component: ListComponent},
  { path: 'detalhePokemon/:id', component: DetailComponent },
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
