<template>
  <div id="chart">
    {{ chartConfig }}
  </div>
</template>

<script>
import Highcharts from "highcharts";
import { mapGetters } from "vuex";

export default {
  name: "Chart",
  props: {
    chartConfig: {
      type: Object,
      required: true,
    },
    chartElementId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      test: "test chart",
    };
  },
  computed: {
    ...mapGetters(["getData"]),
    chartData() {
      this.chartConfig.xAxis.categories = this.getData.categories;
      this.chartConfig.series = this.getData.series;
      return this.chartConfig;
    },
  },
  mounted() {
    Highcharts.chart(this.chartElementId, this.chartData);
  },
  watch: {
    getData(){
      Highcharts.chart(this.chartElementId, this.chartData);
    }
  },
};
</script>

<style></style>
