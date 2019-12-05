import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesPipe } from '../pipes/likes.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [LikesPipe, TimeAgoPipe],
  imports: [
    CommonModule
  ],
  exports: [
    LikesPipe, TimeAgoPipe
  ]
})
export class SharedModule { }
