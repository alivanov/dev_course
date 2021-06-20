import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWebToDo } from '../../types/interfaces';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todoItem: IWebToDo;

  @Output()
  removeTodo = new EventEmitter<number>();

  @ContentChild('info', { static: true })
  info: ElementRef;

  ngOnInit(): void {
    if (this.info) {
      console.log(this.info.nativeElement);
    }
  }

  toggleTodo(): void {
    this.todoItem.completed = !this.todoItem.completed;
  }
}
