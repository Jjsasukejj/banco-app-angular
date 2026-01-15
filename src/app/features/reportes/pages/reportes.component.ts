import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../services/reporte.model';
import { Reporte } from '../models/reporte.model';
import { ChangeDetectorRef } from "@angular/core";
import { finalize } from "rxjs";

@Component({
    selector: 'app-reportes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reportes.component.html'
})
export class ReportesComponent {
    clienteId = '';
    fechaInicio = '';
    fechaFin = '';

    reporte?: Reporte;
    loading = false;
    error?: string;

    constructor(private readonly reportesService: ReportesService, private readonly cdr: ChangeDetectorRef) { }
    /**
     * Consulta el reporte
     */
    buscar(): void {
        if (!this.clienteId || !this.fechaInicio || !this.fechaFin) {
            this.error = 'Debe ingresar todos los filtros.'
            return;
        }

        this.loading = true;
        this.error = undefined;
        this.reporte = undefined;

        this.reportesService.obtenerReporte(this.clienteId, this.fechaInicio, this.fechaFin)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: response => {
                    this.reporte = response;
                    this.loading = false;
                },
                error: err => {
                    this.error = err.error ?? 'Error al obtener el reporte';
                    this.loading = false;
                }
            });
    }
    /**
     * Descargar el PDF enviando por el backend
     */
    descargarPdf(): void {
        if (!this.reporte?.pdfBase64) return;

        const byteCharacters = atob(this.reporte.pdfBase64);
        const byteNumbers = Array.from(byteCharacters, x => x.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporte_${this.clienteId}.pdf`;
        a.click();

        window.URL.revokeObjectURL(url);
    }
}