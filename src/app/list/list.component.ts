import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listaPokemonsSave: any[];
  listaPokemons: any[];
  listaString: String = "";
  ordenacaoList = [
    {label: 'Ordernar por Nome', value: "nome"},
    {label: 'Ordernar por ID', value: "id"},
  ];
  ordenacaoAtual = "id";

  orientacaoList = [
    {label: 'Visualização em Card', value: "card"},
    {label: 'Visualização em Tabela', value: "tabela"},
  ];
  orientacaoAtual = "tabela";


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllPokemon().then((data:any)=> {
      this.listaPokemonsSave = data['results'].map(pkm=>{
        return {
          'id': pkm.url.toString().replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''),
          'name':  pkm.name
        }
      });
      this.listaPokemons = this.listaPokemonsSave
    });
  }

  getImage(id){
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png'
  }
  
  setListaPokemon(){
    this.listaPokemons = this.listaPokemonsSave.filter((a)=>{
      if(a.name.toLocaleLowerCase().includes(this.listaString.toLocaleLowerCase())){
        return true
      }
    })
  }

  orderListaPokemon(){
    if(this.ordenacaoAtual=="id"){
      this.listaPokemons = this.listaPokemons.sort((a,b)=> {
        return a.id - b.id
      })
    }else{
      this.listaPokemons = this.listaPokemons.sort((a,b)=> {
        return a.name.localeCompare(b.name)
      })
    }
  }

}
