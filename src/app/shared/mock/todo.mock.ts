import { TodoPriority, TodoStatus } from '../enums/todo.enums';
import { Todo } from '../types/todo.type';

export const mockTodos: Todo[] = [
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
  {
    id: 3,
    name: 'My third todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.High,
  },
];
