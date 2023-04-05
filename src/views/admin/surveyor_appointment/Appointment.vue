<template>
  <div class="card">
    <h2>Survey List</h2>

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
          <option
            v-for="(records, index) in perPage"
            :key="index"
            :value="records"
          >
            {{ records }}
          </option>
        </select>
        record per page.
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
      <datatable
        :columns="columns"
        :sortKey="sortKey"
        :sortOrders="sortOrders"
        @sort="sortBy"
      >
        <tbody>
          <tr
            v-show="surveys.length"
            v-for="survey in surveys"
            :key="survey.id"
          >
            <td data-label="#Sl" style="text-align: center">{{ survey.id }}</td>
            <td data-label="Work order" style="text-align: center">
              {{ survey.project_name }}({{ survey.work_order_id }})
            </td>
            <td data-label="Start Date" style="text-align: center">
              {{ survey.start_date }}
            </td>
            <td data-label="End Date" style="text-align: center">
              {{ survey.end_date }}
            </td>
            <td data-label="Action" style="text-align: center">
              <router-link :to="`survey/add_surveyorappoint/${survey.id}`">
                <button type="button" class="actio-button-margin appoint">
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >add</span
                  >
                  Appoint
                </button>
              </router-link>
            </td>
          </tr>
          <tr v-show="!surveys.length">
              <td colspan="7">No Data Found</td>
            </tr>
        </tbody>
      </datatable>
    </div>

    <div>
      <div class="flex-container-pagination" style="padding-right: 10px">
        <div class="flex-item">
          Showing {{ pagination.from }} to {{ pagination.to }} of
          {{ pagination.total }} records
        </div>
        <div style="display: flex; justify-content: flex-end">
          <pagination
            :pagination.sync="pagination"
            :offset="5"
            @paginate="getAllSurvey()"
          ></pagination>
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

  data() {
    let sortOrders = {};
    let columns = [
      { label: "#Sl", name: "id" },
      { label: "Work Order", name: "project_name" },
      { label: "Start Date", name: "start_date" },
      { label: "End Date", name: "end_date" },
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
    }),
  },

  mounted() {
    this.getAllSurvey();
  },

  methods: {
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
        .get("v1/surveys/new_serveys?" + params)
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

    deleteSurvey: async function (survey) {
      let id = survey.id;

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
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

button {
  padding: 4px 4px;
  border-radius: 4px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}

.appoint {
  background-color: rgb(31, 182, 20);
  border: 1px solid rgb(31, 182, 20);
}
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  /* border-radius: 6px; */
  margin-right: 0;
}
h1 {
  font-size: 1.3rem;
}
</style>
