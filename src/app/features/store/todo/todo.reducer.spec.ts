import { TodoStatus } from '../../../shared/enums/todo.enums';
import { todos } from '../../../shared/mock/todo.mock';
import { changeTodoStatus, getTodosSuccess } from './todo.actions';
import { initialState, todoReducer } from './todo.reducer';

describe('todo Reducer', () => {
  it('should return default state', () => {
    const state = todoReducer(initialState, { type: 'Unknown' });
    expect(state).toBe(initialState);
  });

  it('should return todoList', () => {
    const state = todoReducer(
      initialState,
      getTodosSuccess({ todoList: todos })
    );
    expect(state.todoList).toBe(todos);
  });

  it('should update todoStatus', () => {
    const state = todoReducer(
      initialState,
      getTodosSuccess({ todoList: todos })
    );
    const stateSecond = todoReducer(
      state,
      changeTodoStatus({
        todo: todos[0],
      })
    );
    expect(stateSecond.todoList[0].status).toBe(TodoStatus.InProgress);
    const stateThird = todoReducer(
      stateSecond,
      changeTodoStatus({
        todo: todos[0],
      })
    );
    expect(stateThird.todoList[0].status).toBe(TodoStatus.Complete);
  });
});
