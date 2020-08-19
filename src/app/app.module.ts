import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { ClienteComponent } from './cliente/cliente.component';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './cliente/lista-clientes/lista-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ListaClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
