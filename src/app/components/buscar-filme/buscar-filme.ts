import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filmes } from '../../shared/services/filmes';
import { Filme } from '../../shared/interfaces/filme';

@Component({
  selector: 'app-buscar-filme',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './buscar-filme.html',
  styleUrl: './buscar-filme.css'
})
export class BuscarFilme {

  filme!: Filme;
  form!: FormGroup;
  erro: boolean = false;
  isLoading: boolean = false;

  constructor(private service: Filmes,
    private fb: FormBuilder){
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]]
    })
  }

  buscarFilme(){
    this.erro = false;
    const titulo = this.form.get('titulo')?.value;
    this.isLoading = true;

    if(titulo){
      this.service.obterFilme(titulo).subscribe({
        next: (res: any) => {
          this.filme = res
          this.isLoading = false;

          if(res.Response === 'False'){
            this.erro = true;
          }
        },
        error: () => {
          this.erro = true;
          this.isLoading = false;
        }
      })
    }
  }

  limparBusca(){
    this.form.reset();
    this.erro = false;
    this.isLoading = false;
    this.filme.Title = '';
    this.filme.Poster = '';
  }

}
