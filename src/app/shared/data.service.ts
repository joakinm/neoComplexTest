import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { cliente } from '../models/cliente.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  error = new Subject<string>();

  constructor(private http : HttpClient) { }

  guardarCliente(clientes:cliente[]){
    this.http.put('https://clientesbd-4faf6.firebaseio.com/clientes.json',
      clientes
      ).subscribe(Data=>{
        alert('datos guardados correctamente');
      },err=>{
        alert('hubo un error al guardar datos'); this.error.next(err.message);
      }
      );
  }
  traerListaClientes(){
    return this.http.get<cliente[]>('https://clientesbd-4faf6.firebaseio.com/clientes.json');
  }

}
