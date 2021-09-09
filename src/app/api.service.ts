import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    getAllPokemon(){
        return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=100000`).toPromise().then(data=>{
            return data
        }).catch(error=>{
            throw Error(error)
        })
    }
    getPokemonDetail(id){
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise().then(data=>{
            return data
        }).catch(error=>{
            throw Error(error)
        })
    }
    getMoveDetail(url){
        return this.http.get(`${url}`).toPromise().then(data=>{
            return data
        }).catch(error=>{
            throw Error(error)
        })
    }
}

