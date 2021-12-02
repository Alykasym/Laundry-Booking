import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomcodePageRoutingModule } from './randomcode-routing.module';

import { RandomcodePage } from './randomcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomcodePageRoutingModule
  ],
  declarations: [RandomcodePage]
})
export class RandomcodePageModule {}
