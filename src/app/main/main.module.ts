import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    MainRoutingModule
  ]
})
export class MainModule { }
