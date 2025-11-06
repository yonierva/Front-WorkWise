import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaRegisterComponent } from './empresa-register.component';

describe('EmpresaRegisterComponent', () => {
  let component: EmpresaRegisterComponent;
  let fixture: ComponentFixture<EmpresaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
