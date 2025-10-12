import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbusquedaComponent } from './navbarbusqueda.component';

describe('NavbarbusquedaComponent', () => {
  let component: NavbarbusquedaComponent;
  let fixture: ComponentFixture<NavbarbusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarbusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarbusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
