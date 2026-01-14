/**
 * Modelo que representa una cuenta 
 */
export interface Cuenta {
    numeroCuenta: string;
    tipoCuenta: number;
    saldo: number;
    estado: boolean;
}