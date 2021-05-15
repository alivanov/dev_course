import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multBy'
})
export class MultByPipe implements PipeTransform {

  transform(value: number, factor: number): number {
    return value * factor;
  }

}
