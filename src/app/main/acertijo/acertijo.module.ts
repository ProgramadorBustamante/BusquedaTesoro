import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcertijoPageRoutingModule } from './acertijo-routing.module';

import { AcertijoPage } from './acertijo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcertijoPageRoutingModule
  ],
  declarations: [AcertijoPage]
})
export class AcertijoPageModule {}
