/**
 * Movimiento dentro del reporte
 */
export interface ReporteMovimiento {
    fecha: string;
    numeroCuenta: string;
    tipoMovimiento: string;
    valor: number;
    saldo: number;
}