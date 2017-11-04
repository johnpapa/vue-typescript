<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="header-bar"></div>
    <div>
      <div class="button-group">
        <button @click="clear()">Clear</button>
        <button @click="getHeroes()">Refresh</button>
      </div>
      <ul class="heroes">
        <li v-for="hero in heroes" :key="hero.id">
          <div class="hero-element">
            <div class="badge">{{hero.id}}</div>
            <div class="name">{{hero.name}}</div>
            <div class="saying">{{hero.saying}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      title: 'Heroes App',
      heroes: this.getHeroes()
    };
  },
  methods: {
    clear() {
      this.heroes = [];
    },
    getHeroes() {
      this.clear();
      return axios.get('/api/heroes').then(response => (this.heroes = response.data));
    }
  }
};
</script>

<style lang="scss">
/* You can add global styles to this file, and also import other style files */

* {
  font-family: Arial;
}
h2 {
  color: #444;
  font-weight: lighter;
}
body {
  margin: 2em;
}

.button-group {
  margin: 0.5em;
}

body,
input[text],
button {
  color: #888;
  // font-family: Cambria, Georgia;
}
button {
  font-size: 14px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  min-width: 100px;
  &:hover {
    background-color: #cfd8dc;
  }
  &.delete-button {
    float: right;
    background-color: gray !important;
    background-color: rgb(216, 59, 1) !important;
    color: white;
    padding: 4px;
    position: relative;
    font-size: 12px;
  }
}
div {
  margin: 0.1em;
}

.selected {
  background-color: #cfd8dc !important;
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
    /* display: inline-block; */
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

#toast {
  // position: absolute;
  // top: 0;
  // width: 80%;
  // margin: 0px 30px;
  // background-color: #0078d7;
  // color: white;
  // padding: 1em;
  // text-align: center;
}

.toast-container {
  /*-webkit-transition-property: opacity, bottom, left, right, width, margin, border-radius;
  transition-property: opacity, bottom, left, right, width, margin, border-radius;
  -webkit-transition-duration: 1.0s;
          transition-duration: 1.0s;
  -webkit-transition-timing-function: ease;
          transition-timing-function: ease;*/
  position: absolute;
  right: 30px;
  top: 0;
  left: 30px;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.4);
  background-color: #0078d7;
  background-color: rgb(255, 64, 129);
  z-index: 9999;
  opacity: 0;

  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
}

.toast-container > * {
  text-align: center;
}

.toast-card {
  width: 100%;
  z-index: 1;
  padding: 2px;
  position: relative;
  background-color: #f06292;
  background-color: #0078d7;
  background-color: rgb(255, 64, 129);
  text-align: center;
  color: white;
  text-transform: uppercase;
  margin: 16px;
  font-size: 16px;
}

.toast-message {
  margin: 0em 2em 0em 0em;
}

.logged-in-as {
  display: inline-block;
  font-size: 12px;
}
</style>
