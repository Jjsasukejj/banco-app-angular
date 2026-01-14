/**
 * Request para actualizar el estado de un cliente
 */
export interface UpdateEstadoClienteRequest {
    /**
     * NUevo estado del cliente
     */
    estado: boolean;
}