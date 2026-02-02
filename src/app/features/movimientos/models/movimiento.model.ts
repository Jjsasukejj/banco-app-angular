/**
 * respuesta del backend al registrar un movimiento
 */
export interface Movimiento {
    fecha: string;
    numeroCuenta: string;
    tipoMovimiento: string;
    valor: number;
    saldoPosterior: number;
}