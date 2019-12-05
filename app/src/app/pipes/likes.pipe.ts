import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform {

  transform(value: number): any {    
    if (value < 1000) {
      return  value.toFixed();
    } else if (value < 1000000) {
      let newValue = (value / 1000);
      return newValue.toFixed() + " mil";
    } else {
      let newValue = (value / 1000000);
      return  newValue.toFixed() + " mi";
    }
  }

}
