import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcertijoPage } from './acertijo.page';

const routes: Routes = [
  {
    path: '',
    component: AcertijoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcertijoPageRoutingModule {}
