import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from '../../services/cuentas.service';
import { CreateCuentaRequest } from '../../models/create-cuenta.request';
import { RouterModule } from '@angular/router';
import { finalize } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { ActualizarCuentaRequest } from '../../models/actualizar-cuenta.request';
import { Cuenta } from '../../models/cuenta.model';

@Component({
    selector: 'app-cuentas-create',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './cuentas-create.component.html'
})
export class CuentasCreateComponent {
    /**
     * Modelo del formulario
     */
    cuenta: CreateCuentaRequest = {
        numeroCuenta: '',
        tipoCuenta: 'AHORROS',
        saldoInicial: 0,
        estado: 'ACTIVA'
    };

    cuentaEdit: ActualizarCuentaRequest = {
        tipoCuenta: 'AHORROS',
        estado: 'ACTIVA'
    };

    loading = false;
    error?: string;
    isEditMode = false;
    numeroCuentaParam?: string;

    constructor(
        private readonly cuentasService: CuentasService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        const numeroCuenta = this.route.snapshot.paramMap.get('numeroCuenta');

        if (numeroCuenta) {
            this.isEditMode = true;
            this.numeroCuentaParam = numeroCuenta;
            this.cargarCuenta(numeroCuenta);
        }
    }

    /**
   * Carga cuenta desde backend para precargar el formulario
   */
    private cargarCuenta(numeroCuenta: string): void {
        this.loading = true;
        this.error = undefined;

        this.cuentasService.obtenerCuentaPorNumero(numeroCuenta)
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (cuenta: Cuenta) => {
                    // En edición SOLO necesitamos tipoCuenta y estado
                    this.cuentaEdit = {
                        tipoCuenta: cuenta.tipoCuenta,
                        estado: cuenta.estado
                    };

                    // También mostramos el número (solo lectura en el HTML)
                    this.cuenta.numeroCuenta = cuenta.numeroCuenta;
                },
                error: () => {
                    this.error = 'No se pudo cargar la cuenta para edición';
                }
            });
    }

    /**
     * Envia el formulario al backend
     */
    guardar(): void {
        this.error = undefined;

        if (this.isEditMode && this.numeroCuentaParam) {
            this.loading = true;

            this.cuentasService.actualizarCuenta(this.numeroCuentaParam, this.cuentaEdit)
                .pipe(finalize(() => {
                    this.loading = false;
                    this.cdr.detectChanges();
                }))
                .subscribe({
                    next: () => this.router.navigate(['/cuentas']),
                    error: (err) => {
                        this.error = err?.error ?? 'Error al actualizar cuenta';
                    }
                });

            return;
        }

        const rawClienteId = (this as any).clienteId ?? null; // lo vamos a usar desde el HTML
        const clienteId = Number(rawClienteId);

        if (!rawClienteId || Number.isNaN(clienteId)) {
            this.error = 'Cliente ID es obligatorio y debe ser numérico';
            return;
        }

        this.loading = true;

        this.cuentasService.crearCuenta(clienteId, this.cuenta)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/cuentas']);
                },
                error: (err) => {
                    this.error = err.error ?? 'Error al crear cuenta';
                    this.loading = false;
                }
            });
    }
    /**
     * Regresa al listado
     */
    regresar(): void {
        this.router.navigate(['cuentas']);
    }
    /**
   * ClienteId solo para creacion (lo enlazamos desde HTML).
   */
    clienteId = '';
}