import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FilterType,
  TodoPriority,
  TodoSort,
  TodoStatus,
} from '../../shared/enums/todo.enums';
import { Todo, TodoState } from '../../shared/interfaces/todo.interfaces';
import { TODO_FEATURE_KEY } from './todo.reducer';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) =>
  [...state.todoList].sort((a, b) => sortByStatus(a, b, state.sort))
);
export const getCompletedTodos = createSelector(getAllTodos, (state) =>
  state.filter((todo: Todo) => todo.status === TodoStatus.Complete)
);
export const getInProgressTodos = createSelector(getAllTodos, (state) =>
  state.filter((todo: Todo) => todo.status === TodoStatus.InProgress)
);

export const getTodosSort = createSelector(getTodoState, (state) => state.sort);
// can handle with one selector also
// multiple selector is better for caching
export const getFilteredTodos = createSelector(getTodoState, (state) =>
  state.todoList.filter((todo: Todo) => checkStatus(todo, state.filter))
);

const checkStatus = (todo: Todo, filter: FilterType) => {
  if (filter === FilterType.SHOW_ALL) {
    return true;
  } else if (filter === FilterType.SHOW_INPROGRESS) {
    return todo.status === TodoStatus.InProgress;
  } else if (filter === FilterType.SHOW_COMPLETED) {
    return todo.status === TodoStatus.Complete;
  } else {
    return null;
  }
};

function sortByStatus(a: Todo, b: Todo, sort: TodoSort): number {
  const map = new Map<TodoPriority, number>();
  map.set(TodoPriority.Low, 2);
  map.set(TodoPriority.Medium, 1);
  map.set(TodoPriority.High, 0);

  if (map.get(a.priority)! < map.get(b.priority)!) {
    return sort === TodoSort.Ascending ? 1 : -1;
  }
  if (map.get(a.priority)! > map.get(b.priority)!) {
    return sort === TodoSort.Ascending ? -1 : 1;
  }
  return 0;
}
