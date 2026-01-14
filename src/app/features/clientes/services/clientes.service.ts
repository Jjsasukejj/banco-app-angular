import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente.model";
import { CreateClienteRequest } from "../models/create-cliente.request";
import { UpdateEstadoClienteRequest } from "../models/update-estado-cliente.request";
import { API_CONFIG } from "../../../core/config/api.config";
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
     * Obtiene un cliente por su ClienteId
     */
    obtenerClientePorId(clienteId: string): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.clienteUrl}/${clienteId}`);
    }
    /**
     * Crear un nuevo cliente
     */
    crearCliente(request: CreateClienteRequest): Observable<void> {
        return this.http.post<void>(this.clienteUrl, request);
    }
    /**
     * Actualizar el estado de un cliente (activo/inactivo)
     */
    actualizarCliente(clienteId: string, estado: boolean): Observable<void> {
        //Construimos el body tal como lo espera el backend
        const body: UpdateEstadoClienteRequest = { estado };

        return this.http.patch<void>(`${this.clienteUrl}/${clienteId}/estado`, body);
    }
}