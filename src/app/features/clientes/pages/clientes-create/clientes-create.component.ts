import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/clientes.service';
import { CreateClienteRequest } from '../../models/create-cliente.request';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActualizarClienteRequest } from '../../models/actualizar-cliente.request';
import { Cliente } from '../../models/cliente.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-clientes-create',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './clientes-create.component.html',
    styleUrls: ['./clientes-create.component.scss']
})
export class ClienteCreateComponent {
    /**
     * modelo enlazado al formulario
     */
    cliente: CreateClienteRequest = {
        nombre: '',
        genero: 'MASCULINO',
        edad: 0,
        identificacion: '',
        direccion: '',
        telefono: '',
        contrasena: '',
        estado: 'ACTIVO'
    };

    loading = false;
    error?: string;
    isEditMode = false;
    clienteId?: number;

    constructor(
        private readonly clienteService: ClienteService, 
        private readonly router: Router, 
        private readonly route: ActivatedRoute,
        private readonly cdr: ChangeDetectorRef) { }
    /**
     * Analizamos si: viene con Id Editamos, caso contrario Creamos un nuevo Cliente
     */
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.isEditMode = true;
            this.clienteId = Number(id);
            this.cargarCliente(this.clienteId);
        } else {
            this.loading = false;
        }
    }

    private cargarCliente(id: number): void {
        this.error = undefined;
        this.clienteService.obtenerClientePorId(id).subscribe({
            next: (cliente: Cliente) => {
                this.cliente = {
                    nombre: cliente.nombre,
                    genero: cliente.genero,
                    edad: cliente.edad,
                    identificacion: cliente.identificacion,
                    direccion: cliente.direccion,
                    telefono: cliente.telefono,
                    estado: cliente.estado ? 'ACTIVO' : 'INACTIVO',
                    contrasena: ''//Contrasenia no se edita 
                };

                this.loading = false;
                this.cdr.detectChanges();
            },
            error: err => {
                this.error = err.error.message;
                this.loading = false;
            }
        });
    }
    /**
     * Envia el formulario al backend
     */
    guardar(): void {
        this.loading = true;
        this.error = undefined;

        if (this.isEditMode && this.clienteId) {
            // Request solo con los campos permitidos para edición
            const request: ActualizarClienteRequest = {
                nombre: this.cliente.nombre,
                genero: this.cliente.genero as any,
                edad: this.cliente.edad,
                direccion: this.cliente.direccion,
                telefono: this.cliente.telefono,
                estado: this.cliente.estado
            };

            this.clienteService.actualizarCliente(this.clienteId, request).subscribe({
                next: () => this.router.navigate(['/clientes']),
                error: (err) => {
                    this.error = err.error.message;
                    this.loading = false;
                }
            });
        } else {
            this.error = undefined;
            this.clienteService.crearCliente(this.cliente).subscribe({
                next: () => {
                    //volvemos al listado de clientes cuando se crea correctamente
                    this.router.navigate(['/clientes']);
                },
                error: (err) => {
                    this.error = err.error.message;
                    this.loading = false;
                }
            });
        }
    }
}