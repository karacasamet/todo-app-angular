import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';
import { mockTodos } from 'src/app/shared/mock/todo.mock';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TODO_FEATURE_KEY } from './store/todo/todo.reducer';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        NoopAnimationsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ScrollingModule,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [TODO_FEATURE_KEY]: {
              todoList: mockTodos,
            },
          },
        }),
      ],
      declarations: [
        TodoComponent,
        TodoFormComponent,
        TodoListComponent,
        TodoHeaderComponent,
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);

    mockStore.overrideSelector('getAllTodos', []);
    mockStore.refreshState();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllTodos on init', () => {
    const todoFacadeSpy = jest.spyOn(component._todoFacade, 'getAllTodos');
    component.ngOnInit();
    expect(todoFacadeSpy).toHaveBeenCalled();
  });

  it('should add new todo', () => {
    const todo = { todoName: 'Test Todo', todoPriority: TodoPriority.High };
    const todoFacadeSpy = jest.spyOn(component._todoFacade, 'addTodo');
    component.addNewTodo(todo);
    expect(todoFacadeSpy).toHaveBeenCalledWith(todo);
  });

  it('should update todo', () => {
    const todo = mockTodos[2];
    const updatedTodo = { name: 'Updated Todo', priority: TodoPriority.High };
    const todoFacadeSpy = jest.spyOn(component._todoFacade, 'updateTodo');
    component.todoUpdated({ todo, updatedTodo });
    expect(todoFacadeSpy).toHaveBeenCalledWith(todo, updatedTodo);
  });

  it('should update todo status', () => {
    const todo = mockTodos[2];
    const todoFacadeSpy = jest.spyOn(component._todoFacade, 'updateStatusTodo');
    component.todoStatusChanged(todo);
    expect(todoFacadeSpy).toHaveBeenCalledWith(todo);
  });

  it('should remove todo', () => {
    const todo = mockTodos[2];
    const todoFacadeSpy = jest.spyOn(component._todoFacade, 'removeTodo');
    component.todoRemoved(todo);
    expect(todoFacadeSpy).toHaveBeenCalledWith(todo);
  });

  it('should change filter todos when tab changed and show ALL', () => {
    const index = 0;
    const todoFacadeSpy = jest.spyOn(
      component._todoFacade,
      'changeFilterTodos'
    );
    component.tabChanged(index);
    expect(todoFacadeSpy).toHaveBeenCalledWith(index);
  });

  it('should change filter todos when tab changed and show InProgress', () => {
    const index = 1;
    const todoFacadeSpy = jest.spyOn(
      component._todoFacade,
      'changeFilterTodos'
    );
    component.tabChanged(index);
    expect(todoFacadeSpy).toHaveBeenCalledWith(index);
  });

  it('should change filter todos when tab changed and show Completed', () => {
    const index = 2;
    const todoFacadeSpy = jest.spyOn(
      component._todoFacade,
      'changeFilterTodos'
    );
    component.tabChanged(index);
    expect(todoFacadeSpy).toHaveBeenCalledWith(index);
  });

  it('should change filter todos when tab changed and show ALL on error', () => {
    const index = 4;
    const todoFacadeSpy = jest.spyOn(
      component._todoFacade,
      'changeFilterTodos'
    );
    component.tabChanged(index);
    expect(todoFacadeSpy).toHaveBeenCalledWith(index);
  });
});
