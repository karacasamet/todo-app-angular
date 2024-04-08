import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';

@Component({
  selector: 'app-priority-select',
  templateUrl: './priority-select.component.html',
  styleUrl: './priority-select.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PrioritySelectComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PrioritySelectComponent),
      multi: true,
    },
  ],
})
export class PrioritySelectComponent
  implements ControlValueAccessor, Validator
{
  todoPriorityValues = Object.values(TodoPriority);

  value!: TodoPriority;
  disabled = false;
  onChange: (value: TodoPriority) => void = (value) => {
    this.writeValue(value);
  };

  onTouched: () => void = () => {};

  writeValue(obj: TodoPriority): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: TodoPriority) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validateControl(control);
  }

  private validateControl(control: AbstractControl): ValidationErrors | null {
    if (!control.value || control.value === '') {
      return { required: true };
    }
    return null;
  }
}
