import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { TrueFalsePipe } from '../../shared/pipes/true-false.pipe';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { PrioritySelectComponent } from './components/priority-select/priority-select.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TodoComponent,
    EditTodoDialogComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TrueFalsePipe,
    ScrollingModule,
    PrioritySelectComponent,
  ],
})
export class TodoModule {}
