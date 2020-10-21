import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmpleadoComponent } from './table-empleado.component';

describe('TableEmpleadoComponent', () => {
  let component: TableEmpleadoComponent;
  let fixture: ComponentFixture<TableEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
