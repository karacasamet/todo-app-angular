import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';
import { Todo } from 'src/app/shared/types/todo.type';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
})
export class EditTodoDialogComponent {
  todoPriorityValues = Object.values(TodoPriority);
  todoForm = this.fb.group({
    todoName: new FormControl(this.data.name, [Validators.required]),
    todoPriority: new FormControl(this.data.priority, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
