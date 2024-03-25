import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sortTodos } from 'src/app/features/store/todo/todo.actions';
import { getTodosSort } from 'src/app/features/store/todo/todo.selectors';
import { TodoSort } from 'src/app/shared/enums/todo.enums';

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
