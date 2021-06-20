import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWebToDo } from '../types/interfaces';

@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getTodos$(limit = 4): Observable<IWebToDo[]> {
    return this.httpClient.get<IWebToDo[]>(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

  }

  createTodo$(newTodo): Observable<any> {
    return this.httpClient.post('https://jsonplaceholder.typicode.com/todos', newTodo);
  }

  removeTodo$(id: number): Observable<any> {
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
