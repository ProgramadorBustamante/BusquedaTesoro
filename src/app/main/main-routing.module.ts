import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component : TabsPage,
    children : [
      {
        path : 'mapa',
        loadChildren: () =>
          import('./tab4/tab4.module').then((m) => m.Tab4PageModule),
      },
      {
        path: 'ranking',
        loadChildren: () =>
        import('./ranking/ranking.module').then((m) => m.RankingPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'tutorial',
        loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
      },
      {
        path: 'mapa',
        redirectTo: '',
        pathMatch: 'full',
      },
    ]
    
  },
  {
    path: 'main/tabs/home',
    redirectTo: '',
    pathMatch: 'full',
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
