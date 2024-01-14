import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoSort } from 'src/app/modules/shared/enums/todo.enums';
import { sortTodos } from 'src/app/modules/store/todo/todo.actions';
import { getTodosSort } from 'src/app/modules/store/todo/todo.selectors';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css'],
})
export class TodoHeaderComponent implements OnInit {
  getTodosSort$: Observable<TodoSort> = this.store.pipe(select(getTodosSort));
  todoSort = TodoSort;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  sortTodos() {
    this.store.dispatch(sortTodos());
  }
}
