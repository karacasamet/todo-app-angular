import { TodoPriority, TodoStatus } from '../enums/todo.enums';
import { Todo } from '../interfaces/todo.interfaces';

export const todos: Todo[] = [
  {
    id: 1,
    name: 'My first todo',
    status: TodoStatus.Complete,
    priority: TodoPriority.Low,
  },
  {
    id: 2,
    name: 'My second todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Medium,
  },
];
