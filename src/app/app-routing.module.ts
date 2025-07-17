import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaViagemComponent } from './componentes/consulta-viagem/consulta-viagem.component';
import { ListarViagensComponent } from './componentes/listar-viagens/listar-viagens.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'nova-viagem', component: ConsultaViagemComponent, canActivate: [AuthGuard] },
  { path: 'editar-viagem/:id', component: ConsultaViagemComponent, canActivate: [AuthGuard] },
  { path: 'viagens', component: ListarViagensComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }