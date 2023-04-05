<template>
  <div id="home">
    <loader
      :object="styling.objectcolor"
      :color1="styling.animationcolor"
      :color2="styling.animationcolor2"
      :size="styling.size"
      :speed="styling.speed"
      :bg="styling.bgcolor"
      :objectbg="styling.objectbg"
      :opacity="styling.opacity"
      :name="selected"
      :disableScrolling="styling.disableScrolling"
    ></loader>
    <div class="midddle pd-m">
      <!--Cards start-->
      <div class="cards">
        <div class="card">
          <router-link active-class="active" to="/dashboard/workorders" exact>
            <div class="top">
              <div class="left">
                <h2>Total Files</h2>
                <span class="material-icons-sharp storage">storage </span>
              </div>
            </div>

            <div class="middle">
              <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%; color: #fff">
                {{ records.total_work_order }}
              </h2>
            </div>
          </router-link>
        </div>

        <div class="card">
          <router-link active-class="active" to="/dashboard/workorders" exact>
            <div class="top">
              <div class="left">
                <h2>Completed Files</h2>
                <span class="material-icons-sharp work">work</span>
              </div>
            </div>

            <div class="middle">
              <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%; color: #fff">
                {{ records.completed_work_order }}
              </h2>
            </div>
          </router-link>
        </div>

        <div class="card">
          <router-link active-class="active" to="/dashboard/workorders" exact>
            <div class="top">
              <div class="left">
                <h2>Total Survey</h2>
                <span class="material-icons-sharp kayaking">kayaking</span>
              </div>
            </div>

            <div class="middle">
              <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%; color: #fff">
                {{ records.total_survey }}
              </h2>
            </div>
          </router-link>
        </div>

        <div class="card">
          <router-link active-class="active" to="/dashboard/workorders" exact>
            <div class="top">
              <div class="left">
                <h2>Completed Survey</h2>
                <span class="material-icons-sharp incomplete_circle1"> incomplete_circle</span>
              </div>
            </div>

            <div class="middle">
              <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%; color: #fff">
                {{ records.completed_survey }}
              </h2>
            </div>
          </router-link>
        </div>

        <div class="card">
          <div class="top">
            <div class="right">
              <h2>Total Invoice</h2>
              <span class="material-icons-sharp incomplete_circle">account_balance_wallet</span>
            </div>
          </div>

          <div class="middle">
            <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%">
              {{ invoice_info.total_invoice_amount }}
            </h2>
          </div>
        </div>

        <div class="card">
          <div class="top">
            <div class="right">
              <h2>Total Remittance</h2>
              <span class="material-icons-sharp incomplete_wallet">account_balance_wallet</span>
            </div>
          </div>

          <div class="middle">
            <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%">
              {{ invoice_info.paid_invoice_amount }}
            </h2>
          </div>
        </div>

        <div class="card">
          <div class="top">
            <div class="right">
              <h2>Outstanding Amount</h2>
              <span class="material-icons-sharp incomplete_balance">account_balance_wallet</span>
            </div>
          </div>

          <div class="middle">
            <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%">
              {{ invoice_info.due_invoice_amount }}
            </h2>
          </div>
        </div>

        <div class="card">
          <router-link active-class="active" to="/dashboard/surveyor" exact>
            <div class="top">
              <div class="right">
                <h2>Total Surveyors</h2>
                <span class="material-icons-sharp incomplete">account_balance_wallet</span>
              </div>
            </div>

            <div class="middle">
              <h2 style="margin-top: -5%; font-size: 2.5rem; margin-left: 1%; color: #fff">
                {{ records.total_surveyor }}
              </h2>
            </div>
          </router-link>
        </div>
      </div>
      <!--Cards end-->

      <!--Charts section start-->
      <div class="charts_card">
        <div class="pie_chart">
          <Doughnut
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
        </div>
        <div class="bar_chart">
          <BarChart />
        </div>
      </div>
      <!--Charts section end-->

      <!--Latest data section start-->
      <div class="latest_data_card">
        <LatestWorkOrders />
      </div>
      <!--Latest data section end-->
    </div>
  </div>
</template>

<script>
import BarChart from "../../components/Admin/BarChart.vue";
import { Doughnut } from "vue-chartjs/legacy";
import { http } from "../../service/http_service";
import LatestWorkOrders from "../../views/admin/LatestWorkOrders.vue";

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "MyHome",
  title: "InterPort - Dashboard",
  components: {
    Doughnut,
    BarChart,
    LatestWorkOrders,
    // LatestSurveyors,
    // LatestSurvey,
    // IncompleteSurveys,
  },

  props: {
    chartId: {
      type: String,
      default: "doughnut-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 365.259,
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

  data() {
    return {
      invoice_info: {},
      records: {},
      chartData: {
        labels: ["Completed Survey", "Pending Survey", "Not Assigned"],
        datasets: [
          {
            backgroundColor: [" rgba(0, 113, 101, 1)", "rgba(251, 140, 0, 1)", "rgba(218, 83, 79, 1)"],
            data: [],
            borderWidth: 1,
            borderColor: ["rgba(26, 35, 126, 1)"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // events: [],
        plugins: {
          legend: {
            position: "right",
          },
        },
        pieceLabel: {
          render: "value", //show values
        },
      },

      selected: "",
      value: 2,
      styling: {
        objectcolor: "#ff9633",
        animationcolor: "#ffffff",
        animationcolor2: "#17fd3d",
        objectbg: "#999793",
        opacity: 80,
        bgcolor: "#343a40",
        size: 5,
        speed: 2,
        disableScrolling: true,
      },
      code: ``,
      flag: false,
    };
  },
  mounted() {
    this.getAllRecords();
    this.getAllSurvey();
    this.getAllInvoice();
    this.flag = true;
  },

  methods: {
    loader(loader) {
      this.selected = loader;
      this.code = `<loader object="${this.styling.objectcolor}" color1="${this.styling.animationcolor}" color2="${this.styling.animationcolor2}" size="${this.styling.size}" speed="${this.styling.speed}" bg="${this.styling.bgcolor}" objectbg="${this.styling.objectbg}" opacity="${this.styling.opacity}" disableScrolling="${this.styling.disableScrolling}" name="${this.selected}"></loader>`;
      const body = document.getElementsByTagName("html")[0];
      body.classList.add("overflow-hidden");
      setTimeout(() => {
        this.selected = "";
        const body = document.getElementsByTagName("html")[0];
        body.classList.remove("overflow-hidden");
      }, this.value * 1000);
    },

    getAllRecords() {
      return http()
        .get("v1/records/count")
        .then((response) => {
          this.loader("circular");
          this.records = response.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllSurvey() {
      return http()
        .get("v1/survey/admin/all/all")
        .then((response) => {
          // this.result = response.data.total_survey;
          this.chartData.datasets[0].data = [
            response.data.total_survey.completed_survey,
            response.data.total_survey.pending_survey,
            response.data.total_survey.not_assign,
          ];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllInvoice() {
      return http()
        .get("v1/invoice_info")
        .then((response) => {
          console.log(this.invoice_info);
          // this.result = response.data.total_survey;
          this.invoice_info = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
/* .midddle {
  
} */
.pd-m {
  padding: 0px 3px 0px 3px;
  margin: 2px 5px 0px -10px;
}

.latest_data_card {
  margin-bottom: 20px;
}
main section.middle .cards {
  gap: 0.5rem;
}

.work {
  color: #fff;
  font-size: 55px;
  margin-left: -51px;
}
.account_circle {
  color: #fff;
  font-size: 55px;
}
.kayaking {
  color: #fff;
  font-size: 55px;
  margin-left: -15px;
}
.incomplete_circle {
  color: #fff;
  font-size: 55px;
  margin-left: -14px;
}
.incomplete_circle1 {
  color: #fff;
  font-size: 55px;
  margin-left: -76px;
}
.incomplete_balance {
  color: #fff;
  font-size: 55px;
  margin-left: -82px;
}
.incomplete_wallet {
  color: #fff;
  font-size: 55px;
  margin-left: -48px;
}
.incomplete {
  color: #fff;
  font-size: 55px;
  margin-left: -34px;
}

.storage {
  color: #fff;
  font-size: 55px;
  /* margin-left: 5rem; */
}
</style>
