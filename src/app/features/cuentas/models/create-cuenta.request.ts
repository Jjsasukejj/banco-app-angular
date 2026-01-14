/**
 * Request para crear una cuenta
 */
export interface CreateCuentaRequest {
    numeroCuenta: string;
    tipoCuenta: number;
    saldoInicial: number;
    estado: boolean;
    clienteId: string;
}