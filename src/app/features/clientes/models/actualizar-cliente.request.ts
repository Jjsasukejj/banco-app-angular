/**
 * Request para actualizar un cliente 
 */
export interface ActualizarClienteRequest {
    nombre: string;
    genero: 'MASCULINO' | 'FEMENINO' | 'OTRO';
    edad: number;
    direccion: string;
    telefono: string;
    estado: 'ACTIVO' | 'INACTIVO';
}