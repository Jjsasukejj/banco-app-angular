import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { ReportePdfResponse } from '../models/reporte-pdf.response';
import { ReporteMovimiento } from '../models/reporte-movimiento.model';
/**
 * Servicio de Reportes
 */
@Injectable({
    providedIn: 'root'
})
export class ReportesService {
    private readonly reportesUrl = `${API_CONFIG.baseUrl}/movimientos`;

    constructor(private readonly http: HttpClient) { }
    /**
     * Trae el detalle del reporte (lista de movimientos)
     */
    obtenerReporteDetalle(clienteId: number, fechaInicio: string, fechaFin: string): Observable<ReporteMovimiento[]> {
        const params = new HttpParams()
            .set('clienteId', clienteId)
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin);

        return this.http.get<ReporteMovimiento[]>(`${this.reportesUrl}/reporte`, { params });
    }

    /**
     * Trae el detalle del reporte en PDF
     */
    obtenerReportePdf(clienteId: number, fechaInicio: string, fechaFin: string): Observable<ReportePdfResponse> {
        const params = new HttpParams()
            .set('clienteId', clienteId)
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin);

        return this.http.get<ReportePdfResponse>(`${this.reportesUrl}/reporte/pdf`, { params });
    }
}