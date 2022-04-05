import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforCardsComponent } from './infor-cards.component';

describe('InforCardsComponent', () => {
  let component: InforCardsComponent;
  let fixture: ComponentFixture<InforCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InforCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InforCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
