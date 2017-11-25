<template>
  <div>
    <div class="button-group">
      <button @click="getHeroes">Refresh</button>
      <button @click="enableAddMode" v-if="!addingHero && !selectedHero">Add</button>
    </div>
    <transition name="fade">
      <ul class="heroes" v-if="heroes && heroes.length">
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
    </transition>
    <transition name="fade">
    <HeroDetail
      v-if="selectedHero || addingHero"
      :hero="selectedHero"
      @unselect="unselect"
      @heroChanged="heroChanged"></HeroDetail>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import HeroDetail from './HeroDetail.vue';
import { heroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  components: { HeroDetail }
})
export default class HeroList extends Vue {
  addingHero = false;
  selectedHero: Hero | null = null;
  heroes: Hero[] = [];

  created() {
    this.getHeroes();
  }

  deleteHero(hero: Hero) {
    return heroService.deleteHero(hero).then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroes = [];
    this.selectedHero = null;
    return heroService.getHeroes().then(response => (this.heroes = response.data));
  }

  heroChanged(mode: string, hero: Hero) {
    console.log('hero changed', hero);
    if (mode === 'add') {
      heroService.addHero(hero).then(() => this.heroes.push(hero));
    } else {
      heroService.updateHero(hero).then(() => {
        let index = this.heroes.findIndex(h => hero.id === h.id);
        this.heroes.splice(index, 1, hero);
      });
    }
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
  
  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}
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
    margin: 5px 2.3px;
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
