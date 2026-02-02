import { ReporteMovimiento } from "./reporte-movimiento.model";
/**
 * Modelo para mostrar nuestro reporte en la UI
 */
export interface ReporteView {
  clienteId: number;
  totalCredito: number;
  totalDebito: number;
  movimientos: ReporteMovimiento[];
}