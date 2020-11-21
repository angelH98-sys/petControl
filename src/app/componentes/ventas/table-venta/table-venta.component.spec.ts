import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVentaComponent } from './table-venta.component';

describe('TableVentaComponent', () => {
  let component: TableVentaComponent;
  let fixture: ComponentFixture<TableVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
