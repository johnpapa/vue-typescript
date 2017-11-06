<template>
  <div>
    <div class="button-group">
      <button @click="getHeroes">Refresh</button>
      <button @click="enableAddMode" v-if="!addingHero && !selectedHero">Add</button>
    </div>
    <ul class="heroes">
      <li v-for="hero in heroes" :key="hero.id"
        class="hero-container"
        :class="{selected: hero === selectedHero}">
        <div class="hero-element">
          <div class="badge" >{{hero.id}}</div>
          <div class="hero-text" @click="onSelect(hero)">
            <div class="name">{{hero.name}}</div>
            <div class="saying">{{hero.saying}}</div>
          </div>
        </div>
        <button class="delete-button" @click="deleteHero(hero)">Delete</button>
      </li>
    </ul>
    <HeroDetail
      v-if="selectedHero || addingHero"
      :hero="selectedHero"
      @unselect="unselect"
      @heroChanged="heroChanged"></HeroDetail>
  </div>
</template>


<script>
import axios from 'axios';
import HeroDetail from './HeroDetail.vue';

export default {
  data() {
    return {
      addingHero: false,
      selectedHero: null,
      heroes: this.getHeroes()
    };
  },
  components: {
    HeroDetail
  },
  methods: {
    unselect() {
      this.addingHero = false;
      this.selectedHero = null;
    },
    enableAddMode() {
      this.addingHero = true;
      this.selectedHero = null;
    },
    deleteHero(hero) {
      return axios.delete(`api/hero/${hero.id}`).then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
    },
    onSelect(hero) {
      this.selectedHero = hero;
    },
    heroChanged(arg) {
      const hero = arg.hero;
      console.log('hero changed', hero);
      if (arg.mode === 'add') {
        axios.post(`api/hero/`, { hero }).then(() => this.heroes.push(hero));
      } else {
        axios.put(`api/hero/${hero.id}`, { hero }).then(() => {
          let index = this.heroes.findIndex(h => hero.id === h.id);
          this.heroes.splice(index, 1, hero);
        });
      }
    },
    getHeroes() {
      this.heroes = [];
      this.selectedHero = null;
      return axios.get(`/api/heroes`).then(response => (this.heroes = response.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.button-group {
  margin: 0.5em;
}
button.delete-button {
  background-color: rgb(216, 59, 1);
  color: white;
  padding: 4px;
  position: relative;
  font-size: 12px;
  max-width: 50px;
}
.selected {
  background-color: rgb(0, 120, 215) !important;
  color: white;
}
.heroes {
  float: left;
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 20em;
  li {
    cursor: pointer;
    position: relative;
    background-color: #f7f7f7;
    margin: 0.5em;
    height: 3.2em;
    border-radius: 4px;
    &:hover {
      color: #607d8b;
      color: rgb(0, 120, 215);
      background-color: #ddd;
      left: 1px;
    }
    &.selected:hover {
      color: white;
    }
  }
  .text {
    position: relative;
    top: -3px;
  }
  .saying {
    margin: 5px 0;
  }
  .name {
    font-weight: bold;
  }
  .hero-container {
    display: flex;
    flex-flow: row wrap;
  }
  > * {
    flex: 1 100%;
  }
  .hero-element {
    display: flex;
    flex-flow: row wrap;
    flex: 18 auto;
    order: 1;
    padding: 0;
    margin: 0;
  }
  .delete-button {
    flex: 1 auto;
    order: 2;
    border-radius: 0 4px 4px 0;
  }
  .hero-text {
    flex: 1 auto;
    order: 2;
    padding: 0.2em 0.5em;
  }
  .badge {
    flex: 1 auto;
    order: 1;
    font-size: small;
    color: #ffffff;
    padding: 1.2em 1em 0em 1em;
    background-color: #607d8b;
    background-color: rgb(0, 120, 215);
    background-color: rgb(134, 183, 221);
    margin: 0em 0em 0em 0em;
    border-radius: 4px 0 0 4px;
    max-width: 1.5em;
  }
}
</style>
