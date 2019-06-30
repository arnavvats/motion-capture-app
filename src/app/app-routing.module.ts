import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamePageComponent} from './pages/game-page/game-page.component';

const routes: Routes = [
  {
    path: 'game', component: GamePageComponent
  },
  {
    path: '**', redirectTo: 'game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
