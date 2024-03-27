import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockTodos } from 'src/app/shared/mock/todo.mock';
import {
  FilterType,
  TodoSort,
  TodoStatus,
} from '../../../../shared/enums/todo.enums';
import { Todo, TodoState } from '../../../../shared/types/todo.type';
import { TODO_FEATURE_KEY, todoReducer } from './todo.reducer';
import {
  checkStatus,
  getAllTodos,
  getCompletedTodos,
  getFilteredTodos,
  getInProgressTodos,
  getTodoState,
  getTodosSort,
  sortByStatus,
} from './todo.selectors';

describe('Todo Selectors', () => {
  let store: MockStore;
  const initialState = {
    [TODO_FEATURE_KEY]: {
      todoList: mockTodos,
      sort: TodoSort.Ascending,
      filter: FilterType.SHOW_ALL,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ [TODO_FEATURE_KEY]: todoReducer })],
      providers: [provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
  });

  it('should select the todo state', () => {
    let result: TodoState | undefined;

    store.select(getTodoState).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(initialState[TODO_FEATURE_KEY]);
  });

  it('should select all todos', () => {
    let result: Todo[] | undefined;

    store.select(getAllTodos).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(initialState[TODO_FEATURE_KEY].todoList);
  });

  it('should select completed todos', () => {
    let result: Todo[] | undefined;

    store.select(getCompletedTodos).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual([initialState[TODO_FEATURE_KEY].todoList[0]]);
  });

  it('should select in-progress todos', () => {
    let result: Todo[] | undefined;

    store.select(getInProgressTodos).subscribe((value) => {
      result = value;
    });

    const expected = initialState[TODO_FEATURE_KEY].todoList.filter(
      (todo) => todo.status === TodoStatus.InProgress
    );
    
    expect(result).toEqual(expected);
  });

  it('should select the sort order', () => {
    let result: TodoSort | undefined;

    store.select(getTodosSort).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(initialState[TODO_FEATURE_KEY].sort);
  });

  it('should select filtered todos', () => {
    let result: Todo[] | undefined;

    store.select(getFilteredTodos).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(initialState[TODO_FEATURE_KEY].todoList);
  });

  it('should return false for completed todos when filter is SHOW_INPROGRESS', () => {
    const todo: Todo = mockTodos[0];
    expect(checkStatus(todo, FilterType.SHOW_INPROGRESS)).toBe(false);
  });

  it('should return true for completed todos when filter is SHOW_COMPLETED', () => {
    const todo: Todo = mockTodos[0];
    expect(checkStatus(todo, FilterType.SHOW_COMPLETED)).toBe(true);
  });

  it('should return true for all todos when filter is SHOW_ALL', () => {
    const todo: Todo = mockTodos[1];
    expect(checkStatus(todo, FilterType.SHOW_ALL)).toBe(true);
  });

  it('should return true for in-progress todos when filter is SHOW_INPROGRESS', () => {
    const todo: Todo = mockTodos[1];
    expect(checkStatus(todo, FilterType.SHOW_INPROGRESS)).toBe(true);
  });

  it('should return false for in-progress todos when filter is SHOW_COMPLETED', () => {
    const todo: Todo = mockTodos[1];
    expect(checkStatus(todo, FilterType.SHOW_COMPLETED)).toBe(false);
  });

  it('should return null for an unknown filter', () => {
    const todo: Todo = mockTodos[0];
    expect(checkStatus(todo, 'unknown' as FilterType)).toBe(null);
  });

  describe('sortByStatus', () => {
    it('should sort todos in ascending order by priority', () => {
      const todo1: Todo = mockTodos[0];
      const todo2: Todo = mockTodos[1];

      expect(sortByStatus(todo1, todo2, TodoSort.Ascending)).toBe(-1);
      expect(sortByStatus(todo2, todo1, TodoSort.Ascending)).toBe(1);
      expect(sortByStatus(todo1, todo1, TodoSort.Ascending)).toBe(0);
    });

    it('should sort todos in descending order by priority', () => {
      const todo1: Todo = mockTodos[0];
      const todo2: Todo = mockTodos[1];

      expect(sortByStatus(todo1, todo2, TodoSort.Descending)).toBe(1);
      expect(sortByStatus(todo2, todo1, TodoSort.Descending)).toBe(-1);
      expect(sortByStatus(todo1, todo1, TodoSort.Descending)).toBe(0);
    });
  });
});
