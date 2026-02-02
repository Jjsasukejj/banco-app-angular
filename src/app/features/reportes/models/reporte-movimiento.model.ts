/**
 * Movimiento dentro del reporte
 */
export interface ReporteMovimiento {
    fecha: string;
    cliente: string;
    numeroCuenta: string;
    tipoCuenta: string;
    saldoInicial: number;
    estado: string;
    movimiento: number;
    saldoDisponible: number;
}