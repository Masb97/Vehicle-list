import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-Vehiculo-list',
  templateUrl: './Vehiculo-list.component.html',
  styleUrls: ['./Vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  vehiculos: Array<Vehiculo> =[]
  marcaTotales : Record<string,number> = {};
  marcaOrdenado : string[] =[];

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
    this.vehiculoService.getvehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
      this.calcularTotales();
    });
  }

  ngOnInit() {
    this.getVehiculos();
  }

  private calcularTotales(): void{
    const totales: Record<string,number> = {};
    const orden: string [] = [];

    for(const v of this.vehiculos) {
      if (totales[v.marca] == null) orden.push(v.marca);
      totales[v.marca] = (totales[v.marca] ?? 0) +1;
    }
    this.marcaTotales = totales;
    this.marcaOrdenado = orden;
  }

}
