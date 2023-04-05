<template>
  <div id="report">
    <div class="card">
      <h2>All Reports</h2>

      <div class="flex-container-flex-end">
        <div class="flex-item">
          <input
            type="date"
            name="start_date"
            v-model="filterWorkOrderData.start_date"
            value=""
          />
        </div>
        <div class="flex-item">
          <input
            type="date"
            name="end_date"
            v-model="filterWorkOrderData.end_date"
            value=""
          />
        </div>
        <div class="flex-item">
          <button class="btn" @click="getAllW_Orders()">Filter</button>
        </div>
      </div>

      <div class="flex-container mobile-flex-container">
        <div class="flex-item">
          Show:
          <select
            name="cars"
            class="entries_count"
            id="cars"
            style="appearance: auto"
            v-model="tableData.length"
            @change="getAllW_Orders()"
          >
            <option
              v-for="(records, index) in perPage"
              :key="index"
              :value="records"
            >
              {{ records }}
            </option>
          </select>
          records per page.
        </div>

        <div class="flex-item">
          <input
            type="text"
            v-model="tableData.search"
            @input="getAllW_Orders()"
            placeholder="Search here"
            class="search"
          />
        </div>
      </div>

      <div>
        <datatable
          :columns="columns"
          :sortKey="sortKey"
          :sortOrders="sortOrders"
          @sort="sortBy"
        >
          <tbody>
            <tr
              v-show="w_orders.length"
              v-for="w_order in w_orders"
              :key="w_order.id"
            >
              <td
                data-label="#Ref"
                style="text-align: center"
                v-if="w_order.reference_no"
              >
                {{ w_order.reference_no }}
              </td>
              <td data-label="#Ref" style="text-align: center" v-else>--</td>
              <td data-label="Client Name" style="text-align: center">
                {{ w_order.client_name }}
              </td>
              <td data-label="Work Order Date" style="text-align: center">
                {{ w_order.work_order_date }}
              </td>
              <td data-label="Project" style="text-align: center">
                {{ w_order.project_name }}<br />
              </td>
              <td data-label="Actions" style="text-align: center">
                <button
                type="button"
                class="actio-button-margin appoint"
              >
                <a
                  :href="
                    download_report_url +
                    w_order.id
                  "
                  target="_blank"
                  ><span
                    class="material-icons-sharp add"
                    style="font-size: 11px"
                    >download</span
                  >
                </a>
              </button>
              </td>
            </tr>
          </tbody>
          <tbody v-show="!w_orders.length">
            <h1>No Data Found</h1>
          </tbody>
        </datatable>
      </div>

      <div class="mobile-pagination">
        <div class="flex-container-pagination" style="padding-right: 10px">
          <div class="flex-item">
            Showing {{ pagination.from }} to {{ pagination.to }} of
            {{ pagination.total }} records
          </div>
          <div style="display: flex; justify-content: flex-end">
            <pagination
              :pagination.sync="pagination"
              :offset="5"
              @paginate="getAllW_Orders()"
            ></pagination>
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
  name: "InterportW_Orders",
  title: "Inter-Port - Work_Orders",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "Report no.", name: "reference_no" },
      { label: "Type of Report", name: "client_name" },
      { label: "Report Status", name: "work_order_date" },
      // { label: "Project", name: "project_name" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    let apiUrl = this.$store.state.apiUrl;
    return {
      w_orders: [],
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
      filterWorkOrderData: {
        work_order_status: "",
        work_order_id: "",
        start_date: "",
        end_date: "",
      },
      download_report_url:apiUrl + "v1/work_orders/download_report/"
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.w_order.success_message,
    }),
  },

  mounted() {
    this.getAllW_Orders();
  },

  methods: {
    getAllW_Orders() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      params.append(
        "work_order_status",
        this.filterWorkOrderData.work_order_status
      );
      params.append("work_order_id", this.filterWorkOrderData.work_order_id);
      params.append("start_date", this.filterWorkOrderData.start_date);
      params.append("end_date", this.filterWorkOrderData.end_date);

      return http()
        .get("v1/work_orders/download_report/getData?" + params)
        .then((response) => {
          this.w_orders = response.data.data.data;
          this.pagination = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showImage(img) {
      let server_Path = this.$store.state.serverPath;
      return server_Path + "/storage/uploads/work_orders/image/" + img;
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, "c_f_name", key);
      this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
      this.getAllW_Orders();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    deleteW_Orders: async function (w_order) {
      let id = w_order.id;

      try {
        await this.$store.dispatch("w_order/delete_w_order", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllW_Orders();
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#report {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.flex-container-flex-end {
  display: flex;
  text-align: center;
  justify-content: flex-end;
}
#work_order_status {
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

.survey {
  background-color: rgb(60, 60, 247);
}

button {
  padding: 5px 5px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  outline: none;
  border: none;
  cursor: pointer;
}
/* .btn {
  height: 45px;
  width: 100px;
  background-color: rgba(194, 244, 128, 0.819);
  font-size: 16px;
} */

.chips {
  width: 56%;
  margin-top: 5px;
  margin-left: 31px;
  margin-right: 24px;
}
.chips1 {
  width: 56%;
  margin-top: 5px;
  margin-left: 31px;
  margin-right: 24px;
}
.chips2 {
  width: 56%;
  margin-top: 5px;
  margin-left: 31px;
  margin-right: 24px;
}
.btn {
  height: 38px;
  width: 90px;
  background-color: rgb(154 205 89 / 91%);
  font-size: 16px;
  margin-right: 0%;
  color: rgb(15, 15, 15);
  font-weight: 600;
}
.btn:hover {
  background-color: rgba(126, 184, 51, 0.91);
}
th,
td {
  padding: 21px;
}
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  /* border-radius: 6px; */
  margin-right: 0;
}
input[type="text"] {
  width: 104%;
}
input[type="date"] {
  width: 100%;
  height: 38px;
}
h1 {
  font-size: 1.3rem;
}
</style>
