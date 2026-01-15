import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { CreateMovimientoRequest } from '../models/create-movimiento.request';
import { Movimiento } from '../models/movimiento.model';
/**
 * Servicio para Movimientos
 */
@Injectable({
    providedIn: 'root'
})
export class MovimientosService {
    private readonly movimientosUrl = `${API_CONFIG.baseUrl}/movimientos`;

    constructor(private readonly http: HttpClient) {}
    /**
     * registrar un movimiento
     */
    registrarMovimiento(request: CreateMovimientoRequest) : Observable<Movimiento> {
        return this.http.post<Movimiento>(this.movimientosUrl, request);
    };
}