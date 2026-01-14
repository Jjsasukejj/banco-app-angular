import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/clientes.service';
import { CreateClienteRequest } from '../../models/create-cliente.request';
import { RouterModule } from '@angular/router';

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
        clienteId: '',
        nombre: '',
        genero: '',
        edad: 0,
        identificacion: '',
        direccion: '',
        telefono: '',
        contrasena: '',
        estado: true
    };

    loading = false;
    error?: string;

    constructor(private readonly clienteService: ClienteService, private readonly router: Router){}
    /**
     * Envia el formulario al backend
     */
    guardar(): void {
        this.loading = true;
        this.error = undefined;

        this.clienteService.crearCliente(this.cliente).subscribe({
            next: () => {
                //volvemos al listado de clientes cuando se crea correctamente
                this.router.navigate(['/clientes']);
            },
            error: (err) => {
                this.error = err.error ?? 'Error al crear cliente';
                this.loading = false;
            }
        });
    }
}