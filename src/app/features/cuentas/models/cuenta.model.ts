/**
 * Modelo que representa una cuenta 
 */
export interface Cuenta {
    id: number;
    numeroCuenta: string;
    tipoCuenta: 'AHORROS' | 'CORRIENTE';
    saldo: number;
    estado: 'ACTIVA' | 'INACTIVA';
    clienteId: number;
    clienteNombre: string;
}