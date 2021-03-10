import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {
  form: FormGroup;
  nombre: string;
  apellido: string;
  mail: string;
  modoEdit = false;
  indexClElegido: number;

  constructor(private servCliente: ClienteService) { }
  
  ngOnInit(): void {
    this.servCliente.clienteElegido.subscribe(cliente => {
      this.indexClElegido = cliente.index
      this.modoEdit = true;
      this.initForm(cliente.cliente);
    });
    this.initForm();
  }

  onSubmit() {
    if(this.modoEdit) {
      this.servCliente.modificarCliente(this.form.value,this.indexClElegido);
      this.modoEdit=false;
    }
    else {
      this.servCliente.agregarCliente(this.form.value);
    }
  }

  async traerListaClientes() {
    await this.servCliente.traerClientes();
  }

  private initForm(cliente?: Cliente) {
    let nombre = '';
    let apellido = '';
    let mail = '';

    if(this.modoEdit) {
      nombre = cliente.nombre;
      apellido = cliente.apellido;
      mail = cliente.mail;
    }
    this.form = new FormGroup({
      'nombre' : new FormControl(nombre, Validators.required),
      'apellido' : new FormControl(apellido, Validators.required),
      'mail': new FormControl(mail, [Validators.required, Validators.email])
    });
  }
}
