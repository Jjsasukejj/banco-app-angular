/**
 * Request para crear una cuenta
 */
export interface CreateCuentaRequest {
    numeroCuenta: string;
    tipoCuenta: 'AHORROS' | 'CORRIENTE';
    saldoInicial: number;
    estado: 'ACTIVA' | 'INACTIVA';
}