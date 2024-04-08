import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockTodos } from 'src/app/shared/mock/todo.mock';
import { PrioritySelectComponent } from '../priority-select/priority-select.component';
import { EditTodoDialogComponent } from './edit-todo-dialog.component';

describe('EditTodoDialogComponent', () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;

  const mockDialogRef = {
    close: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        PrioritySelectComponent,
      ],
      declarations: [EditTodoDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        { provide: MAT_DIALOG_DATA, useValue: mockTodos[0] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    component.data = mockTodos[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get name', () => {
    component.todoForm.get('todoName')?.setValue('dummyName');
    expect(component).toBeTruthy();
  });

  it('should get priority', () => {
    expect(component.todoForm.get('todoName')?.value).toEqual(
      component.data.name
    );
    expect(component.todoForm.get('todoPriority')?.value).toEqual(
      component.data.priority
    );
  });

  it('should call close method of MatDialogRef', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
