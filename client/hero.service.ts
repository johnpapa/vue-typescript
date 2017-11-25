import axios from 'axios';

import { Hero } from './hero';

const api = 'api';

class HeroService {
  constructor() {
    console.log('creating new instance of hero.service');
  }

  deleteHero(hero: Hero) {
    return axios.delete(`${api}/hero/${hero.id}`);
  }
  getHeroes() {
    return axios.get<Hero[]>(`${api}/heroes`);
  }
  addHero(hero: Hero) {
    return axios.post(`${api}/hero/`, { hero });
  }
  updateHero(hero: Hero) {
    return axios.put(`${api}/hero/${hero.id}`, { hero });
  }
}

// Export a singleton instance in the global namespace
export const heroService = new HeroService();
