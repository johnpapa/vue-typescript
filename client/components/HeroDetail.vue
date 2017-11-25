<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingHero" type="number" v-model="editingHero.id" ref="id" placeholder="id" />
          <label v-if="!addingHero" class="value">{{editingHero.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingHero.name" ref="name" placeholder="name" />
        </div>
        <div>
          <label>saying: </label>
          <input v-model="editingHero.saying" placeholder="saying" @keyup.enter="save"/>
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';

import { Hero } from '../hero';

@Component({})
export default class HeroDetail extends Vue {
  @Prop({default: null}) hero: Hero | null;
  addingHero = !this.hero;
  editingHero: Hero | null = null;

  @Watch('hero') onHeroChanged(value: string, oldValue: string) {
    this.editingHero = this.cloneIt();
  }

  $refs: {
    id: HTMLElement;
    name: HTMLElement;
  };

  addHero() {
    const hero = <Hero>this.editingHero;
    this.emitRefresh('add', hero);
  }

  @Emit('unselect') clear() {
    this.editingHero = null;
  }

  cloneIt() {
    return Object.assign({}, this.hero);
  }

  created() {
    this.editingHero = this.cloneIt();
  }

  @Emit('heroChanged') emitRefresh(mode: string, hero: Hero) {
    this.clear();
  }

  mounted() {
    if (this.addingHero && this.editingHero) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
  }

  save() {
    if (this.addingHero) {
      this.addHero();
    } else {
      this.updateHero();
    }
  }

  updateHero() {
    const hero = <Hero>this.editingHero;
    this.emitRefresh('update', hero);
  }
}
</script>

<style lang="scss" scoped>
.editarea {
  float: left;
  input {
    margin: 4px;
    height: 20px;
    color: rgb(0, 120, 215);
  }
  button {
    margin: 8px;
  }
  .editfields {
    margin-left: 12px;
  }
}
</style>
