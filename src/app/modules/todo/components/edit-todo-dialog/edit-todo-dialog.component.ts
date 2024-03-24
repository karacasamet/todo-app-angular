import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoPriority } from 'src/app/modules/shared/enums/todo.enums';
import { Todo } from 'src/app/modules/shared/interfaces/todo.interfaces';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css'],
})
export class EditTodoDialogComponent implements OnInit {
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

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
