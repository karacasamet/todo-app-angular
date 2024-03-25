import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoPriority } from '../../shared/enums/todo.enums';
import { Todo } from '../../shared/interfaces/todo.interfaces';
import { TodoFacade } from '../store/todo/todo.facade';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  _todoFacade = inject(TodoFacade);

  todos$: Observable<Todo[]> = this._todoFacade.filteredTodos$;

  constructor() {}

  ngOnInit(): void {
    this._todoFacade.getAllTodos();
  }

  addNewTodo(
    todo: Partial<{
      todoName: string;
      todoPriority: TodoPriority;
    }>
  ) {
    this._todoFacade.addTodo(todo);
  }

  todoUpdated({ todo, newTodo }: { todo: Todo; newTodo: Todo }) {
    this._todoFacade.updateTodo(todo, newTodo);
  }

  todoStatusChanged(todo: Todo) {
    this._todoFacade.updateStatusTodo(todo);
  }

  todoRemoved(todo: Todo) {
    this._todoFacade.removeTodo(todo);
  }
  tabChanged(index: number) {
    this._todoFacade.changeFilterTodos(index);
  }
}
