import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CuentasService } from "../../services/cuentas.service";
import { Cuenta } from "../../models/cuenta.model";
import { FormsModule } from "@angular/forms";
import { finalize } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { RouterModule } from "@angular/router";
/**
 * Pagina de listado de Cuentas
 * - Carga cuentas desde la API
 * - Expone los datos al template
 */
@Component({
    standalone: true,
    selector: 'app-cuentas-list',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './cuentas-list.component.html',
    styleUrls: ['./cuentas-list.component.scss']
})
export class CuentasListComponent implements OnInit {
    cuentas: Cuenta[] = [];
    numeroCuentaBusqueda = '';
    loading = false;

    constructor(private readonly cuentasService: CuentasService, private readonly cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.cargarCuentas();
    }
    /**
     * Obtiene otdas las cuentas
     */
    cargarCuentas(): void {
        this.loading = true;
        this.cuentasService.obtenerCuentas()
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: cuentas => {
                    this.cuentas = cuentas;
                    this.loading = false;
                },
                error: err => {
                    console.error('Error al cargar cuentas', err);
                    this.loading = false;
                }
            });
    }
    /**
     * Busca una cuenta por numero
     */
    buscarPorNumero(): void {
        if (!this.numeroCuentaBusqueda) {
            return;
        }
        this.loading = true;
        this.cuentasService.obtenerCuentaPorNumero(this.numeroCuentaBusqueda)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: cuenta => {
                    this.cuentas = [cuenta];
                    this.loading = false;
                },
                error: () => {
                    this.cuentas = [],
                        this.loading = false;
                }
            });
    }
    /**
     * Limpia la busqueda
     */
    limpiarBusqueda(): void {
        this.numeroCuentaBusqueda = '';
        this.cargarCuentas();
    }
}