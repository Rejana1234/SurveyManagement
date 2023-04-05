<template>
  <div id="summary_report">
    <div class="card">
      <div class="flex-container">
        <h2 style="margin-left: 10px; line-height: 40px">Summary Report Lists</h2>
        <!-- <router-link :to="`dashboard/survey/add_summary_report/${this.$route.params.id}`"> -->
        <div v-if="summary_reports.length > 0"></div>
        <button v-else type="button" class="add_new" @click="add_summary">
          <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add New
        </button>
        <!-- </router-link> -->
      </div>

      <div class="flex-container">
        <div class="flex-item">
          Show:
          <select name="cars" class="entries_count" id="cars" style="appearance: auto" v-model="tableData.length"
            @change="getAllSummaryReports()">
            <option v-for="(records, index) in perPage" :key="index" :value="records">
              {{ records }}
            </option>
          </select>
          record per page.
        </div>
        <div class="flex-item">
          <input type="text" v-model="tableData.search" @input="getAllSummaryReports()" placeholder="Search here"
            class="search" />
        </div>
      </div>

      <div style="padding: 10px 10px; overflow-x: auto">
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="summary_reports.length" v-for="sr in summary_reports" :key="sr.id">
              <!-- <td data-label="#Sl" style="text-align: center">{{ sr.id }}</td> -->
              <td data-label="Signature" style="text-align: center">
                <div v-for="signature in signatures" :key="signature.id">
                  <p v-if="sr.signature == signature.id">
                    {{ signature.name }}
                  </p>
                </div>
              </td>
              <td data-label="Reference No" style="text-align: center">{{ sr.reference_no }}</td>
              <td data-label="Remaining packages" style="text-align: center">{{ sr.condition_of_remaining_packages.substring(0,25) }}</td>
              <td data-label="Note" style="text-align: center">{{ sr.note.substring(0,25) }}</td>
              <td data-label="Remarks" style="text-align: center">{{ sr.remarks.substring(0,25) }}</td>
              <td data-label="Actin" style="text-align: center">
                
                <button type="button" class="actio-button-margin edit" title="Edit Report" @click="edit_summary(sr.id)">
                  <span class="material-icons-sharp add" style="font-size: 11px">edit</span>
                </button>
                
                <button title="Delete Report" type="button" class="actio-button-margin delete"
                  v-on:click="deleteSUmmaryReport(sr.id)">
                  <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                </button>
              </td>
            </tr>

            <tr v-show="!summary_reports.length">
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
            <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllSummaryReports()"></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import Datatable from '@/components/datatable/Datatable.vue';
    import Pagination from '@/components/datatable/Pagination.vue';

    import { http } from '@/service/http_service';

    import { mapState } from 'vuex';

    export default {
      name: "InterportSummaryReport",
      title: "Interport - Summary Report",

      components: {
        datatable: Datatable,
        pagination: Pagination
      },

      data() {
        let sortOrders = {};

        let columns = [
          // { label: "#Sl", name: "id" },
          { label: "Signature", name: "signature" },
          { label: "Reference No", name: "reference_no" },
          { label: "Remaining packages", name: "condition_of_remaining_packages" },
          { label: "Note", name: "note" },
          { label: "Remarks", name: "remarks" },
          { label: "Action", name: "action" },
        ];
        columns.forEach((column) => {
          sortOrders[column.name] = -1;
        });

        return {
          summary_reports: [],
          signatures: [],
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
        }
      },

      computed: {
        ...mapState({
          message: state => state.summary_report.success_message
        })
      },

      mounted() {
        this.getAllSummaryReports();
      },

      methods: {
        getAllSummaryReports: function () {
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
            .get("v1/summary_report/getData?" + params)
            .then((response) => {
              this.summary_reports = response.data.data.data;
              this.pagination = response.data.data;
              this.signatures = response.data.signature;
              console.log(this.signatures);
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
          this.getAllSummaryReports();
        },

        getIndex(array, key, value) {
          return array.findIndex((i) => i[key] == value);
        },

        deleteSUmmaryReport: async function (id) {
          try {
            await this.$store.dispatch('summary_report/delete_summary_report', id).then(() => {
              this.$swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: this.message,
                showConfirmButton: false,
                timer: 1500,
              });

              this.getAllSummaryReports();
            });
          } catch (error) {
            console.log(error);
          }
        },

        add_summary() {
          this.$router.push('/dashboard/add_summary_report/' + this.$route.params.id);
        },

        edit_summary(id) {
          this.$router.push('/dashboard/edit_summary_report/' + this.$route.params.id + '/' + id);
        }
      }
    }
</script>
<style scoped>
input[type='text']{
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