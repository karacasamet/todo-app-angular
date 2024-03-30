import { TodoPriority, TodoStatus } from '../enums/todo.enums';
import { Todo } from '../types/todo.type';

export const todos: Todo[] = Array.from({ length: 1000000 }, (_, i) => ({
  id: i + 1,
  name: `My todo number ${i + 1}`,
  status:
    i % 3 === 0
      ? TodoStatus.Complete
      : i % 3 === 1
      ? TodoStatus.InProgress
      : TodoStatus.Complete,
  priority:
    i % 3 === 0
      ? TodoPriority.Low
      : i % 3 === 1
      ? TodoPriority.Medium
      : TodoPriority.High,
}));

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
