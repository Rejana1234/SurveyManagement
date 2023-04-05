<template>
  <div id="other_report">
    <div class="card">
      <div class="flex-container">
        <h2 style="margin-left: 10px; line-height: 40px">Other Report Lists</h2>
        <!-- <router-link :to="`dashboard/survey/add_summary_report/${this.$route.params.id}`"> -->
        <button type="button" class="add_new" @click="add_other">
          <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add New
        </button>
        <!-- </router-link> -->
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
            @change="getAllOtherReports()"
          >
            <option v-for="(records, index) in perPage" :key="index" :value="records">
              {{ records }}
            </option>
          </select>
          record per page.
        </div>
        <div class="flex-item">
          <input
            type="text"
            v-model="tableData.search"
            @input="getAllOtherReports()"
            placeholder="Search here"
            class="search"
          />
        </div>
      </div>

      <div style="padding: 10px 10px; overflow-x: auto">
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="other_reports.length" v-for="or in other_reports" :key="or.id">
              <!-- <td data-label="#Sl" style="text-align: center">{{ or.id }}</td> -->
              <td data-label="Signature" style="text-align: center">{{ or.name }}</td>
              <td data-label="Report File" style="text-align: center">
                <p><img src="../../../../assets/pdf_icon_1.png" alt="" style="width: 80px; height: 80px" /></p>
              </td>
              <td data-label="Actin" style="text-align: center">
                <button
                  type="button"
                  class="actio-button-margin edit"
                  title="Edit Report"
                  @click="edit_other_report(or.id)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px">edit</span>
                </button>

                <button
                  title="Delete Report"
                  type="button"
                  class="actio-button-margin delete"
                  v-on:click="deleteOtherReport(or.id)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                </button>

                <button
                  title="Download"
                  type="button"
                  class="actio-button-margin download"
                  @click="downloadOtherReport(or.id)"
                >
                  <span class="material-icons-sharp download" style="font-size: 11px">download</span>
                </button>
              </td>
            </tr>

            <tr v-show="!other_reports.length">
              <td colspan="7">No Data Found</td>
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
            <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllOtherReports()"></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datatable from "@/components/datatable/Datatable.vue";
import Pagination from "@/components/datatable/Pagination.vue";

import { http } from "@/service/http_service";

import { mapState } from "vuex";

import axios from "axios";

import store from "@/store";

export default {
  name: "InterportOtherReport",
  title: "Interport - Other Report",

  components: {
    datatable: Datatable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};

    let columns = [
      // { label: "#Sl", name: "id" },
      { label: "Name", name: "name" },
      { label: "Report File", name: "report_file" },
      { label: "Action", name: "action" },
    ];

    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      other_reports: [],
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

  mounted() {
    this.getAllOtherReports();
  },

  computed: {
    ...mapState({
      message: (state) => state.other_report.success_message,
    }),
  },

  methods: {
    getAllOtherReports: function () {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);
      params.append("survey_id", this.$route.params.id);

      return http()
        .get("v1/others_report/getData?" + params)
        .then((response) => {
          this.other_reports = response.data.data.data;
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
      this.getAllOtherReports();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    deleteOtherReport: async function (id) {
      try {
        await this.$store.dispatch("other_report/delete_other_report", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getAllOtherReports();
        });
      } catch (error) {
        console.log(error);
      }
    },

    downloadOtherReport: async function (id) {
      axios({
        url: store.state.apiUrl + "v1/others_report/download/" + id,
        method: "GET",
        responseType: "blob",
        headers: {
          Accept: "application/json",
          "Content-Type": ["multipart/form-data", "application/pdf"],
          Authorization: "bearer " + store.state.token,
        },
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "other_report.pdf");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    add_other() {
      this.$router.push("/dashboard/add_other_report/" + this.$route.params.id);
    },

    edit_other_report(id) {
      this.$router.push("/dashboard/edit_other_report/" + this.$route.params.id + "/" + id);
    },
  },
};
</script>

<style scoped>
.pdf {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  background-image: url("../../../../assets/pdf_icon_1.png");
  background-repeat: no-repeat;
}

h1 {
  font-size: 1.3rem;
}

.download {
  background-color: #f27474;
  border: 1px solid #f27474;
}
input[type="text"] {
  width: 100%;
}
.add_new:hover {
  background-color: #226798;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}
.add_new:hover:after {
  opacity: 0.5;
}

.add_new:active {
  box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0, rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: 0.35s;
}

.add_new:active:after {
  opacity: 1;
}
.add_new {
  height: 27%;
  width: 118px;
  border-radius: 5px;
  background-color: #01579b;
  margin-right: 1%;
  color: rgb(238 239 240);
  font-weight: 600;
  margin-top: 0%;
  margin-left: 0%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 1px -2px, rgba(0, 0, 0, 0.14) 0 2px 2px 0, rgba(0, 0, 0, 0.12) 0 1px 5px 0;
}
</style>
