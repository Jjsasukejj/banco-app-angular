import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
/**
 * Servicio base para consumir la API rest
 * Centraliza HttpClient y la Url base
 */
export abstract class ApiService {
    //Inyeccion moderna con standalone friendly
    protected http = inject(HttpClient);
    //Url base de la Api
    protected baseUrl = API_CONFIG.baseUrl;
}