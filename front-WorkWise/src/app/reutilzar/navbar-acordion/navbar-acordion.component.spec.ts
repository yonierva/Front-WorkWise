import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAcordionComponent } from './navbar-acordion.component';

describe('NavbarAcordionComponent', () => {
  let component: NavbarAcordionComponent;
  let fixture: ComponentFixture<NavbarAcordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAcordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAcordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
