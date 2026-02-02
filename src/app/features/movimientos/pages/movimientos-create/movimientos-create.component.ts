import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos.service';
import { Movimiento } from '../../models/movimiento.model';
import { ChangeDetectorRef } from "@angular/core";
import { finalize } from "rxjs";

@Component({
    selector: 'app-movimientos-create',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './movimientos-create.component.html'
})
export class MovimientosCreateComponent {

    numeroCuenta = '';
    tipo: 'DEPOSITO' | 'RETIRO' = 'DEPOSITO';
    monto = 0;

    resultado?: Movimiento;
    loading = false;
    error?: string;

    constructor(
        private readonly movimientosService: MovimientosService,
        private readonly cdr: ChangeDetectorRef) { }
    /**
     * Envia el movimiento al backend
     */
    guardar(): void {
        this.loading = true;
        this.error = undefined;
        this.resultado = undefined;

        const request$ = this.tipo === 'DEPOSITO' 
            ? this.movimientosService.depositar(this.numeroCuenta, this.monto) 
            : this.movimientosService.retirar(this.numeroCuenta, this.monto);

        request$
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: response => {
                    this.resultado = response;
                    this.loading = false;
                },
                error: err => {
                    this.error = err?.error?.message;
                    this.loading = false;
                }
            });
    }
}