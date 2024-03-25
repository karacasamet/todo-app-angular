import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todos!: Todo[] | null;
  @Output() todoStatusChanged = new EventEmitter<Todo>();
  @Output() todoUpdated = new EventEmitter<{ todo: Todo; newTodo: Todo }>();
  @Output() todoRemoved = new EventEmitter<Todo>();
  @Output() tabChanged = new EventEmitter<number>();
}
