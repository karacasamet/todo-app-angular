import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoPriority } from 'src/app/shared/enums/todo.enums';
import { PrioritySelectComponent } from './priority-select.component';

describe('PrioritySelectComponent', () => {
  let component: PrioritySelectComponent;
  let fixture: ComponentFixture<PrioritySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioritySelectComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PrioritySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take the dropdown value and show data ', () => {
    const debugElement = fixture.debugElement;
    // open options dialog
    const matSelect = debugElement.query(By.css('select')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    // select the first option (use queryAll if you want to chose an option)
    const matOption = debugElement.query(By.css('option')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement: HTMLElement = debugElement.query(
        By.css('.ask-input')
      ).nativeElement;
      expect(inputElement.innerHTML.length).toBeGreaterThan(0);
    });
  });

  it('should call writeValue when onChange is invoked', () => {
    jest.spyOn(component, 'writeValue');
    const testValue: TodoPriority = TodoPriority.High;
    component.onChange(testValue);
    expect(component.writeValue).toHaveBeenCalledWith(testValue);
  });

  it('should be able to detect when onTouched is invoked', () => {
    jest.spyOn(component, 'onTouched');
    component.onTouched();
    expect(component.onTouched).toHaveBeenCalled();
  });
});
