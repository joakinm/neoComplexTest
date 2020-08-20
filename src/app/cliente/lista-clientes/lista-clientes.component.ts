import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  cli: cliente[] = [];
  constructor(private cliServ : ClienteService) { }

  ngOnInit(): void {
      this.cli = this.cliServ.mostrarClientes();
      this.cliServ.clienteCambio.subscribe(
        (c:cliente[]) => {this.cli = c}
      )
  }
  guardarClientes(){
    this.cliServ.guardarClientes();
  }
}
