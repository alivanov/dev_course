import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IWebToDo } from './types/interfaces';
import { TodoService } from './services/todo.service';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newTodoText = '';

  isSubmitting = false;

  todoList: IWebToDo[];

  @ViewChild('todoInput', { static: true })
  todoInput: ElementRef;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.focusTodoInput();
    this.isSubmitting = true;
    this.todoService.getTodos$()
      .pipe(
        delay(1000),
        finalize(() => this.isSubmitting = false)
      )
      .subscribe((todos) => this.todoList = todos as IWebToDo[]);
  }

  addTodo(): void {
    const newTodoText = this.newTodoText.trim();

    if (newTodoText) {
      const newTodo = this.createTodo(newTodoText);
      this.isSubmitting = true;
      this.todoService.createTodo$(newTodo)
        .pipe(
          finalize(() => {
            this.clearTodoInput();
            this.isSubmitting = false;
          })
        )
        .subscribe(() => this.todoList.push(newTodo));
    }
  }

  removeTodo(id: number): void {
    this.isSubmitting = true;
    this.todoService.removeTodo$(id)
      .subscribe(() => this.todoList = this.todoList.filter((todo) => todo.id !== id));
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
