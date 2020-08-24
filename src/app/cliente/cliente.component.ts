import { Component, OnInit, Input} from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  form:FormGroup;
  nombre:string;
  apellido:string;
  mail:string;
  modoEdit=false;
  indexClElegido:number;

  constructor(private servCliente : ClienteService) { }
  ngOnInit(): void {
    this.servCliente.clienteElegido.subscribe(cl =>{
      this.indexClElegido = cl.index
      this.modoEdit = true;
      this.initForm(cl.cl);
    });
    this.initForm();
  }
  onSubmit(){
    if(this.modoEdit){
      this.servCliente.modificarCliente(this.form.value,this.indexClElegido);
    }
    else{
      this.servCliente.agregarCliente(this.form.value);
    }

  }
  traerListaClientes(){
    this.servCliente.traerClientes();
  }
  private initForm(cl?:cliente){

    let nombre ="";
    let apellido = "";
    let mail = "";

    if(this.modoEdit){
      nombre = cl.nombre;
      apellido = cl.apellido;
      mail = cl.mail;
    }
    this.form = new FormGroup({
      'nombre' : new FormControl(nombre,Validators.required),
      'apellido' : new FormControl(apellido,Validators.required),
      'mail': new FormControl(mail,Validators.required)
    });
  }
}
