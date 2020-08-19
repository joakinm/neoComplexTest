import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cli :cliente[] = [];
  @ViewChild('f',{static: false}) singupForm:NgForm;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.cli.push(this.singupForm.value);
    console.log(this.cli);
  }
}
