import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todoItem = { id: 1, text: 'Learn Angular', status: false };

  toggleTodo(): void {
    this.todoItem.status = !this.todoItem.status;
  }
}
