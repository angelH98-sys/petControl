import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvideComponent } from './olvide.component';

describe('OlvideComponent', () => {
  let component: OlvideComponent;
  let fixture: ComponentFixture<OlvideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
