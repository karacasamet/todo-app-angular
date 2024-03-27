import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, UpdatedTodo } from 'src/app/shared/types/todo.type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todos!: Todo[] | null;
  @Output() todoStatusChanged = new EventEmitter<Todo>();
  @Output() todoUpdated = new EventEmitter<{
    todo: Todo;
    updatedTodo: UpdatedTodo;
  }>();
  @Output() todoRemoved = new EventEmitter<Todo>();
  @Output() tabChanged = new EventEmitter<number>();
}
