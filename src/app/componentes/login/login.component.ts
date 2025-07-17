import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  aba: 'login' | 'cadastro' = 'login';
  carregando: boolean = false;
  mostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    // Inicializa o form de acordo com a aba
    const group: any = {
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    };
    if (this.aba === 'cadastro') {
      group.nome = ['', Validators.required];
    }
    this.form = this.fb.group(group);
  }

  selecionarAba(aba: 'login' | 'cadastro'): void {
    if (this.aba === aba) return;
    this.aba = aba;
    this.buildForm();
  }

  toggleAbaText(): string {
    return this.aba === 'login' ? 'Entrar' : 'Cadastrar';
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Preencha todos os campos corretamente.', 'Fechar', { duration: 3000 });
      return;
    }

    this.carregando = true;
    const { email, senha, nome } = this.form.value;

    try {
      if (this.aba === 'login') {
        const usuario = await lastValueFrom(this.authService.login(email, senha));
        this.snackBar.open('Login realizado com sucesso!', 'Ok', { duration: 3000 });
        await this.router.navigate(['/home']);
      } else {
        // cadastro
        await lastValueFrom(this.usuarioService.criar({ nome, email, senha }));
        this.snackBar.open('Cadastro realizado! Entrando...', 'Ok', { duration: 3000 });
        // autentica automaticamente
        await lastValueFrom(this.authService.login(email, senha));
        await this.router.navigate(['/home']);
      }
    } catch (err: any) {
      const msg =
        err?.error?.mensagem ||
        err.message ||
        'Ocorreu um erro inesperado. Tente novamente.';
      this.snackBar.open(msg, 'Fechar', { duration: 5000 });
    } finally {
      this.carregando = false;
    }
  }
}