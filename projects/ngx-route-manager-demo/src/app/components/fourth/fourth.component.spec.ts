import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthComponent } from './fourth.component';

describe('FourthComponent', () => {
  let component: FourthComponent;
  let fixture: ComponentFixture<FourthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
