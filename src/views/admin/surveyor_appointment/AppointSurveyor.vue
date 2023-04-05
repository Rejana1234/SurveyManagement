<template>
  <div class="card">
    <h2>Appointed Surveyor List</h2>

    <div class="flex-container">
      <div class="flex-item">
        Show:
        <select
          name="cars"
          class="entries_count"
          id="cars"
          style="appearance: auto"
          v-model="tableData.length"
          @change="getAllAppointedSurveyor()"
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
        Search:
        <input
          type="text"
          v-model="tableData.search"
          @input="getAllAppointedSurveyor()"
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
            v-show="appointed_surveyors.length"
            v-for="appointed_surveyor in appointed_surveyors"
            :key="appointed_surveyor.id"
          >
            <td data-label="#Sl" style="text-align: center">{{ appointed_surveyor.id }}</td>
            <td data-label="Surveyor Name" style="text-align: center">{{ appointed_surveyor.name }}</td>
            <td data-label="Survey NO"  style="text-align: center">
              {{ appointed_surveyor.survey_id }}
            </td>
            <td data-label="Start Date" style="text-align: center">
              {{ appointed_surveyor.start_date }}
            </td>
            <td data-label="End Date" style="text-align: center">
              {{ appointed_surveyor.end_date }}
            </td>
            <td data-label="Action" style="text-align: center">
              <router-link
                :to="`/dashboard/edit_surveyorappoint/${appointed_surveyor.id}`"
              >
                <button type="button" class="actio-button-margin edit">
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >edit</span
                  >
                </button>
              </router-link>
              <button
                type="button"
                class="actio-button-margin delete"
                v-on:click="deleteAppointedSurveyor(appointed_surveyor)"
              >
                <span class="material-icons-sharp add" style="font-size: 11px"
                  >delete</span
                >
              </button>
            </td>
          </tr>

          <tr v-show="!appointed_surveyors.length">
            <td>No Data Found</td>
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
            @paginate="getAllAppointedSurveyor()"
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
  name: "InterportAppointSurveyor",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    
    
    let sortOrders = {};
    let columns = [
      { label: "#Sl", name: "id" },
      { label: "Surveyor Name", name: "name" },
      { label: "Survey NO", name: "survey_id" },
      { label: "Start Date", name: "start_date" },
      { label: "End Date", name: "end_date" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      appointed_surveyors: [],
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
      message: (state) => state.appoint_surveyor.success_message,
    }),
  },

  mounted() {
    this.getAllAppointedSurveyor();
  },

  methods: {
    getAllAppointedSurveyor() {
      this.tableData.draw++;
      
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/survey_appointment/getData?" + params)
        .then((response) => {
          this.appointed_surveyors = response.data.data.data;
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
      this.getAllAppointedSurveyor();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    deleteAppointedSurveyor: async function (appointed_surveyor) {
      let id = appointed_surveyor.id;

      try {
        await this.$store
          .dispatch("appoint_surveyor/delete_appointed_surveyor", id)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllAppointedSurveyor();
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
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
.search {
    padding: 10px 20px;
    outline: none;
    border: 1px solid #ddd;
    /* border-radius: 6px; */
    margin-right: 0;
  }

  input[class="addnew"] {
  background-color: rgb(5, 88, 165);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin-left: 5px;
}

input[class="addnew"]:hover {
  background-color: rgb(44, 121, 229);
}

</style>
