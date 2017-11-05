<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingHero" v-model="editingHero.id" placeholder="id" />
          <label v-if="!addingHero" class="value">{{editingHero.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingHero.name" placeholder="name" />
        </div>
        <div>
          <label>saying: </label>
          <input v-model="editingHero.saying" placeholder="saying" />
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  name: 'herodetail',
  props: {
    // id: { type: Number },
    // name: { type: String },
    // saying: { type: String },
    hero: { type: Object },
    // addingHero: { type: Boolean }
  },
  data() {
    return {
      addingHero: !this.hero,
      editingHero: Object.assign({}, this.hero)
    };
  },
  methods: {
    save() {
      if (this.addingHero) {
        this.addHero();
      } else {
        this.updateHero();
      }
    },
    addHero() {
      let hero = this.editingHero;
      return axios.post(`api/hero/`, { hero }).then(this.emitRefresh);
    },
    updateHero() {
      let hero = this.editingHero;
      return axios.put(`api/hero/${hero.id}`, { hero }).then(this.emitRefresh);
    },
    emitRefresh() {
      this.$emit('refresh');
      this.clear();
    },
    clear() {
      this.editingHero = null;
      this.$emit('unselect');
    }
  }
};
</script>