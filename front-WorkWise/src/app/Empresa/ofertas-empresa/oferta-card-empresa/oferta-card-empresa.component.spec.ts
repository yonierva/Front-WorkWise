import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCardEmpresaComponent } from './oferta-card-empresa.component';

describe('OfertaCardEmpresaComponent', () => {
  let component: OfertaCardEmpresaComponent;
  let fixture: ComponentFixture<OfertaCardEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaCardEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaCardEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
