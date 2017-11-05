<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="header-bar"></div>
    <div>
      <div class="button-group">
        <button @click="getHeroes">Refresh</button>
        <button @click="enableAddMode" v-if="!addingHero">Add</button>
      </div>
      <ul class="heroes">
        <li v-for="hero in heroes" :key="hero.id"
          @click="onSelect(hero)"
          :class="{selected: hero === selectedHero}">
          <button class="delete-button" @click="deleteHero(hero)">Delete</button>
          <div class="hero-element">
            <div class="badge">{{hero.id}}</div>
            <div class="name">{{hero.name}}</div>
            <div class="saying">{{hero.saying}}</div>
          </div>
        </li>
      </ul>
    </div>
    <HeroDetail
      v-if="selectedHero || addingHero"
      :hero="selectedHero"
      @unselect="unselect"
      @refresh="getHeroes"></HeroDetail>
  </div>
</template>


<script>
import axios from 'axios';
import HeroDetail from './components/HeroDetail.vue';

export default {
  name: 'app',
  data() {
    return {
      addingHero: false,
      selectedHero: null,
      title: 'Heroes App',
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
      this.addingHero = false;
      this.selectedHero = hero;
    },
    getHeroes() {
      this.heroes = [];
      this.selectedHero = null;
      return axios
        .get(`/api/heroes`)
        .then(response => (this.heroes = response.data));
    }
  }
};
</script>

<style lang="scss">
body,
input[text],
button {
  color: #888;
  font-family: Arial;
}
body {
  margin: 2em;
}
.button-group {
  margin: 0.5em;
}
button {
  font-size: 14px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  &:hover {
    background-color: #cfd8dc;
  }
  &.delete-button {
    float: right;
    background-color: rgb(216, 59, 1);
    color: white;
    padding: 4px;
    position: relative;
    font-size: 12px;
    width: 50px;
  }
}
div {
  margin: 0.1em;
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
  li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #eee;
    margin: 0.5em;
    padding: 0.5em;
    height: 3em;
    border-radius: 4px;
    width: 17em;
    &:hover {
      color: #607d8b;
      color: rgb(0, 120, 215);
      background-color: #ddd;
      left: 0.1em;
    }
    &.selected:hover {
      /*background-color: #BBD8DC !important;*/
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
  .badge {
    float: left;
    font-size: small;
    color: white;
    padding: 0.7em 0.7em 0 0.5em;
    background-color: #607d8b;
    background-color: rgb(0, 120, 215);
    background-color: rgb(134, 183, 221);
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 3em;
    margin-right: 0.8em;
    border-radius: 4px 0 0 4px;
    width: 1.2em;
  }
}
.header-bar {
  background-color: rgb(0, 120, 215);
  height: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 4em;
  margin: 0.5em 0;
  color: #888;
  &.value {
    margin-left: 10px;
    font-size: 14px;
  }
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: 0.4em;
  &::placeholder {
    color: lightgray;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 3px;
  }
}
</style>
