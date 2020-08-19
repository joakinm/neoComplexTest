import { Injectable } from '@angular/core';
import { cliente } from '../models/cliente.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientes :cliente[] = [];
  clienteCambio = new Subject<cliente[]>();

  constructor() { }

  agregarCliente(cli : cliente){
    this.clientes.push(cli);
    this.clienteCambio.next(this.clientes.slice());
  }
  
  mostrarCliente(){
    return this.clientes.slice();
  }
}
