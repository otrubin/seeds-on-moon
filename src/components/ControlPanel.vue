<template>
  <div class="control-panel">
    <button class="btn btn-success" @click="onAddSeed">
      Добавить вид семян
    </button>
    <button class="btn btn-primary" @click="onAddYear">Добавить год</button>

    <add-seed-type ref="AddSeedType"></add-seed-type>
    <add-year ref="AddYear"></add-year>
  </div>
</template>

<script>
import AddSeedType from "./AddSeedType.vue";
import AddYear from "./AddYear.vue";

export default {
  name: "ControlPanel",
  components: {
    AddSeedType,
    AddYear,
  },
  data() {
    return {};
  },
  methods: {
    onAddSeed() {
      this.$refs.AddSeedType.add();
    },
    onAddYear() {
      this.$refs.AddYear.add();
    },
  },
};
</script>

<style scoped>
.control-panel {
  max-width: 1000px;
  margin: 30px auto;
  padding: 30px 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
