import { Sprite } from './library/interfaces/sprite.interface';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pokemon } from './library/interfaces/pokemon.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-list';
  
  public lista: Pokemon[] 
  sprites: Sprite[] =[]

  constructor(private http: HttpClient){}
  ngOnInit(){
    this.GetPokeList()
    this.ExtractPokemon()
  }
  
  GetPokeList(){
    return this.http.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
  }

  async ExtractPokemon(){

    await this.GetPokeList().subscribe((res:any) => 
    {
      this.lista = res.results as Pokemon[]
      this.lista.forEach(pokemon => {
        this.http.get(pokemon.url).subscribe((res:any) =>
        {
          this.sprites.push({nombre: pokemon["name"] ,sprite: res.sprites.other.dream_world.front_default})
        })
      });
    })
  }
}
