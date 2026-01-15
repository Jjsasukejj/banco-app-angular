/**
 * request para consultar el reporte
 */
export interface ReporteRequest {
    clienteId: string;
    fechaInicio: string;
    fechaFin: string;
}