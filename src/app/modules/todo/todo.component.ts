import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import {
  FilterType,
  TodoPriority,
  TodoStatus,
} from '../shared/enums/todo.enums';
import { Todo } from '../shared/interfaces/todo.interfaces';
import {
  addTodo,
  changeFilter,
  changeTodo,
  changeTodoStatus,
  getTodos,
  removeTodo,
} from '../store/todo/todo.actions';
import {
  getAllTodos,
  getCompletedTodos,
  getInProgressTodos,
} from '../store/todo/todo.selectors';
import { getFilteredTodos } from './../store/todo/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  statusEnum = TodoStatus;
  filterType = FilterType;
  TodoPriorityValues = Object.values(TodoPriority);

  todoForm = this.fb.group({
    todoName: new FormControl('', [Validators.required]),
    todoPriority: new FormControl(TodoPriority.Medium, [Validators.required]),
  });

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));
  inProgressTodos$: Observable<Todo[]> = this.store.pipe(
    select(getInProgressTodos)
  );
  completedTodos$: Observable<Todo[]> = this.store.pipe(
    select(getCompletedTodos)
  );

  filteredTodos$: Observable<Todo[]> = this.store.pipe(
    select(getFilteredTodos)
  );

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  async addNewTodo() {
    if (!this.todoForm.valid) return;
    const { todoName: name, todoPriority: priority } = this.todoForm.value;

    const todos = await firstValueFrom(this.allTodos$);
    this.store.dispatch(
      addTodo({
        todo: {
          id: todos.length + 1,
          name,
          priority,
          status: TodoStatus.InProgress,
        } as Todo,
      })
    );
    this.todoForm.reset();
  }

  todoUpdated({ todo, newTodo }: { todo: Todo; newTodo: Todo }) {
    this.store.dispatch(changeTodo({ todo, newTodo }));
  }

  todoStatusChanged(todo: Todo) {
    this.store.dispatch(changeTodoStatus({ todo }));
  }

  todoRemoved(todo: Todo) {
    this.store.dispatch(removeTodo({ todo }));
  }

  onTabChanged(index: number) {
    this.store.dispatch(
      changeFilter({ status: this.checkIndexForFilter(index) })
    );
  }

  checkIndexForFilter(index: number): FilterType {
    if (index === 0) {
      return FilterType.SHOW_ALL;
    } else if (index === 1) {
      return FilterType.SHOW_INPROGRESS;
    } else if (index === 2) {
      return FilterType.SHOW_COMPLETED;
    } else {
      return FilterType.SHOW_ALL;
    }
  }
}
