<template>
  <div id="app">
    <chart :chartConfig="chartConfig" :chartElementId="chartElementId"></chart>
    <control-panel></control-panel>
  </div>
</template>

<script>
/**
 * Компонент App - корневой компонент
 * отображает график и показывает панель управления
 */
import chartConfig from "./config/chart.config";
import appConfig from "./config/app.config";

import Chart from "./components/Chart.vue";
import ControlPanel from "./components/ControlPanel.vue";

export default {
  name: "App",
  components: {
    Chart,
    ControlPanel,
  },
  data() {
    return {
      chartConfig: chartConfig,
      chartElementId: appConfig.chartElementId,
    };
  },
};
</script>

<style scoped></style>
