import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TodoStatus } from 'src/app/modules/shared/enums/todo.enums';
import { Todo } from 'src/app/modules/shared/interfaces/todo.interfaces';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<{
    todo: Todo;
    newTodo: Todo;
  }>();
  @Output() todoStatusChanged = new EventEmitter<Todo>();
  @Output() todoRemoved = new EventEmitter<Todo>();
  statusEnum = TodoStatus;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '250px',
      data: this.todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTodo({
          name: result.todoName,
          priority: result.todoPriority,
        } as Todo);
      }
    });
  }

  updateTodo(newTodo: Todo) {
    this.todoUpdated.emit({ todo: this.todo, newTodo });
  }

  changeTodoStatus() {
    this.todoStatusChanged.emit(this.todo);
  }

  removeTodo() {
    this.todoRemoved.emit(this.todo);
  }
}
