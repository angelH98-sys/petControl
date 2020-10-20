import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductoComponent } from './table-producto.component';

describe('TableProductoComponent', () => {
  let component: TableProductoComponent;
  let fixture: ComponentFixture<TableProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
