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

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  name: 'herodetail',
  props: {
    hero: { type: Object }
  },
  data() {
    return {
      addingHero: !this.hero,
      editingHero: null
    };
  },
  created() {
    this.editingHero = Object.assign({}, this.hero);
  },
  mounted() {
    if (this.addingHero) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
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
