import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {
  transform(str: string, length?: number, postfix = '...') {
    if (!str || !str.length || !length || str.length <= length) {
      return str;
    }

    return str.slice(0, length).trim() + postfix;
  }
}
