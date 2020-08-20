import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cliente } from '../models/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  @ViewChild('f',{static: false}) form:NgForm;
  constructor(private servCliente : ClienteService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.servCliente.agregarCliente(this.form.value);
  }
}
