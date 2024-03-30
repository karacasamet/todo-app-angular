import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoStatus } from 'src/app/shared/enums/todo.enums';
import { Todo, UpdatedTodo } from 'src/app/shared/types/todo.type';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<{
    todo: Todo;
    updatedTodo: UpdatedTodo;
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
        });
      }
    });
  }

  updateTodo(updatedTodo: UpdatedTodo) {
    this.todoUpdated.emit({ todo: this.todo, updatedTodo });
  }

  changeTodoStatus() {
    this.todoStatusChanged.emit(this.todo);
  }

  removeTodo() {
    this.todoRemoved.emit(this.todo);
  }
}
