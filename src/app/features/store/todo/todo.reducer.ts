import { Action, createReducer, on } from '@ngrx/store';
import {
  FilterType,
  TodoSort,
  TodoStatus,
} from '../../../shared/enums/todo.enums';
import { TodoState } from '../../../shared/interfaces/todo.interfaces';
import * as actions from './todo.actions';

export const TODO_FEATURE_KEY = 'todo-store';

export const initialState: TodoState = {
  todoList: [],
  filter: FilterType.SHOW_ALL,
  sort: TodoSort.Descending,
};

export const todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  })),
  on(actions.addTodo, (state, { todo }) => ({
    ...state,
    todoList: [...state.todoList, todo],
  })),
  on(actions.changeTodo, (state, { todo, newTodo }) => ({
    ...state,
    todoList: state.todoList.map((el) =>
      el.id === todo.id ? { ...newTodo, id: todo.id, status: todo.status } : el
    ),
  })),
  on(actions.changeTodoStatus, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) =>
      el.id === todo.id
        ? {
            ...el,
            status:
              el.status === TodoStatus.Complete
                ? TodoStatus.InProgress
                : TodoStatus.Complete,
          }
        : el
    ),
  })),
  on(actions.changeFilter, (state, { status }) => ({
    ...state,
    filter: status,
  })),
  on(actions.removeTodo, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.filter(
      (todoListItem) => todoListItem.id !== todo.id
    ),
  })),
  on(actions.sortTodos, (state) => ({
    ...state,
    sort:
      state.sort === TodoSort.Ascending
        ? TodoSort.Descending
        : TodoSort.Ascending,
  }))
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
