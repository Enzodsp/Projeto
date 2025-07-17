import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: false,
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  constructor(private router: Router) { }
   
  sair(){
    localStorage.removeItem("usuarioLogado");
    this.router.navigate(["/login"]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 100) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
  }
}