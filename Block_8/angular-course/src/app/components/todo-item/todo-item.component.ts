import { Component } from '@angular/core';

/**
 * Interpolation
 * @link https://angular.io/guide/interpolation
 */

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todoTitle = 'Learn Angular';

  todoItem = { id: 1, text: 'Learn Angular', status: false };

  getMaxNumber(): number {
    return Math.max(6, 8, 1, 4, 5);
  }
}
