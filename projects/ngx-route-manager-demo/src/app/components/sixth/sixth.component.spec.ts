import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthComponent } from './sixth.component';

describe('SixthComponent', () => {
  let component: SixthComponent;
  let fixture: ComponentFixture<SixthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SixthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
