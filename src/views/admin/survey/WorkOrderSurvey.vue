<template>
  <div class="card">
    <h2>Survey List</h2>
    <!-- {{ survey_appointment }} -->
    <div>
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

      <div style="padding: 10px 10px">
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="surveys.length" v-for="survey in surveys" :key="survey.id">
              <!-- <td data-label="#SL" style="text-align: center">
                {{ survey.id }}
              </td> -->
              <td data-label="#Ref" style="text-align: center">
                {{ survey.reference_no }}
              </td>
              <td data-label="Work Order" style="text-align: center">
                {{ survey.project_name }}
              </td>

              <td data-label="Category" style="text-align: center">
                {{ survey.category_name }}
              </td>
              <td data-label="Surveyor Name" style="text-align: center">
                <div v-for="sa in survey.survey_appointment" :key="sa.id">
                  {{ sa.surveyor.name }}
                </div>
              </td>

              <td data-label="Status" style="text-align: center" class="chips2" v-if="survey.status == 0">
                Not Assigned
              </td>
              <td data-label="Status" style="text-align: center" class="chips3" v-if="survey.status == 2">Assigned</td>
              <td data-label="Status" style="text-align: center" class="chips1" v-if="survey.status == 3">Pending</td>
              <td
                data-label="Status"
                style="text-align: center"
                class="chips"
                v-if="survey.edit_request == 1 && survey.status == 1"
              >
                Completed
                <span class="material-icons-sharp badge"> new_releases </span>
              </td>
              <td data-label="Status" style="text-align: center" class="chips" v-else-if="survey.status == 1">
                Completed
              </td>
              <td data-label="Action" style="text-align: center" v-if="user_role_id < 4">
                <div class="dropdown">
                  <button class="dropbtn" type="button">
                    <span class="material-icons-sharp"> more_horiz </span>
                    <span v-if="survey.has_new_dd_report == 1" class="badge"></span>
                  </button>
                  <div class="dropdown-content">
                    <router-link :to="`/dashboard/edit_survey/${survey.id}`">
                      <button
                        title="Edit Survey"
                        type="button"
                        class="actio-button-margin edit"
                        v-if="survey.status == 0"
                      >
                        <span class="material-icons-sharp edit" style="font-size: 11px">edit</span>
                        Edit
                      </button>
                    </router-link>
                    <!-- <button v-else hidden>hide</button> -->

                    <button
                      title="Delete Survey"
                      type="button"
                      class="actio-button-margin delete"
                      v-on:click="confirmDelete(survey)"
                    >
                      <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                      Delete
                    </button>
                    <router-link :to="`/dashboard/survey/add_surveyorappoint/${survey.id}`">
                      <button
                        title="Appoint Surveyor"
                        type="button"
                        class="actio-button-margin appoint"
                        v-if="survey.status == 0"
                      >
                        Appoint
                      </button>
                    </router-link>
                    <!-- <button v-else hidden></button> -->
                    <!-- <button
                      type="button"
                      class="actio-button-margin download"
                      v-if="survey.status == 1"
                    >
                      <a
                        :href="download_survey_url + survey.id"
                        target="_blank"
                      >
                        <span
                          class="material-icons-sharp add"
                          style="font-size: 11px"
                          >download</span
                        >
                        Download
                      </a>
                    </button> -->

                    <router-link :to="`/dashboard/survey/${survey.id}`">
                      <button title="See Reports" type="button" class="actio-button-margin download">
                        <span class="material-icons-sharp add" style="font-size: 11px">arrow_forward</span>
                        Reports
                      </button>
                    </router-link>
                  </div>
                </div>
              </td>
              <td data-label="Action" style="text-align: center" v-else>--</td>
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
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "InterportSurvey",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  props: ["work_order_id"],

  data() {
    let sortOrders = {};
    let columns = [
      // { label: "#SL", name: "id" },
      { label: "#Ref", name: "reference_no" },
      { label: "Vessel Name", name: "project_name" },
      // { label: "Start Date", name: "start_date" },
      // { label: "End Date", name: "end_date" },
      { label: "Category", name: "category_name" },
      { label: "Surveyor Name", name: "surveyor_name" },
      { label: "Status", name: "status" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    let apiUrl = this.$store.state.apiUrl;
    return {
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
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
      filterWorkOrderSurveyData: {
        survey_id: "",
      },
      report_page_url: "http://localhost:8080/dashboard/report",
      download_survey_url: apiUrl + "v1/surveys/download_survey/",
      active: false,
      isopen: "",
      isShowDrop1: false,
    };
  },

  computed: {
    ...mapState({
      survey_appointment: (state) => state.survey.survey_appointment,
      message: (state) => state.survey.success_message,
    }),
  },

  mounted() {
    this.getAllSurvey();
  },

  methods: {
    toggleDropdown(index) {
      let id = index;
      if (id) {
        this.isShowDrop1 = !this.isShowDrop1;
      }
    },
    getAllSurvey() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/surveys/work_order_id/" + this.$route.params.id + "/getData?" + params)
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
            this.deleteSurvey(survey_id);
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
input[type="text"] {
  width: 100%;
}
.column_direction {
  flex-direction: row;
}
.badge {
  margin-top: -25px;
  font-size: 15px;
  color: red;
}
.download {
  background-color: #276129;
}
.download:hover {
  background-color: #378a3a;
}
.details {
  background-color: rgb(60, 60, 247);
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

button {
  width: fit-content;
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  /* margin-top: 2%; */
}

.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 0;
}
.chips {
  width: 47%;
  margin-left: 55px;
}

.chips1 {
  width: 50%;
  margin-left: 55px;
}
.chips3 {
  width: 50%;
  margin-left: 55px;
}
.chips2 {
  width: 50%;
  margin-left: 55px;
  line-height: 9px;
}
.appoint {
  padding: 5px;
  background-color: rgb(31, 182, 20);
  border: 1px solid rgb(31, 182, 20);
}

.badge {
  margin-top: -25px;
  font-size: 15px;
  color: red;
}
/* .download {
  background-color: #3e8e41;
} */
.details {
  background-color: rgb(60, 60, 247);
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

button {
  width: fit-content;
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  /* margin-top: 2%; */
}

.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 0;
}
.chips {
  width: 47%;
  margin-left: 55px;
}

.chips1 {
  width: 50%;
  margin-left: 55px;
}
.chips3 {
  width: 50%;
  margin-left: 55px;
}
.chips2 {
  width: 50%;
  margin-left: 55px;
  line-height: 9px;
}
.appoint {
  background-color: rgb(31, 182, 20);
  border: 1px solid rgb(31, 182, 20);
}

/* Dropdown Button */
.dropbtn {
  background-color: #f7f5f5;
  color: #020202;
  padding: 5px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 10px;
  width: 80%;
}
.dropdown-content button {
  /* padding: 5px 5px; */
  margin: 5px 2px 5px 2px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 1%;
  width: 66%;
}
/* .dropdown-content button {
  
} */

.active {
  opacity: 2;
  pointer-events: visible;
  top: 100%;
  display: none;
  z-index: 1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 30px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
  margin-left: 54px;
}

label:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 20px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}
input:checked + label {
  background: #bada55;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  /* border-radius: 6px; */
  margin-right: 0;
}
.dropdown .badge {
  position: absolute;
  top: 24px;
  right: 63px;
  padding: 4px 4px;
  border-radius: 50%;
  background: red;
  color: white;
}
h1 {
  font-size: 1.3rem;
}
select {
  height: 30px
}
</style>
