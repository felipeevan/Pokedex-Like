import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pokemonData: any;
  sprites: any[];
  moves: any;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(async params =>{
      await this.apiService.getPokemonDetail(params.id).then(async data=>{
        this.pokemonData=data;
        this.sprites = this.getImages()
        this.getMoves().then((data)=>{
          this.moves = data;
        })
      }).catch(error=>{
        return this.router.navigateByUrl("/404")
      })
    })
  }

  getTipos(){
    if(this.pokemonData){
      let titleCasePipe = new TitleCasePipe()

      let tipos = this.pokemonData['types'].map((tipo)=>{
        return titleCasePipe.transform(tipo['type']['name'])
      })
      return tipos.join('/')
    }
  }

  getImages(){
    if(this.pokemonData){
      let sprites = [];
      Object.keys(this.pokemonData['sprites']).forEach((key, i)=>{
        if(key.toLocaleLowerCase().includes('front')){
          if(!key.toLocaleLowerCase().includes('shiny') && !key.toLocaleLowerCase().includes('femaly')  && !key.toLocaleLowerCase().includes('gray')){
            if(this.pokemonData['sprites'][key]!=null){
              sprites.push(this.pokemonData['sprites'][key])
            }
          }
        }
        if(this.pokemonData['sprites'][key] instanceof Object){
          this.getImageRe(this.pokemonData['sprites'][key]).forEach(element => {
            sprites.push(element)
          });
        }
      })
      let stringMapped = sprites.map((elemento, i)=>{
        return {source:elemento, 
        alt:'Imagem ' + i, title: 'Imagem ' + i}
      })
      return stringMapped;

    }else{
      return []
    }
  }


  getImageRe(objeto){
    let images = []
    Object.keys(objeto).forEach((chave, i)=>{
      if(chave.toLocaleLowerCase().includes('front')){
        if(!chave.toLocaleLowerCase().includes('shiny') && !chave.toLocaleLowerCase().includes('femaly')  && !chave.toLocaleLowerCase().includes('gray')){
          if(objeto[chave]!=null){
            images.push(objeto[chave])
          }
        }
      }
      if(objeto[chave] instanceof Object){
          this.getImageRe(objeto[chave]).forEach(element => {
            images.push(element)
          });
      }
    })
    return images;
  }

  async getMoves(){
    let titleCasePipe = new TitleCasePipe()
    if(this.pokemonData){
      let moves = [];
      await this.pokemonData['moves'].forEach(async element => {
        await this.apiService.getMoveDetail(element['move']['url']).then((data)=>{
          moves.push({
            'name': titleCasePipe.transform(element['move']['name'].split('-').join(' ')),
            'accuracy': data['accuracy']?(data['accuracy'] + '%'):"-",
            'power': data['power']?data['power']:"-",
            'type': data['type']['name'],
            'damage_class': data['damage_class']['name'],
            'pp': data['pp']
          })
        })
      });
      return moves;
    }
  }

}
