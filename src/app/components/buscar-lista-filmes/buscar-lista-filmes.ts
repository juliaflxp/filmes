import { Component } from '@angular/core';
import { Filme } from '../../shared/interfaces/filme';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filmes } from '../../shared/services/filmes';

@Component({
  selector: 'app-buscar-lista-filmes',
  imports: [ReactiveFormsModule],
  templateUrl: './buscar-lista-filmes.html',
  styleUrl: './buscar-lista-filmes.css'
})
export class BuscarListaFilmes {

  filmes: Filme[] = [];
  form!: FormGroup;
  erro: boolean = false;
  isLoading: boolean = false;

  constructor(private service: Filmes,
    private fb: FormBuilder){
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]]
    })
  }

  buscarListaFilmes(){
    this.erro = false;
    const titulo = this.form.get('titulo')?.value;
    this.isLoading = true;

    if(titulo){
      this.service.obterListaFilmes(titulo).subscribe({
        next: (res: any) => {

          if(res.Response === 'False'){
            this.erro = true;
          }

          this.filmes = res.Search || [];
          this.isLoading = false;

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
    this.filmes = []
  }

}
