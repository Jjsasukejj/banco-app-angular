/**
 * Modelo Cliente, representa un cliente tal como lo expone la API
 */
export interface Cliente{
    /**
     * Identificador del cliente (CLI001)
     */
    id: number;
    /**
     * Nombre del cliente 
     */
    nombre: string;
    /**
     * Genero del cliente 
     */
    genero: 'MASCULINO' | 'FEMENINO' | 'OTRO';
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
     * Estado del cliente
     */
    estado: 'ACTIVO' | 'INACTIVO';
}