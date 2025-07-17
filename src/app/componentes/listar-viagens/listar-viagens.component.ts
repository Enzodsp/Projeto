import { Component, OnInit } from '@angular/core';
import { ViagemService } from '../../services/viagem.service';
import { Viagem } from '../../models/viagem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-viagens',
  standalone: false,
  templateUrl: './listar-viagens.component.html',
  styleUrls: ['./listar-viagens.component.css']
})
export class ListarViagensComponent implements OnInit {
  viagens: Viagem[] = [];
  usuarioId: number | null = null;
  carregando = true;
  erroCarregamento = false;

  constructor(
    private viagemService: ViagemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioId = Number(localStorage.getItem('usuarioId'));
    this.carregarViagens();
  }

  carregarViagens(): void {
    this.carregando = true;
    this.erroCarregamento = false;
    
    this.viagemService.listar(this.usuarioId!).subscribe({
      next: (viagens) => {
        this.viagens = viagens;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar viagens', err);
        this.erroCarregamento = true;
        this.carregando = false;
      }
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
  
  editar(viagem: Viagem) {
    this.router.navigate(['/editar-viagem', viagem.id]);
  }

  excluirViagem(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta viagem?')) {
      this.viagemService.excluir(id).subscribe({
        next: () => {
          this.viagens = this.viagens.filter(v => v.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir viagem', err);
        }
      });
    }
  }
  novaViagem() {
    this.router.navigate(['/nova-viagem']);
  }
}