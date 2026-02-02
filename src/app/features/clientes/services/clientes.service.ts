import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente.model";
import { CreateClienteRequest } from "../models/create-cliente.request";
import { UpdateEstadoClienteRequest } from "../models/update-estado-cliente.request";
import { API_CONFIG } from "../../../core/config/api.config";
import { ActualizarClienteRequest } from "../models/actualizar-cliente.request";
/**
 * Servicio para la comunicacion entre frontend y backend del dominio Clientes
 */
@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    /**
     * Endpoint base del recurso Clientes
     */
    private readonly clienteUrl = `${API_CONFIG.baseUrl}/clientes`;
    /**
     * Inyectamos HttpClient para realizar peticion Rest, funciona por que ya registramos providerHttpCliente() en app.config.ts
     */
    constructor(private readonly http: HttpClient) {}
    /**
     * Obtiene todos los clientes
     * Retorna un Observable<Cliente[]> para:
     * - poder usar async pipe en UI 
     * - poder manejar errores con RxJS
     */
    obtenerClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.clienteUrl);
    }
    /**
     * Obtiene un cliente por su Id
     */
    obtenerClientePorId(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
    }
    /**
     * Crear un nuevo cliente
     */
    crearCliente(request: CreateClienteRequest): Observable<void> {
        return this.http.post<void>(this.clienteUrl, request);
    }
    /**
     * Delete logico de un cliente (activo/inactivo)
     */
    inactivarCliente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.clienteUrl}/${id}`);
    }
    /**
     * Actualizar un cliente
     */
    actualizarCliente(id: number, request: ActualizarClienteRequest): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.clienteUrl}/${id}`, request);
    }
}