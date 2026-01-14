import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
/**
 * Layout maestro de la aplicacion
 */
@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}