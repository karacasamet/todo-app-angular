import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoFacade } from '../../store/todo/todo.facade';
import { TodoHeaderComponent } from './todo-header.component';

describe('TodoHeaderComponent', () => {
  let component: TodoHeaderComponent;
  let fixture: ComponentFixture<TodoHeaderComponent>;
  let todoFacade: TodoFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDividerModule, MatIconModule],
      providers: [provideMockStore(), TodoFacade],
      declarations: [TodoHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoHeaderComponent);
    component = fixture.componentInstance;
    todoFacade = TestBed.inject(TodoFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortTodos method of TodoFacade', () => {
    jest.spyOn(todoFacade, 'sortTodos');
    component.sortTodos();
    expect(todoFacade.sortTodos).toHaveBeenCalled();
  });
});
