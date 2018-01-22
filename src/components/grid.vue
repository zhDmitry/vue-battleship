<template>
<div :class="{disabled: disabled}">
  <h3> Ships available {{shipsAvailable}} </h3>
    <div class="grid">
        <div v-for="row in rows">
          <div v-for="cell in row" :key="cell.x + cell.y" :class="{ 'cell': true, owned: !!cell.ship, marked: cell.hit }" v-on:click="hit(cell)">
            ~
          </div>
        </div>
    </div>
    </div>
</template>

<script>
const propTypes = {
  namespace: String,
  disabled: Boolean
};
export default {
  name: "grid",
  props: propTypes,
  data() {
    return {};
  },
  methods: {
    hit(cell) {
      this.$emit("hit", { namespace: this.namespace, cell });
    }
  },
  computed: {
    shipsAvailable() {
      return this.$store.getters[this.namespace + "/shipsAvailable"];
    },
    rows() {
      return this.$store.state[this.namespace].elements;
    }
  }
};
</script>
<style src="./grid.css">

</style>
