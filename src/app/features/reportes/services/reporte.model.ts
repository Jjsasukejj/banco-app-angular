import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { Reporte } from '../models/reporte.model';
/**
 * Servicio de Reportes
 */
@Injectable({
    providedIn: 'root'
})
export class ReportesService {
    private readonly reportesUrl = `${API_CONFIG.baseUrl}/reportes`;

    constructor(private readonly http: HttpClient) {}
    /**
     * Consulta el reporte por cliente y rango de fechas
     */
    obtenerReporte(
        clienteId: string,
        fechaInicio: string,
        fechaFin: string
    ): Observable<Reporte> {
        const params = new HttpParams()
            .set('clienteId', clienteId)
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin);
        
            return this.http.get<Reporte>(this.reportesUrl, { params });
    }
}