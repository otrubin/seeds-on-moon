/**
 * Кофиг для передачи в Highcharts.chart()
 */

export default {
  chart: {
    type: "area",
  },
  title: {
    text: "Урожайность семян на луне",
  },
  subtitle: {
    text: 'Источник: книга "Незнайка на луне"',
  },
  xAxis: {
    categories: [], // Будет заполнено из Vuex
    tickmarkPlacement: "on",
    title: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      text: "шт./м2",
    },
    labels: {
      formatter: function() {
        return this.value;
      },
    },
  },
  tooltip: {
    split: true,
    valueSuffix: " шт./м2",
  },
  plotOptions: {
    area: {
      stacking: "normal",
      lineColor: "#666666",
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: "#666666",
      },
    },
  },
  series: [], // Будет заполнено из Vuex
};
