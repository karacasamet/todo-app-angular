import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import {
  FilterType,
  TodoSort,
  TodoStatus,
} from '../../../../shared/enums/todo.enums';
import { TodoState } from '../../../../shared/types/todo.type';
import * as actions from './todo.actions';

export const TODO_FEATURE_KEY = 'todo-store';

export const initialState: TodoState = {
  todoList: [],
  filter: FilterType.SHOW_ALL,
  sort: TodoSort.Descending,
};

export const todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) =>
    produce(state, (draft) => {
      draft.todoList = todoList;
    })
  ),
  on(actions.addTodo, (state, { todo }) =>
    produce(state, (draft) => {
      draft.todoList.push(todo);
    })
  ),
  on(actions.changeTodo, (state, { todo, updatedTodo }) =>
    produce(state, (draft) => {
      let todoItemIndex = draft.todoList.findIndex((el) => el.id === todo.id);
      if (todoItemIndex > -1) {
        draft.todoList[todoItemIndex] = {
          ...updatedTodo,
          priority: updatedTodo.priority,
          id: todo.id,
          status: todo.status,
        };
      }
    })
  ),
  on(actions.changeTodoStatus, (state, { todo }) =>
    produce(state, (draft) => {
      const todoItem = draft.todoList.find((el) => el.id === todo.id);
      if (todoItem) {
        todoItem.status =
          todoItem.status === TodoStatus.Complete
            ? TodoStatus.InProgress
            : TodoStatus.Complete;
      }
    })
  ),
  on(actions.changeFilter, (state, { status }) =>
    produce(state, (draft) => {
      draft.filter = status;
    })
  ),
  on(actions.removeTodo, (state, { todo }) =>
    produce(state, (draft) => {
      const index = draft.todoList.findIndex((el) => el.id === todo.id);
      if (index !== -1) {
        draft.todoList.splice(index, 1);
      }
    })
  ),
  on(actions.sortTodos, (state) =>
    produce(state, (draft) => {
      draft.sort =
        draft.sort === TodoSort.Ascending
          ? TodoSort.Descending
          : TodoSort.Ascending;
    })
  )
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
