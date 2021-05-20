import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../types/interfaces';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(todos: ITodo[], filterString: string): ITodo[] {
    return todos.filter((todo) => todo.text.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
  }
}
