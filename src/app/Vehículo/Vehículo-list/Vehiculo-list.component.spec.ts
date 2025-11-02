/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { VehiculoListComponent } from './Vehiculo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

describe('VehiculoListComponent', () => {
  let component: VehiculoListComponent;
  let fixture: ComponentFixture<VehiculoListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehiculoListComponent],
      providers: [VehiculoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoListComponent);
    component = fixture.componentInstance;

    const marcas = ['Renault', 'Chevrolet', 'Nissan'];
    for (let i = 1; i <= 3; i++) {
      const v = new Vehiculo(
        i,                           
        marcas[i - 1],               
        faker.vehicle.model(),       
        faker.string.alpha(3),       
        faker.number.int({ min: 2015, max: 2021 }),
        faker.number.int({ min: 5000, max: 90000 }),// kilometraje
        faker.color.human(),         // color
        faker.image.url()            // imagen
      );
      component.vehiculos.push(v);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table header row with 4 columns', () => {
    expect(debug.queryAll(By.css('table.vehiculos-table thead tr'))).toHaveSize(1);
    expect(debug.queryAll(By.css('table.vehiculos-table thead th'))).toHaveSize(4);
  });

  it('should render exactly 3 body rows', () => {
    expect(debug.queryAll(By.css('table.vehiculos-table tbody tr'))).toHaveSize(3);
  });

  it('should show id, marca, linea and modelo in the first row', () => {
    const firstRow = debug.queryAll(By.css('table.vehiculos-table tbody tr'))[0];
    const cells = firstRow.queryAll(By.css('th, td')); // [id, marca, linea, modelo]
    expect(cells).toHaveSize(4);
    expect(cells[0].nativeElement.textContent).toContain(component.vehiculos[0].id);
    expect(cells[1].nativeElement.textContent).toContain(component.vehiculos[0].marca);
    expect(cells[2].nativeElement.textContent).toBeTruthy(); // línea (faker)
    expect(cells[3].nativeElement.textContent).toContain(component.vehiculos[0].modelo);
  });
});
