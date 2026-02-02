/**
 * Modelo de respuesta de reporte en base 64 de nuestro backend
 */
export interface ReportePdfResponse {
  archivoBase64: string;
  nombreArchivo: string;
}