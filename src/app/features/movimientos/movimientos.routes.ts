import { Routes } from "@angular/router";
import { MovimientosCreateComponent } from "./pages/movimientos-create/movimientos-create.component";

export const MOVIMIENTOS_ROUTES: Routes = [
    {
        path: '',
        component: MovimientosCreateComponent
    }
];