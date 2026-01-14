import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cuenta } from "../models/cuenta.model";
import { CreateCuentaRequest } from "../models/create-cuenta.request";
import { API_CONFIG } from "../../../core/config/api.config";
/**
 * Servicio que gestiona la comunicacion con el backend para Cuentas
 */
@Injectable({
    providedIn: 'root'
})
export class CuentasService {
    /**
    * Endpoint base de Cuentas
    */
    private readonly cuentasUrl = `${API_CONFIG.baseUrl}/cuentas`;

    constructor(private readonly http: HttpClient) { }

    /**
     * Obtiene todas las cuentas
     */
    obtenerCuentas(): Observable<Cuenta[]> {
        return this.http.get<Cuenta[]>(this.cuentasUrl);
    }

    /**
     * Obtiene una cuenta por su numero
     */
    obtenerCuentaPorNumero(numeroCuenta: string): Observable<Cuenta> {
        return this.http.get<Cuenta>(`${this.cuentasUrl}/${numeroCuenta}`);
    }

    /**
     * Crea una nueva cuenta
     */
    crearCuenta(request: CreateCuentaRequest): Observable<void> {
        return this.http.post<void>(this.cuentasUrl, request);
    }
}