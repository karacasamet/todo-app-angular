import {
  FilterType,
  TodoSort,
  TodoStatus,
} from '../../../../shared/enums/todo.enums';
import { mockTodos } from '../../../../shared/mock/todo.mock';
import {
  addTodo,
  changeFilter,
  changeTodo,
  changeTodoStatus,
  getTodosSuccess,
  removeTodo,
  sortTodos,
} from './todo.actions';
import { initialState, reducer, todoReducer } from './todo.reducer';

describe('todo Reducer', () => {
  it('should return default state', () => {
    const state = reducer(initialState, { type: 'Unknown' });
    expect(state).toBe(initialState);
  });

  it('should return todoList', () => {
    const state = todoReducer(
      initialState,
      getTodosSuccess({ todoList: mockTodos })
    );
    expect(state.todoList).toBe(mockTodos);
  });
  it('should add a todo on addTodo action', () => {
    const todo = mockTodos[2];

    const action = addTodo({ todo });
    const state = todoReducer(initialState, action);

    expect(state.todoList.length).toEqual(1);
    expect(state.todoList[0]).toEqual(todo);
  });

  it('should change a todo on changeTodo action', () => {
    const todo = mockTodos[0];
    const updatedTodo = mockTodos[1];
    const action = changeTodo({ todo, updatedTodo });
    const state = todoReducer({ ...initialState, todoList: [todo] }, action);

    expect(state.todoList[0]).toEqual({
      ...updatedTodo,
      id: todo.id,
      status: todo.status,
    });
  });
  it('should change todoStatus', () => {
    const state = todoReducer(
      initialState,
      getTodosSuccess({ todoList: mockTodos })
    );
    const stateSecond = todoReducer(
      state,
      changeTodoStatus({
        todo: mockTodos[0],
      })
    );
    expect(stateSecond.todoList[0].status).toBe(TodoStatus.InProgress);
    const stateThird = todoReducer(
      stateSecond,
      changeTodoStatus({
        todo: mockTodos[0],
      })
    );
    expect(stateThird.todoList[0].status).toBe(TodoStatus.Complete);
  });

  it('should change filter', () => {
    const filter = FilterType.SHOW_COMPLETED;
    const action = changeFilter({ status: filter });
    const state = todoReducer(initialState, action);

    expect(state.filter).toEqual(filter);
  });

  it('should remove a todo', () => {
    const todo = mockTodos[0];
    const action = removeTodo({ todo });
    const state = todoReducer({ ...initialState, todoList: [todo] }, action);

    expect(state.todoList).not.toContain(todo);
  });

  it('should sort todos', () => {
    const todo1 = mockTodos[0];
    const todo2 = mockTodos[1];

    const action = sortTodos();
    const state = todoReducer(
      { ...initialState, todoList: [todo1, todo2] },
      action
    );

    expect(state.sort).toEqual(TodoSort.Ascending);
  });

  it('should sort todos2', () => {
    const todo1 = mockTodos[0];
    const todo2 = mockTodos[1];
    const action = sortTodos();
    const state = todoReducer(
      { ...initialState, sort: TodoSort.Ascending, todoList: [todo1, todo2] },
      action
    );

    expect(state.sort).toEqual(TodoSort.Descending);
  });
});
