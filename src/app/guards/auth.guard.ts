import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, // Injetar o AuthService
    private router: Router
  ) { }

  canActivate(): boolean {
  const logado = this.authService.estaLogado();
  if (!logado) {
    this.router.navigate(['/login']);
  }
  return logado;
 }
}

