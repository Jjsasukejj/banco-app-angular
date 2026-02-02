import { Routes } from "@angular/router";
import { ClientesListComponent } from "./pages/clientes-list/clientes-list.component";
import { ClienteCreateComponent } from "./pages/clientes-create/clientes-create.component";
/**
 * Rutas del feature Clientes
 */
export const CLIENTES_ROUTES: Routes = [
    {
        path: '',
        component: ClientesListComponent
    },
    {
        path: 'nuevo',
        component: ClienteCreateComponent
    },
    {
        path: 'editar/:id',
        component: ClienteCreateComponent
    }
];