import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tab4/tab4.module').then((m) => m.Tab4PageModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'ranking',
    loadChildren: () =>
      import('./ranking/ranking.module').then((m) => m.RankingPageModule),
  },
  {
    path: 'acertijo',
    loadChildren: () =>
      import('./acertijo/acertijo.module').then((m) => m.AcertijoPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
