import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsuarioComponent } from './table-usuario.component';

describe('TableUsuarioComponent', () => {
  let component: TableUsuarioComponent;
  let fixture: ComponentFixture<TableUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
