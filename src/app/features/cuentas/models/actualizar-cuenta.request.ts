/**
 * Request para actualizar una cuenta
 */
export interface ActualizarCuentaRequest {
    tipoCuenta: 'AHORROS' | 'CORRIENTE';
    estado: 'ACTIVA' | 'INACTIVA';
}