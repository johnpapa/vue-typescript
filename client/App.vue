<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="header-bar"></div>
    <HeroList></HeroList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HeroList from './components/HeroList.vue';

@Component({
  components: { HeroList }
})
export default class App extends Vue {
  title: string;

  constructor() {
    super();
    this.title = 'My Vue and CosmosDB Heroes App';
  }
}
</script>

<style lang="scss">
body,
input[text],
button {
  color: #888;
  font-family: Arial;
}
button {
  color: #888;
  font-family: Arial;
  font-size: 14px;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  &:hover {
    background-color: #cfd8dc;
  }
}
body {
  margin: 2em;
}
div {
  margin: 0.1em;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
