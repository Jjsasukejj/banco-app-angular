import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../services/reportes.service';
import { ChangeDetectorRef } from "@angular/core";
import { finalize } from "rxjs";
import { ReporteView } from '../models/reporte-view.model';
import { ReporteMovimiento } from '../models/reporte-movimiento.model';

@Component({
    selector: 'app-reportes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reportes.component.html'
})
export class ReportesComponent {
    clienteId = 0;
    fechaInicio = '';
    fechaFin = '';

    reporte?: ReporteView;
    movimientos: ReporteMovimiento[] = [];
    loading = false;
    error?: string;

    constructor(private readonly reportesService: ReportesService, private readonly cdr: ChangeDetectorRef) { }
    /**
     * Consulta el reporte
     */
    buscar(): void {
        const rawId = this.clienteId;
        if (!rawId || !this.fechaInicio || !this.fechaFin) {
            this.error = 'Debe ingresar todos los filtros.';
            return;
        }

        const id = Number(rawId);
        if (Number.isNaN(id)) {
            this.error = 'Cliente ID debe ser numérico.';
            return;
        }

        this.loading = true;
        this.error = undefined;
        this.reporte = undefined;
        this.movimientos = [];

        this.reportesService
            .obtenerReporteDetalle(id, this.fechaInicio, this.fechaFin)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: (data: ReporteMovimiento[]) => {
                    const totalCredito = data
                        .filter(x => x.movimiento > 0)
                        .reduce((acc, x) => acc + x.movimiento, 0);

                    const totalDebito = data
                        .filter(x => x.movimiento < 0)
                        .reduce((acc, x) => acc + Math.abs(x.movimiento), 0);

                    this.reporte = {
                        clienteId: this.clienteId,
                        totalCredito,
                        totalDebito,
                        movimientos: data
                    };

                    this.loading = false;
                },
                error: (err) => {
                    this.error = err?.error?.message ?? 'Error al obtener el reporte';
                    this.movimientos = [];
                    this.reporte = undefined;
                }
            });
    }
    /**
     * Descargar el PDF enviando por el backend
     */
    descargarPdf(): void {
        if (!this.clienteId || !this.fechaInicio || !this.fechaFin) return;

        this.reportesService
            .obtenerReportePdf(this.clienteId, this.fechaInicio, this.fechaFin)
            .subscribe({
                next: (response) => {

                    let base64 = response.archivoBase64;

                    if (base64.includes(',')) {
                        base64 = base64.split(',')[1];
                    }

                    base64 = base64.replace(/\s/g, '');

                    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

                    const byteCharacters = atob(base64);
                    const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
                    const byteArray = new Uint8Array(byteNumbers);

                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = response.nombreArchivo;
                    a.click();

                    window.URL.revokeObjectURL(url);
                },
                error: err => {
                    this.error = err?.error?.message ?? 'No se pudo descargar el PDF';
                }
            });
    }
}