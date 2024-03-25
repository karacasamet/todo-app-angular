import {
  FilterType,
  TodoPriority,
  TodoSort,
  TodoStatus,
} from '../enums/todo.enums';

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
  priority: TodoPriority;
}

export interface TodoState {
  todoList: Todo[];
  filter: FilterType;
  sort: TodoSort;
}
