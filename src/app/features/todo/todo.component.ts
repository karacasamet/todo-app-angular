import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoPriority } from '../../shared/enums/todo.enums';
import { Todo, UpdatedTodo } from '../../shared/types/todo.type';
import { TodoFacade } from './store/todo/todo.facade';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  _todoFacade = inject(TodoFacade);

  todos$: Observable<Todo[]> = this._todoFacade.filteredTodos$;

  constructor() {}

  ngOnInit(): void {
    this._todoFacade.getAllTodos();
  }

  addNewTodo(todo: { todoName: string; todoPriority: TodoPriority }) {
    this._todoFacade.addTodo(todo);
  }

  todoUpdated({ todo, updatedTodo }: { todo: Todo; updatedTodo: UpdatedTodo }) {
    this._todoFacade.updateTodo(todo, updatedTodo);
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
