import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../types/interfaces';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input()
  todoItem: ITodo;

  @Output()
  removeTodo = new EventEmitter<number>();

  toggleTodo(): void {
    this.todoItem.status = !this.todoItem.status;
  }
}
