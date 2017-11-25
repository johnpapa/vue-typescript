import axios from 'axios';

const api = 'api';

export default {
  deleteHero(hero) {
    return axios.delete(`${api}/hero/${hero.id}`);
  },
  getHeroes() {
    return axios.get(`${api}/heroes`);
  },
  addHero(hero) {
    return axios.post(`${api}/hero/`, { hero });
  },
  updateHero(hero) {
    return axios.put(`${api}/hero/${hero.id}`, { hero });
  }
};
