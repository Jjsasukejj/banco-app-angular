import { ReporteMovimiento } from "./reporte-movimiento.model";
/**
 * Respuesta completa del reporte
 */
export interface Reporte {
    cliente: string;
    totalCredito: number;
    totalDebito: number;
    movimientos: ReporteMovimiento[];
    pdfBase64: string;
}