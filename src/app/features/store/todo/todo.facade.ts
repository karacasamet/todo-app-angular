import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interfaces';
import {
  FilterType,
  TodoPriority,
  TodoStatus,
} from '../../../shared/enums/todo.enums';
import {
  addTodo,
  changeFilter,
  changeTodo,
  changeTodoStatus,
  getTodos,
  removeTodo,
} from './todo.actions';
import {
  getAllTodos,
  getCompletedTodos,
  getFilteredTodos,
  getInProgressTodos,
} from './todo.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  _store = inject(Store);

  filterType = FilterType;

  allTodos$: Observable<Todo[]> = this._store.pipe(select(getAllTodos));
  inProgressTodos$: Observable<Todo[]> = this._store.pipe(
    select(getInProgressTodos)
  );
  completedTodos$: Observable<Todo[]> = this._store.pipe(
    select(getCompletedTodos)
  );

  filteredTodos$: Observable<Todo[]> = this._store.pipe(
    select(getFilteredTodos)
  );

  getAllTodos() {
    this._store.dispatch(getTodos());
  }

  async addTodo(
    value: Partial<{
      todoName: string | null;
      todoPriority: TodoPriority | null;
    }>
  ) {
    const { todoName: name, todoPriority: priority } = value;
    const todos = await firstValueFrom(this.allTodos$);
    this._store.dispatch(
      addTodo({
        todo: {
          id: todos.length + 1,
          name,
          priority,
          status: TodoStatus.InProgress,
        } as Todo,
      })
    );
  }

  updateTodo(todo: Todo, newTodo: Todo) {
    this._store.dispatch(changeTodo({ todo, newTodo }));
  }

  removeTodo(todo: Todo) {
    this._store.dispatch(removeTodo({ todo }));
  }

  updateStatusTodo(todo: Todo) {
    this._store.dispatch(changeTodoStatus({ todo }));
  }
  changeFilterTodos(index: number) {
    this._store.dispatch(
      changeFilter({ status: this.checkIndexForFilter(index) })
    );
  }

  checkIndexForFilter(index: number): FilterType {
    if (index === 0) {
      return FilterType.SHOW_ALL;
    } else if (index === 1) {
      return FilterType.SHOW_INPROGRESS;
    } else if (index === 2) {
      return FilterType.SHOW_COMPLETED;
    } else {
      return FilterType.SHOW_ALL;
    }
  }
}
