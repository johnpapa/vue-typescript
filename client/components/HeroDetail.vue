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
export default {
  props: {
    hero: { type: Object }
  },
  data() {
    return {
      addingHero: !this.hero,
      editingHero: this.cloneIt()
    };
  },
  watch: {
    hero() {
      this.editingHero = this.cloneIt();
    }
  },
  mounted() {
    if (this.addingHero && this.editingHero) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
  },
  methods: {
    addHero() {
      let hero = this.editingHero;
      this.emitRefresh('add');
    },
    clear() {
      this.$emit('unselect');
      this.editingHero = null;
    },
    cloneIt() {
      return Object.assign({}, this.hero);
    },
    emitRefresh(mode) {
      this.$emit('heroChanged', { mode: mode, hero: this.editingHero });
      this.clear();
    },
    save() {
      if (this.addingHero) {
        this.addHero();
      } else {
        this.updateHero();
      }
    },
    updateHero() {
      let hero = this.editingHero;
      this.emitRefresh('update');
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
