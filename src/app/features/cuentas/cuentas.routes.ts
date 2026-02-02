import { Routes } from "@angular/router";
import { CuentasListComponent } from "./pages/cuentas-list/cuentas-list.component";
import { CuentasCreateComponent } from "./pages/cuentas-create/cuentas-create.component";

/**
 * rutas del feature de Cuentas
 */
export const CUENTAS_ROUTES: Routes = [
    {
        path: '',
        component: CuentasListComponent
    },
    {
        path: 'nuevo',
        component: CuentasCreateComponent
    },
    {
        path: 'editar/:numeroCuenta',
        component: CuentasCreateComponent
    }
];