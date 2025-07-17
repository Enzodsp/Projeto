import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViagemService } from '../../services/viagem.service';
import { ConsultacepService } from '../../services/consultacep.service';
import { Viagem } from '../../models/viagem.model';

@Component({
  selector: 'app-consulta-viagem',
  standalone: false,
  templateUrl: './consulta-viagem.component.html',
  styleUrls: ['./consulta-viagem.component.css']
})
export class ConsultaViagemComponent implements OnInit {
   form!: FormGroup;
  editMode = false;
  erroCep = false;
  idViagem?: number;
  paises = [
    { codigo: 'BR', nome: 'Brasil' },
    { codigo: 'US', nome: 'Estados Unidos' },
    { codigo: 'CA', nome: 'Canadá' },
    { codigo: 'DE', nome: 'Alemanha' },
    { codigo: 'FR', nome: 'França' },
    { codigo: 'AR', nome: 'Argentina' },
    { codigo: 'AT', nome: 'Áustria' },
    { codigo: 'CH', nome: 'Suíça' },
    { codigo: 'DK', nome: 'Dinamarca' },
    { codigo: 'ES', nome: 'Espanha' },
    { codigo: 'FI', nome: 'Finlândia' },
    { codigo: 'GL', nome: 'Groenlândia' },
    { codigo: 'GT', nome: 'Guatemala' },
    { codigo: 'HR', nome: 'Croácia' },
    { codigo: 'IN', nome: 'Índia' },
    { codigo: 'IT', nome: 'Itália' },
    { codigo: 'IS', nome: 'Islândia' },
    { codigo: 'JP', nome: 'Japão' },
    { codigo: 'LI', nome: 'Liechtenstein' },
    { codigo: 'MC', nome: 'Mônaco' },
    { codigo: 'MX', nome: 'México' },
    { codigo: 'NL', nome: 'Países Baixos' },
    { codigo: 'NO', nome: 'Noruega' },
    { codigo: 'NZ', nome: 'Nova Zelândia' },
    { codigo: 'PL', nome: 'Polônia' },
    { codigo: 'PT', nome: 'Portugal' },
    { codigo: 'RU', nome: 'Rússia' },
    { codigo: 'SE', nome: 'Suécia' },
    { codigo: 'TH', nome: 'Tailândia' },
    { codigo: 'VA', nome: 'Vaticano' },
    { codigo: 'ZA', nome: 'África do Sul' }
  ];


  constructor(
    private fb: FormBuilder,
    private viagemService: ViagemService,
    private cepService: ConsultacepService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      destino: [''],
      dataIda: [''],
      dataVolta: [''],
      descricao: [''],
      pais: ['BR'], // País padrão
      cepLocal: [''],
      endereco: this.fb.group({
        logradouro: [''],
        bairro: [''],
        cidade: [''],
        estado: ['']
      })
    });

    // Desabilita os campos de endereço (preenchidos automaticamente)
    const enderecoGroup = this.form.get('endereco') as FormGroup;
    enderecoGroup.disable({ onlySelf: true });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.idViagem = +id;
      this.viagemService.buscarPorId(this.idViagem).subscribe(v => {
      this.form.patchValue(v);
      });
    }
  }

  buscarCep() {
    const cep = this.form.value.cepLocal;
    const pais = this.form.value.pais;
    
    if (!cep) return;
    
    this.cepService.consultarCep(cep, pais).subscribe({
      next: (res) => {
        if (res) {
          this.form.get('endereco')?.patchValue(res);
          this.erroCep = false;
        } else {
          this.erroCep = true;
        }
      },
      error: () => this.erroCep = true
    });
  }

  salvar() {
  if (this.form.invalid) return;
  
  const endereco = (this.form.get('endereco') as FormGroup).getRawValue();

  const viagem: Viagem = {
    ...this.form.getRawValue(),
    usuarioId: Number(localStorage.getItem('usuarioId')),
    endereco // substitui o campo endereco desabilitado por este
  };


  const operacao = this.editMode && this.idViagem
    ? this.viagemService.atualizar(this.idViagem, viagem)
    : this.viagemService.criar(viagem);

  operacao.subscribe({
    next: () => this.router.navigate(['/viagens']),
    error: (err) => console.error('Erro ao salvar viagem:', err)
  });
}

  cancelar() {
    this.router.navigate(['/viagens']);
  }
}