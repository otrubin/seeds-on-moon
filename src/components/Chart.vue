<template>
  <div id="chart"></div>
</template>

<script>
/**
 * Компонент Chart отвечает непосредственно за отрисовку графика
 */

import Highcharts from "highcharts";
import { mapGetters } from "vuex";

export default {
  name: "Chart",
  props: {
    /* Конфиг для отрисовки графика в Highcharts */
    chartConfig: {
      type: Object,
      required: true,
    },
    /* Идентификатор html-елемента для отрисовки графика */
    chartElementId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getData"]),

    /* Формируем данные для передачи в метод отрисовки графика Highcharts.chart() */
    chartData() {
      this.chartConfig.xAxis.categories = this.getData.categories;
      this.chartConfig.series = this.getData.series;
      return this.chartConfig;
    },
  },
  mounted() {
    /* Первоначальная отрисовка графика */
    Highcharts.chart(this.chartElementId, this.chartData);
  },
  watch: {
    /* Перерисовка графика при изменении данных в vuex */
    getData() {
      Highcharts.chart(this.chartElementId, this.chartData);
    },
  },
};
</script>

<style></style>
