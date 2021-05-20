import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITodo } from './types/interfaces';

const FIVE_SECONDS = 5000;
const TODOS_MOCK = [
  { id: 1, text: 'Buy milk', status: false },
  { id: 2, text: 'Make coffee', status: false },
  { id: 3, text: 'Smoke a cigarette', status: false },
  { id: 4, text: 'Learn Angular', status: false }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newTodoText = '';

  todoList: Promise<ITodo[]>;

  @ViewChild('todoInput', { static: true })
  todoInput: ElementRef;

  ngOnInit(): void {
    this.focusTodoInput();

    this.todoList = new Promise<ITodo[]>((resolve) => {
      setTimeout(() => resolve(TODOS_MOCK), FIVE_SECONDS);
    });
  }

  addTodo(): void {
  //   const newTodoText = this.newTodoText.trim();
  //
  //   if (newTodoText) {
  //     const newTodo = this.createTodo(newTodoText);
  //     this.todoList.push(newTodo);
  //     this.clearTodoInput();
  //   }
  }

  removeTodo(id: number): void {
  //   this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  // private clearTodoInput(): void {
  //   this.newTodoText = '';
  // }

  // private createTodo(content: string): ITodo {
  //   const id = this.findLastId() + 1;
  //   return { id, text: content, status: false };
  // }

  // private findLastId(): number {
  //   if (this.todoList.length) {
  //     return Math.max(...this.todoList.map((item) => item.id));
  //   }
  //
  //   return 1;
  // }

  private focusTodoInput(): void {
    this.todoInput.nativeElement.focus();
  }
}
