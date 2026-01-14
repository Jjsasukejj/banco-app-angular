import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from '../../services/cuentas.service';
import { CreateCuentaRequest } from '../../models/create-cuenta.request';
import { RouterModule } from '@angular/router';

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
        tipoCuenta: 1,
        saldoInicial: 0,
        estado: true,
        clienteId: ''
    };

    loading = false;
    error?: string;

    constructor(
        private readonly cuentasService: CuentasService,
        private readonly router: Router) { }
    /**
     * Envia el formulario al backend
     */
    guardar(): void {
        this.loading = true;
        this.error = undefined;

        this.cuentasService.crearCuenta(this.cuenta)
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
}