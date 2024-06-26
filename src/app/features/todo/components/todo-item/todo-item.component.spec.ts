import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { of } from 'rxjs';
import { mockTodos } from 'src/app/shared/mock/todo.mock';
import { TrueFalsePipe } from 'src/app/shared/pipes/true-false.pipe';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [
        MatDialogModule,
        MatSlideToggleModule,
        TrueFalsePipe,
        MatDividerModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = mockTodos[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update todo', () => {
    jest.spyOn(component.todoUpdated, 'emit');
    jest.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () =>
        of({
          todoName: mockTodos[1].name,
          todoPriority: mockTodos[1].priority,
        }),
    } as MatDialogRef<EditTodoDialogComponent>);
    component.openEditDialog();

    expect(component.todoUpdated.emit).toHaveBeenCalled();
    expect(component.todoUpdated.emit).toHaveBeenCalledWith({
      todo: mockTodos[0],
      updatedTodo: { name: mockTodos[1].name, priority: mockTodos[1].priority },
    });
  });

  it('should change status', () => {
    jest.spyOn(component.todoStatusChanged, 'emit');
    component.changeTodoStatus();
    expect(component.todoStatusChanged.emit).toHaveBeenCalled();
  });

  it('should remove todo', () => {
    jest.spyOn(component.todoRemoved, 'emit');
    component.removeTodo();
    expect(component.todoRemoved.emit).toHaveBeenCalled();
  });
});
