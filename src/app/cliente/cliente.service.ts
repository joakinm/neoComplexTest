import { Injectable } from '@angular/core';
import { cliente } from '../models/cliente.model';
import { Subject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientes :cliente[] = [];
  clienteCambio = new Subject<cliente[]>();

  constructor(private data : DataService) { }

  agregarCliente(cli : cliente){
    this.clientes.push(cli);
    this.clienteCambio.next(this.clientes.slice());
  }
  agregarClientes(cli : cliente[]){
    this.clientes = cli;
    this.clienteCambio.next(this.clientes.slice());
  }
  
  mostrarClientes(){
    return this.clientes.slice();
  }
  guardarClientes(){
    if(this.clientes){
      this.data.guardarCliente(this.clientes);
    } else {
      alert('No hay clientes para guardar.');
    }
  }
  traerClientes(){
    this.data.traerListaClientes().subscribe((c:cliente[]) =>{
      this.agregarClientes(c);
      this.clienteCambio.next(this.clientes.slice());
    });
  }
}
