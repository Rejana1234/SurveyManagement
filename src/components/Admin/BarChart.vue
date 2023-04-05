<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {http} from "../../service/http_service";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.getAllWorkOrders();
  },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Numbers of Files",
            backgroundColor: [
              "rgba(26, 35, 126, 1)",
              "rgba(40, 53, 147, 1)",
              "rgba(48, 63, 159, 1)",
              "rgba(57, 73, 171, 1)",
              "rgba(63, 81, 181, 1)",
              "rgba(73, 91, 192, 1)",
              "rgba(85, 102, 198, 1)",
              "rgba(121, 134, 203, 1)",
              "rgba(129, 143, 213, 1)",
              "rgba(134, 147, 214, 1)",
              "rgba(148, 160, 223, 1)",
              "rgba(163, 174, 232, 1)",
            ],
            data: [],
            barThickness: 30,

            borderColor: [ "rgba(26, 35, 126, 1)"],
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    getAllWorkOrders() {
      return http()
        .get("v1/work_order/admin")
        .then((response) => {
          this.chartData.datasets[0].data = [
            response.data.work_orders.january,
            response.data.work_orders.february,
            response.data.work_orders.march,
            response.data.work_orders.april,
            response.data.work_orders.may,
            response.data.work_orders.june,
            response.data.work_orders.july,
            response.data.work_orders.august,
            response.data.work_orders.september,
            response.data.work_orders.october,
            response.data.work_orders.november,
            response.data.work_orders.december,
          ];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
