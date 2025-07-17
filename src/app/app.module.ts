import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'; //essa linha imports
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultaViagemComponent } from './componentes/consulta-viagem/consulta-viagem.component';
import { ListarViagensComponent } from './componentes/listar-viagens/listar-viagens.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';







@NgModule({
  declarations: [
    AppComponent, 
    CabecalhoComponent,
    RodapeComponent,
    ConsultaViagemComponent,
    ListarViagensComponent,
    LoginComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule, 
    MatSnackBarModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
