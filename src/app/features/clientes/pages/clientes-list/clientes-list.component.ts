import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClienteService } from "../../services/clientes.service";
import { Cliente } from "../../models/cliente.model";
import { finalize } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
/**
 * Pagina de listado de clientes
 * - Carga clientes desde la API
 * - Expone los datos al template
 */
@Component({
    selector: 'app-clientes-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './clientes-list.component.html',
    styleUrls: ['./clientes-list.component.scss',]
})
export class ClientesListComponent implements OnInit {
    /**
     * Lista de clientes obtenidos desde la API
     */
    clientes: Cliente[] = [];
    /**
     * ClienteId ingresado parav busqueda
     */
    clienteIdBusqueda = '';
    /**
     * Indica si estamos mostrando resultados de busqueda
     */
    buscando = false;
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
    /**
     * Busca un cliente por ClienteId
     */
    buscarPorClienteId(): void {
        const id = this.clienteIdBusqueda.trim();

        if (!id) {
            return;
        }

        this.loading = true;
        this.buscando = true;

        this.clientesService.obtenerClientePorId(id)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    //Fuerza a Angular a refrescar la vista 
                    this.cdr.detectChanges();
                })
            )
            .subscribe({
                next: (cliente) => {
                    /**
                     * La Api nos devuelve un solo cliente
                     */
                    this.clientes = [cliente];
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Cliente no encontrado', err);
                    this.clientes = [];
                    this.loading = false;
                },
            });
    }
    /**
     * Limpia la busqueda y vuelve a cargar todos los clientes 
     */
    limpiarBusqueda(): void {
        this.clienteIdBusqueda = '';
        this.buscando = false;
        this.cargarClientes();
    }
    /**
     * Cambia el estado del cliente llamado al backend 
     */
    cambiarEstado(cliente: Cliente): void {
        const nuevoEstado = !cliente.estado;

        this.clientesService
            .actualizarCliente(cliente.clienteId, nuevoEstado)
            .subscribe({
                next: () => {
                    console.log('cambia estado?', cliente.estado);
                    //Reflejamos el cambio localmente
                    cliente.estado = nuevoEstado;
                },
                error: (err) => {
                    console.error('Error al actualizar estado', err);
                    alert('No se pudo actualizar el estado del cliente');
                }
            });
    }
}