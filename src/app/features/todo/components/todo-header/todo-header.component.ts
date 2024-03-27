import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoSort } from 'src/app/shared/enums/todo.enums';
import { TodoFacade } from '../../store/todo/todo.facade';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css'],
})
export class TodoHeaderComponent {
  _todoFacade = inject(TodoFacade);

  getTodosSort$: Observable<TodoSort> = this._todoFacade.todosSort$;
  todoSort = TodoSort;

  constructor(private store: Store) {}

  sortTodos() {
    this._todoFacade.sortTodos();
  }
}
