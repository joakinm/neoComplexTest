import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  datosCliente: Observable<Cliente[]>;
  clientes: Cliente[] = [];
  clienteCambio = new Subject<Cliente[]>();
  clienteElegido = new Subject<{cliente:Cliente, index:number}>();

  constructor(private data: DataService) { }
  
  public agregarCliente(cli: Cliente): void{
    this.clientes.push(cli);
    this.clienteCambio.next(this.clientes.slice());
  }

  agregarClientes(cli: Cliente[]){
    this.clientes = cli;
    this.clienteCambio.next(this.clientes.slice());
  }

  buscarClienteId(id: number) {
    let clienteEncontrado = this.clientes[id];
    this.clienteElegido.next({cliente: clienteEncontrado, index: id});
  }

  guardarClientes() {
    if(this.clientes) {
      this.data.guardarCliente(this.clientes);
    } else {
      alert('No hay clientes para guardar.');
    }
  }

  async traerClientes() {
    let listaCliente = await this.data.traerListaClientes();
    this.agregarClientes(listaCliente);
    this.clienteCambio.next(this.clientes.slice());
  }

  mostrarClientes() {
    return this.clientes.slice();
  }

  eliminarCliente(id: number) {
      this.clientes.splice(id, 1);
      this.clienteCambio.next(this.clientes.slice());
  }
  
  modificarCliente(c: Cliente,id: number) {
    this.clientes[id] = c;
    this.clienteCambio.next(this.clientes.slice());
  }

}
  