<template>
 <div  class="container">
    <template v-if="!isGameEnded">
      <grid :namespace="'grid'" @hit="hit"  :disabled="this.$store.state.currentTurn !== 'grid'" ></grid>
      <grid :namespace="'opponentGrid'" @hit="hit" :disabled="this.$store.state.currentTurn !== 'opponentGrid'" ></grid>
   </template>
    <div v-if="isGameEnded">
       Game Over
       <button @click="restart">
         restart
       </button>
      </div>
  </div>
</template>

<script>
import Grid from "./grid";
export default {
  name: "home-page",
  components: { Grid },
  data() {
    return {};
  },
  methods: {
    hit(args) {
      this.$store.dispatch("hit", args);
    },
    restart() {
      this.$store.dispatch("restart");
    }
  },
  computed: {
    isGameEnded() {
      const getters = this.$store.getters;
      return (
        getters["grid/shipsAvailable"] === 0 ||
        getters["opponentGrid/shipsAvailable"] === 0
      );
    }
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
