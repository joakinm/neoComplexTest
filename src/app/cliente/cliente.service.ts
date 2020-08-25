import { Injectable } from '@angular/core';
import { cliente } from '../models/cliente.model';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  datosCliente : Observable<cliente[]>;
  clientes :cliente[] = [];
  clienteCambio = new Subject<cliente[]>();
  clienteElegido= new Subject<{cl:cliente,index:number}>();

  constructor(private data : DataService) { }
 //----Agregar
  agregarCliente(cli : cliente){
    this.clientes.push(cli);
    this.clienteCambio.next(this.clientes.slice());
  }
  agregarClientes(cli : cliente[]){
    this.clientes = cli;
    this.clienteCambio.next(this.clientes.slice());
  }
//------clickeando cliente para modificar o eliminar
  buscarClienteId(id:number){
    let clienteEncontrado = this.clientes[id];
    this.clienteElegido.next({cl:clienteEncontrado,index:id});

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
      this.datosCliente.subscribe((c:cliente[]) =>{
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
    modificarCliente(c:cliente,id:number){
      this.clientes[id] = c;
      this.clienteCambio.next(this.clientes.slice());
    }
  }
  