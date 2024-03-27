import { createAction, props } from '@ngrx/store';
import { FilterType } from '../../../../shared/enums/todo.enums';
import {
  createFailureAction,
  createSuccessAction,
} from '../../../../shared/store/action-utils';
import { Todo, UpdatedTodo } from '../../../../shared/types/todo.type';

export const getTodos = createAction('[ToDo] Get ToDo List');
export const getTodosSuccess = createSuccessAction(
  getTodos,
  props<{ todoList: Todo[] }>()
);
export const getTodosFailure = createFailureAction(getTodos);

export const addTodo = createAction(
  '[ToDo] Add ToDo Item',
  props<{ todo: Todo }>()
);

export const changeTodo = createAction(
  '[ToDo] Change ToDo',
  props<{ todo: Todo; updatedTodo: UpdatedTodo }>()
);

export const changeTodoStatus = createAction(
  '[ToDo] Change ToDo Status',
  props<{ todo: Todo }>()
);

export const removeTodo = createAction(
  '[ToDo] Remove ToDo Item',
  props<{ todo: Todo }>()
);

export const changeFilter = createAction(
  '[ToDo] Change Filter',
  props<{ status: FilterType }>()
);

export const sortTodos = createAction('[ToDo] Sort Todos');
