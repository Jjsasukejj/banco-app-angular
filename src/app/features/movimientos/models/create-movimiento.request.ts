/**
 * Request para Movimientos bancarios
 */
export interface CreateMovimientoRequest {
    numeroCuenta: string;
    tipoMovimiento: number;
    valor: number;
}