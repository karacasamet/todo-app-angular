import {
  FilterType,
  TodoPriority,
  TodoSort,
  TodoStatus,
} from '../enums/todo.enums';

export type Todo = {
  id: number;
  name: string;
  status: TodoStatus;
  priority: TodoPriority;
};

export type UpdatedTodo = {
  name: string;
  priority: TodoPriority;
};

export type TodoState = {
  todoList: Todo[];
  filter: FilterType;
  sort: TodoSort;
};
