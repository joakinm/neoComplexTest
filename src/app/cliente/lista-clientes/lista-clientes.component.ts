import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})

export class ListaClientesComponent implements OnInit {
  cli: Cliente[] = [];
  id: number;
  
  constructor(private cliServ : ClienteService) { }

  ngOnInit(): void {
      this.cli = this.cliServ.mostrarClientes();
      this.cliServ.clienteCambio.subscribe(
        (c:Cliente[]) => {this.cli = c}
      );
  }
  guardarClientes(){
    this.cliServ.guardarClientes();
  }
  eliminarCliente(){
    this.cliServ.eliminarCliente(this.id-1);
  }

  componenteClickeado(i:number){
    this.id = i+1;// esto solo para que funcione correctamente el hidden del boton
    this.cliServ.buscarClienteId(this.id-1);
  }
}
