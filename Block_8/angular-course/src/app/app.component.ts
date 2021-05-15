import { Component } from '@angular/core';
import { ITodo } from './types/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newTodoText = '';

  todoList: ITodo[] = [
    { id: 1, text: 'Buy milk', status: false },
    { id: 2, text: 'Make coffee', status: false },
    { id: 3, text: 'Smoke a cigarette', status: false },
    { id: 4, text: 'Learn Angular', status: false },
  ];
}
