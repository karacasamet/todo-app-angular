import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';
import { PrioritySelectComponent } from '../priority-select/priority-select.component';
import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        PrioritySelectComponent,
      ],
      declarations: [TodoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newTodo event if form is valid', () => {
    jest.spyOn(component.newTodo, 'emit');
    component.todoForm.setValue({
      todoName: 'Test',
      todoPriority: TodoPriority.High,
    });
    component.addNewTodo();
    expect(component.newTodo.emit).toHaveBeenCalledWith({
      todoName: 'Test',
      todoPriority: TodoPriority.High,
    });
  });

  it('should not emit newTodo event if form is invalid', () => {
    jest.spyOn(component.newTodo, 'emit');
    component.todoForm.setValue({ todoName: '', todoPriority: '' });
    component.addNewTodo();
    expect(component.newTodo.emit).not.toHaveBeenCalled();
  });
});
