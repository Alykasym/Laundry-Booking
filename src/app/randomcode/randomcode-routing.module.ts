import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomcodePage } from './randomcode.page';

const routes: Routes = [
  {
    path: '',
    component: RandomcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomcodePageRoutingModule {}
