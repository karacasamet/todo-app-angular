import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TrueFalsePipe } from "../pipes/true-false.pipe";
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [TodoComponent, EditTodoDialogComponent, TodoItemComponent, TodoHeaderComponent],
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
        TrueFalsePipe
    ]
})
export class TodoModule {}
