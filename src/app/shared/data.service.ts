import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  error = new Subject<string>();
  url: string = 'https://clientesbd-4faf6.firebaseio.com/clientes.json';

  constructor(private http : HttpClient) { }

  guardarCliente(clientes:Cliente[]){
    this.http.post(this.url,
      clientes
      ).subscribe(Data=>{
        alert('datos guardados correctamente');
      },err=>{
        alert('hubo un error al guardar datos'); this.error.next(err.message);
      }
      );
  }
  async traerListaClientes(){
    return await this.http.get<Cliente[]>(this.url).toPromise();
  }
}
