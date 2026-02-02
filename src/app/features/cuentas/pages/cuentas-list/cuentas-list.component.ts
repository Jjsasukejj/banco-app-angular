import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CuentasService } from "../../services/cuentas.service";
import { Cuenta } from "../../models/cuenta.model";
import { FormsModule } from "@angular/forms";
import { finalize } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
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
    clienteIdBusqueda = '';
    error?: string;

    constructor(
        private readonly cuentasService: CuentasService,
        private readonly cdr: ChangeDetectorRef,
        private readonly router: Router) { }

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
                    this.error = err?.error?.message;
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
                error: err => {
                    this.error = err?.error?.message;
                    this.cuentas = [];
                    this.loading = false;
                }
            });
    }
    /**
     * Busca cuentas por clienteId
     */
    buscarPorClienteId(): void {
        const raw = this.clienteIdBusqueda.trim();
        if (!raw) return;

        const id = Number(raw);
        if (Number.isNaN(id)) {
            alert('Cliente ID debe ser numérico');
            return;
        }

        this.loading = true;

        this.cuentasService.obtenerCuentasPorCliente(id)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: cuentas => this.cuentas = cuentas,
                error: () => this.cuentas = []
            });
    }
    /**
     * Limpia la busqueda
     */
    limpiarBusqueda(): void {
        this.numeroCuentaBusqueda = '';
        this.clienteIdBusqueda = '';
        this.cargarCuentas();
        this.error = '';
    }
    /**
    * Elimina una cuenta (solo si está ACTIVA)
    */
    eliminar(numeroCuenta: string): void {
        const ok = confirm(`¿Seguro que deseas eliminar la cuenta ${numeroCuenta}?`);
        if (!ok) return;

        this.loading = true;

        this.cuentasService.eliminarCuenta(numeroCuenta)
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: () => this.cargarCuentas(),
                error: (err) => {
                    console.error('Error al eliminar cuenta', err);
                }
            });
    }
}