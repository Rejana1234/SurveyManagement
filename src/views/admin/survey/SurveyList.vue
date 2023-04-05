<template>
  <div class="card">
    <h1>Surveys</h1>
    <div class="flex-container" style="justify-content: flex-end"></div>
    <div class="flex-container-flex-end">
      <div class="flex-item">
        <input
          type="number"
          placeholder="Work Order ID"
          name="work_order_id"
          v-model="filterSurveyData.work_order_id"
          value=""
        />
      </div>
      <div class="flex-item">
        <select
          id="surveyor_id"
          name="surveyor_id"
          class="box"
          v-model="filterSurveyData.surveyor_id"
          @change="getAllSurvey()"
        >
          <option value="" selected>Select Surveyor</option>
          <option v-for="(surveyor, index) in surveyors" :key="index" :value="surveyor.id">
            {{ surveyor.name }} - (ID: {{ surveyor.id }})
          </option>
        </select>
      </div>
      <div class="flex-item">
        <select
          name="survey_status"
          id="survey_status"
          v-model="filterSurveyData.survey_status"
          @change="getAllSurvey()"
        >
          <option value="" selected disabled>Select Survey Status</option>
          <option value="3">All Survey</option>
          <option value="0">New Survey</option>
          <option value="2">Ongoing Survey</option>
          <option value="1">Completed Survey</option>
        </select>
      </div>
      <div class="flex-item">
        <input type="date" name="start_date" v-model="filterSurveyData.start_date" value="" />
      </div>
      <div class="flex-item">
        <input type="date" name="end_date" v-model="filterSurveyData.end_date" value="" />
      </div>
      <div class="flex-item">
        <button class="btn" @click="getAllSurvey()">Filter</button>
      </div>
    </div>
    <div class="flex-container">
      <div class="flex-item">
        Show:
        <select
          name="cars"
          class="entries_count"
          id="cars"
          style="appearance: auto"
          v-model="tableData.length"
          @change="getAllSurvey()"
        >
          <option v-for="(records, index) in perPage" :key="index" :value="records">
            {{ records }}
          </option>
        </select>
        records per page.
      </div>

      <div class="flex-item">
        <input
          type="text"
          v-model="tableData.search"
          @input="getAllSurvey()"
          placeholder="Search here"
          class="search"
        />
      </div>
    </div>

    <div style="padding: 10px 10px; overflow-x: auto">
      <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
        <tbody>
          <tr v-show="surveys.length" v-for="survey in surveys" :key="survey.id">
            <td data-label="#Ref" style="text-align: center">
              {{ survey.reference_no }}
            </td>
            <td data-label="Work Order" style="text-align: center">
              {{ survey.project_name }}
              <h4>({{ survey.work_order_id }})</h4>
            </td>
            <td data-label="Start Date" style="text-align: center">
              {{ survey.start_date }}
            </td>
            <td data-label="End Date" style="text-align: center">
              {{ survey.end_date }}
            </td>
            <td data-label="Surveyor Name" style="text-align: center" v-if="survey.surveyor_name">
              {{ survey.surveyor_name }}
            </td>
            <td data-label="Surveyor Name" style="text-align: center" v-else>--</td>
            <td data-label="Status" style="text-align: center" class="chips2" v-if="survey.status == 0">Not Assign</td>
            <td data-label="Status" style="text-align: center" class="chips1" v-if="survey.status == 2">In_progress</td>
            <td data-label="Status" style="text-align: center" class="chips" v-if="survey.status == 1">Completed</td>
            <td data-label="Action" style="text-align: center">
              <router-link :to="`/dashboard/edit_survey/${survey.id}`">
                <button type="button" class="actio-button-margin edit" title="Edit Survey">
                  <span class="material-icons-sharp add" style="font-size: 11px">edit</span>
                </button>
              </router-link>
              <button
                title="Delete Survey"
                type="button"
                class="actio-button-margin delete"
                v-on:click="confirmDelete(survey)"
              >
                <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
              </button>
              <router-link :to="`/dashboard/survey/add_surveyorappoint/${survey.id}`">
                <button type="button" class="actio-button-margin appoint" v-if="survey.status == 0">Appoint</button>
              </router-link>
            </td>
          </tr>
          <tr v-show="!surveys.length">
            <td colspan="6">No Data Found</td>
          </tr>
        </tbody>
      </datatable>
    </div>
    <div>
      <div class="flex-container-pagination" style="padding-right: 10px">
        <div class="flex-item">
          Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} records
        </div>
        <div style="display: flex; justify-content: flex-end">
          <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllSurvey()"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";

import { mapActions, mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "InterportSurvey",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "Survey ID", name: "reference_no" },
      { label: "Project Name ", name: "project_name" },
      { label: "Start Date", name: "start_date" },
      { label: "End Date", name: "end_date" },
      { label: "Surveyor Name", name: "surveyor_name" },
      { label: "Status", name: "status" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      surveys: [],
      columns: columns,
      sortKey: "id",
      sortOrders: sortOrders,
      perPage: ["10", "20", "30", "25", "50", "100"],
      tableData: {
        draw: 0,
        length: 10,
        search: "",
        column: 0,
        dir: "desc",
      },
      filterSurveyData: {
        survey_status: "",
        surveyor_id: "",
        surveyor_name: "",
        // surveyor_name: "ABDUL HAMID",
        // surveyor_name: "MD BIPLOB MIA",
        work_order_id: "",
        survey_id: "",
        start_date: "",
        end_date: "",
      },
      pagination: {
        last_page: "",
        current_page: 1,
        total: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
        from: "",
        to: "",
      },
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.survey.success_message,
      surveyors: (state) => state.survey.surveyors,
    }),
  },

  mounted() {
    this.getAllSurvey();
    this.getAllSurveyor();
  },

  methods: {
    ...mapActions({
      getAllSurveyor: "survey/get_all_surveyor",
    }),
    getAllSurvey() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      params.append("work_order_id", this.filterSurveyData.work_order_id);
      params.append("surveyor_id", this.filterSurveyData.surveyor_id);
      params.append("surveyor_name", this.filterSurveyData.surveyor_name);
      params.append("survey_status", this.filterSurveyData.survey_status);
      params.append("start_date", this.filterSurveyData.start_date);
      params.append("end_date", this.filterSurveyData.end_date);

      return http()
        .get("v1/surveys/getData?" + params)
        .then((response) => {
          this.surveys = response.data.data.data;
          this.pagination = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, "name", key);
      this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
      this.getAllSurvey();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(survey_details) {
      let survey_id = survey_details.id;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(survey_id);
            this.deleteW_Orders(survey_id);
          }
        });
    },

    deleteSurvey: async function (id) {
      try {
        await this.$store.dispatch("survey/delete_survey", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllSurvey();
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.flex-container-flex-end {
  display: flex;
  text-align: center;
  justify-content: flex-end;
}
#survey_status {
  border: 1px solid #aaa !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 14px !important;
}
#surveyor_id {
  border: 1px solid #aaa !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 14px !important;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

button {
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
.btn {
  height: 45px;
  width: 100px;
  background-color: orange;
  font-size: 16px;
}
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 0;
}
.chips {
  width: 40%;
  margin-left: 55px;
}

.chips1 {
  width: 40%;
  margin-left: 55px;
}
.chips2 {
  width: 42%;
  margin-left: 55px;
}
.appoint {
  background-color: rgb(31, 182, 20);
  border: 1px solid rgb(31, 182, 20);
}
</style>
