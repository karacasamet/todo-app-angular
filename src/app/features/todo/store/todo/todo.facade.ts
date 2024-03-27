import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { Todo, UpdatedTodo } from 'src/app/shared/types/todo.type';
import {
  FilterType,
  TodoPriority,
  TodoSort,
  TodoStatus,
} from '../../../../shared/enums/todo.enums';
import {
  addTodo,
  changeFilter,
  changeTodo,
  changeTodoStatus,
  getTodos,
  removeTodo,
  sortTodos,
} from './todo.actions';
import {
  getAllTodos,
  getCompletedTodos,
  getFilteredTodos,
  getInProgressTodos,
  getTodosSort,
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

  todosSort$: Observable<TodoSort> = this._store.pipe(select(getTodosSort));

  getAllTodos() {
    this._store.dispatch(getTodos());
  }

  async addTodo(value: {
    todoName: string | null;
    todoPriority: TodoPriority | null;
  }) {
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

  updateTodo(todo: Todo, updatedTodo: UpdatedTodo) {
    this._store.dispatch(changeTodo({ todo, updatedTodo }));
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

  sortTodos() {
    this._store.dispatch(sortTodos());
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
