import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IWebToDo } from './types/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newTodoText = '';

  todoList: IWebToDo[];

  @ViewChild('todoInput', { static: true })
  todoInput: ElementRef;

  constructor(private httpClient:HttpClient) {}

  ngOnInit(): void {
    this.focusTodoInput();
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos?_limit=4')
      .subscribe((todos) => this.todoList = todos as IWebToDo[]);
  }

  addTodo(): void {
      const newTodoText = this.newTodoText.trim();

      if (newTodoText) {
        const newTodo = this.createTodo(newTodoText);
        this.httpClient.post('https://jsonplaceholder.typicode.com/todos', newTodo)
          .subscribe(() => {
            this.todoList.push(newTodo);
            this.clearTodoInput();
          });
      }
  }

  removeTodo(id: number): void {
    this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.todoList = this.todoList.filter((todo) => todo.id !== id);
      })
  }

  private clearTodoInput(): void {
    this.newTodoText = '';
  }

  private createTodo(content: string): IWebToDo {
    const id = this.findLastId() + 1;
    return { id, title: content, completed: false };
  }

  private findLastId(): number {
    if (this.todoList.length) {
      return Math.max(...this.todoList.map((item) => item.id));
    }

    return 1;
  }

  private focusTodoInput(): void {
    this.todoInput.nativeElement.focus();
  }
}
