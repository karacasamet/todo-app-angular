import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Output() newTodo = new EventEmitter<{
    todoName: string;
    todoPriority: TodoPriority;
  }>();

  todoPriorityValues = Object.values(TodoPriority);

  todoForm = new FormGroup({
    todoName: new FormControl('', Validators.required),
    todoPriority: new FormControl('', Validators.required),
  });

  addNewTodo() {
    if (!this.todoForm.valid) return;
    this.newTodo.emit(
      this.todoForm.value as {
        todoName: string;
        todoPriority: TodoPriority;
      }
    );
    this.todoForm.reset();
  }
}
