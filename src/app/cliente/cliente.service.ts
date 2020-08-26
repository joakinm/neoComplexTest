import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  datosCliente : Observable<Cliente[]>;
  clientes :Cliente[] = [];
  clienteCambio = new Subject<Cliente[]>();
  clienteElegido= new Subject<{cliente:Cliente,index:number}>();

  constructor(private data : DataService) { }
  //----Agregar
  agregarCliente(cli : Cliente){
    this.clientes.push(cli);
    this.clienteCambio.next(this.clientes.slice());
  }
  agregarClientes(cli : Cliente[]){
    this.clientes = cli;
    this.clienteCambio.next(this.clientes.slice());
  }
  //------clickeando cliente para modificar o eliminar
  buscarClienteId(id:number){
    let clienteEncontrado = this.clientes[id];
    this.clienteElegido.next({cliente:clienteEncontrado,index:id});
  }
  //------CRUD
  //-http requests
  guardarClientes(){
    if(this.clientes){
      this.data.guardarCliente(this.clientes);
    } else {
      alert('No hay clientes para guardar.');
    }
  }
  traerClientes(){
    this.datosCliente = this.data.traerListaClientes();
    this.datosCliente.subscribe((c:Cliente[]) =>{
      this.agregarClientes(c);
      this.clienteCambio.next(this.clientes.slice());
    });
  }
  //-get delete y update
  mostrarClientes(){
    return this.clientes.slice();
  }
  eliminarCliente(id:number){
      this.clientes.splice(id,1);
      this.clienteCambio.next(this.clientes.slice());
  }
  modificarCliente(c:Cliente,id:number){
    this.clientes[id] = c;
    this.clienteCambio.next(this.clientes.slice());
  }
}
  