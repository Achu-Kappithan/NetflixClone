import { Pipe, PipeTransform } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Pipe({
  name: 'discription',
  standalone: true
})
export class DiscriptionPipe implements PipeTransform {

  transform(value: string,args?: any): any {
    return `${value.substring(0, 140)}....`
  }

}
 