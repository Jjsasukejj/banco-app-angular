/**
 * Request para crear un cliente 
 */
export interface CreateClienteRequest {
    /**
     * Identificador del cliente (CLI001)
     */
    clienteId: string;
    /**
     * Nombre del cliente 
     */
    nombre: string;
    /**
     * Genero del cliente 
     */
    genero: string;
    /**
     * Edad del cliente
     */
    edad: number;
    /**
     * Identificacion del cliente
     */
    identificacion: string;
    /**
     * Direccion domiciliaria del cliente
     */
    direccion: string;
    /**
     * Telefono del cliente
     */
    telefono: string;
    /**
     * Contraseña del cliente
     */
    contrasena: string;
    /**
     * Estado del cliente
     */
    estado: boolean;
}