import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClienteService } from "../../services/clientes.service";
import { Cliente } from "../../models/cliente.model";
import { finalize } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { RouterModule } from "@angular/router";
/**
 * Pagina de listado de clientes
 * - Carga clientes desde la API
 * - Expone los datos al template
 */
@Component({
    selector: 'app-clientes-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './clientes-list.component.html',
    styleUrls: ['./clientes-list.component.scss',]
})
export class ClientesListComponent implements OnInit {
    /**
     * Lista de clientes obtenidos desde la API
     */
    clientes: Cliente[] = [];
    /**
     * Indica si la data se esta cargando
     */
    loading = false;
    /**
     * Inyectamos el servicio de clientes
     */
    constructor(private readonly clientesService: ClienteService, private readonly cdr: ChangeDetectorRef) { }
    /**
     * Ciclo de vida de Angular, se ejecuta una sola vez al cargar el componente
     */
    ngOnInit(): void {
        this.cargarClientes();
    }
    /**
     * Obtiene la lista de clientes desde el backend
     */
    private cargarClientes(): void {
        this.loading = true;

        this.clientesService.obtenerClientes()
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: (clientes) => {
                    //Asignamos la respuesta a la variable del componente
                    this.clientes = clientes;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error al cargar clientes', error);
                    this.loading = false;
                }
            });
    }
}