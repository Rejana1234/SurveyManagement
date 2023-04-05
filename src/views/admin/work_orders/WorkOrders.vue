<template>
  <div id="work_order">
    <loader :object="styling.objectcolor"
            :color1="styling.animationcolor"
            :color2="styling.animationcolor2"
            :size="styling.size"
            :speed="styling.speed"
            :bg="styling.bgcolor"
            :objectbg="styling.objectbg"
            :opacity="styling.opacity"
            :name="selected"
            :disableScrolling="styling.disableScrolling"></loader>
    <div class="card">
      <h2>File List</h2>
      <div class="flex-container-flex-end">
        <div class="flex-item">
          <select
            class="classic"
            name="work_order_status"
            id="global_select"
            v-model="filterWorkOrderData.work_order_status"
            @change="getAllW_Orders()"
          >
            <option value="" selected disabled>Select Status</option>
            <option value="3">All Files</option>
            <option value="0">All New Files</option>
            <option value="2">All Ongoing Files</option>
            <option value="1">All Completed Files</option>
          </select>
        </div>
        <div class="flex-item">
          <input type="date" name="start_date" v-model="filterWorkOrderData.start_date" value="" />
        </div>
        <div class="flex-item">
          <input type="date" name="end_date" v-model="filterWorkOrderData.end_date" value="" />
        </div>
        <div class="flex-item">
          <button class="btn0" @click="getAllW_Orders()">Filter</button>
        </div>
        <div class="flex-item" v-if="user_role_id < 4">
          <router-link to="add_workorders">
            <button type="button" class="btn">
              <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add New
            </button>
          </router-link>
        </div>
      </div>

      <!-- <div class="flex-container" style="justify-content: flex-end">
        <router-link to="add_workorders">
          <button type="button" class="add_new">
            <span class="material-icons-sharp add" style="font-size: 11px"
              >add</span
            >Add New
          </button>
        </router-link>
      </div> -->

      <div class="flex-container mobile-flex-container">
        <div class="flex-item">
          Show:
          <select
            name="cars"
            class="entries_count"
            id="cars"
            style="appearance: auto; height: 68%"
            v-model="tableData.length"
            @change="getAllW_Orders()"
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
            @input="getAllW_Orders()"
            placeholder="Search here"
            class="search"
          />
        </div>
      </div>

      <div>
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="w_orders.length" v-for="w_order in w_orders" :key="w_order.id">
              <!-- <td data-label="#Sl" style="text-align: center">
                {{ w_order.id }}
              </td> -->
              <td data-label="IML File Ref No." style="text-align: center" v-if="w_order.iml_reference_no">
                {{ w_order.iml_reference_no }}
              </td>
              <td data-label="IML File Ref No." style="text-align: center" v-else>--</td>
              <td
                data-label="Survey Firm’s File Ref no."
                style="text-align: center"
                v-if="w_order.survey_firm_reference_no"
              >
                {{ w_order.survey_firm_reference_no }}
              </td>
              <td data-label="Survey Firm’s File Ref no." style="text-align: center" v-else>--</td>
              <td data-label="Vessel Name" style="text-align: center" v-if="w_order.vessel_name">
                {{ w_order.vessel_name }}
              </td>
              <td data-label="Name of the vessel/ship" style="text-align: center" v-else>--</td>
              <td data-label="File opening date" style="text-align: center" v-if="w_order.file_opening_date">
                {{ w_order.file_opening_date }}<br />
              </td>
              <td data-label="File opening date" style="text-align: center" v-else>--</td>
              <td
                data-label="Club’s/Client’s File Ref no."
                style="text-align: center"
                v-if="w_order.club_file_reference_no"
              >
                {{ w_order.club_file_reference_no }}
              </td>
              <td data-label="Club’s/Client’s File Ref no." style="text-align: center" v-else>--</td>
              <!-- <td data-label="Port Name" style="text-align: center">
                {{ w_order.eta_port_name }}
              </td> -->
              <td data-label="Status" style="text-align: center" v-if="w_order.status == 0">
                <p class="chips2">Not Started</p>
              </td>
              <td data-label="Status" style="text-align: center" v-if="w_order.status == 2">
                <p class="chips1">Inprogress</p>
              </td>
              <td data-label="Status" style="text-align: center" v-if="w_order.status == 1">
                <p class="chips">Completed</p>
              </td>
              <td data-label="Actions" style="text-align: center">
                <div class="dropdown">
                  <button class="dropbtn" type="button">
                    <span class="material-icons-sharp"> more_horiz </span>
                  </button>
                  <div class="dropdown-content">
                    <router-link :to="`/dashboard/edit_workorders/${w_order.id}`">
                      <button v-if="user_role_id < 4" title="Edit File" type="button" class="actio-button-margin edit">
                        <span class="material-icons-sharp add" style="font-size: 11px">edit</span>
                        Edit
                      </button>
                    </router-link>
                    <button
                      v-if="user_role_id < 4"
                      title="Delete File"
                      type="button"
                      class="actio-button-margin delete"
                      v-on:click="confirmDelete(w_order)"
                    >
                      <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                      Delete
                    </button>
                    <!-- <button v-else></button> -->
                    <router-link :to="`/dashboard/workorders/details/${w_order.id}`">
                      <button title="Manage File" type="button" class="actio-button-margin add1">
                        <span class="material-icons-sharp add" style="font-size: 11px">add</span>
                        More
                      </button>
                    </router-link>
                    <router-link :to="`/dashboard/workorders_details/${w_order.id}`">
                      <button title="File Details" type="button" class="actio-button-margin survey">
                        <span class="material-icons-sharp add" style="font-size: 11px">details</span>
                        Details
                      </button>
                    </router-link>
                    <button
                      title="Download File"
                      type="button"
                      class="actio-button-margin download"
                      v-on:click="fileDownload( w_order.id)"
                    >
                    Download
                    </button>
                    <button
                      v-if="user_role_id < 4"
                      title="Forced closed"
                      type="button"
                      class="actio-button-margin close"
                      v-on:click="confirmForced(w_order)"
                    >
                      <span class="material-icons-sharp" style="font-size: 11px">close</span>Close
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-show="!w_orders.length">
              <td colspan="8">No Data Found</td>
            </tr>
          </tbody>
        </datatable>
      </div>
      <div class="mobile-pagination">
        <div class="flex-container-pagination" style="padding-right: 10px">
          <div class="flex-item">
            Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} records
          </div>
          <div style="display: flex; justify-content: flex-end">
            <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllW_Orders()"></pagination>
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
import { http, downloadPdf } from "../../../service/http_service";
export default {
  name: "InterportW_Orders",
  title: "Inter-Port - Work_Orders",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let apiUrl = this.$store.state.apiUrl;
    let sortOrders = {};
    let columns = [
      // { label: "#Sl", name: "id" },
      { label: "IML File Ref No.", name: "iml_reference_no" },
      { label: "Survey Firm’s File Ref no.", name: "survey_firm_reference_no" },
      { label: "Vessel Name", name: "vessel_name" },
      { label: "File Opening Date", name: "file_opening_date" },
      { label: "Club’s/Client’s File Ref no.", name: "club_file_reference_no" },
      // { label: "Port Name", name: "eta_port_name" },
      { label: "Status", name: "status" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      download_file_url: apiUrl + "v1/download/file_summery/",
      user_Info: JSON.parse(localStorage.getItem("user")),
      user_reference: JSON.parse(localStorage.getItem("user_reference")),
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
      // user_role: "",
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
      selected: '',
      value: 2,
      styling: {
        objectcolor: '#ff9633',
        animationcolor: '#ffffff',
        animationcolor2: '#17fd3d',
        objectbg: '#999793',
        opacity: 80,
        bgcolor: '#343a40',
        size: 5,
        speed: 2,
        disableScrolling: true,
      },
      code: ``,
      flag: false
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.w_order.success_message,
    }),
  },

  mounted() {
    this.getAllW_Orders();
    // this.user_role = this.user_Info["model_has_role"]["roles"]["name"];
    console.log("user_role: " + this.user_role);
    console.log("user_reference: " + this.user_reference);
    console.log("user_role_id: " + this.user_role_id);
    this.flag=true;
  },

  methods: {
    loader(loader) {
      this.selected=loader;
      this.code=`<loader object="${this.styling.objectcolor}" color1="${this.styling.animationcolor}" color2="${this.styling.animationcolor2}" size="${this.styling.size}" speed="${this.styling.speed}" bg="${this.styling.bgcolor}" objectbg="${this.styling.objectbg}" opacity="${this.styling.opacity}" disableScrolling="${this.styling.disableScrolling}" name="${this.selected}"></loader>`
      const body = document.getElementsByTagName("html")[0];
      body.classList.add("overflow-hidden");
      setTimeout(() => {
        this.selected='';
        const body = document.getElementsByTagName("html")[0];
        body.classList.remove("overflow-hidden");
      }, this.value*1000);
    },

    getAllW_Orders() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      params.append("work_order_status", this.filterWorkOrderData.work_order_status);
      params.append("work_order_id", this.filterWorkOrderData.work_order_id);
      params.append("start_date", this.filterWorkOrderData.start_date);
      params.append("end_date", this.filterWorkOrderData.end_date);

      return http()
        .get("v1/work_orders/getData?" + params)
        .then((response) => {
          this.loader('circular');
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

    confirmDelete(work_order_details) {
      let work_order_id = work_order_details.id;
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
            console.log(work_order_id);
            this.deleteW_Orders(work_order_id);
          }
        });
    },
    fileDownload(id) {
      let url = this.download_file_url + id;
      downloadPdf(url);
    },
    confirmForced(work_order_details) {
      let work_order_id = work_order_details.id;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to recollect this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(work_order_id);
            this.deleteForcefullyW_Orders(work_order_id);
          }
        });
    },

    deleteW_Orders: async function (id) {
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
    deleteForcefullyW_Orders: async function (id) {
      try {
        return http()
          .post("v1/work_orders/forced_close/" + id)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        // this.getAllW_Orders();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#work_order {
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
  background-color: rgb(102 102 229);
}
.add1 {
  background-color: rgb(68 192 81);
}

button {
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #2185d0;
}
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
th,
td {
  padding: 21px;
}
.close {
  color: rgb(255, 255, 255);
  background-color: rgb(157, 61, 61);
}
.btn0 {
  height: 42px;
  width: 100px;
  background-color: rgb(154 205 89 / 91%);
  font-size: 16px;
  margin-left: 8%;
  color: rgb(238 239 240);
  font-weight: 600;
}
.btn0:hover {
  background-color: rgba(126, 184, 51, 0.91);
}
.btn:hover {
  background-color:  #008CBA;
}
.btn {
  height: 41px;
  width: 100px;
  background-color: #1367A2;
  margin-right: 0%;
  color: rgb(238 239 240);
  font-weight: 600;
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
}

.dropdown-content button {
  margin: 5px 4px 5px 8px;
  width: 70%;
}

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
/* .dropdown-content button {
  width:70%
} */
input[type="date"] {
  width: 110%;
  height: 41px;
}
input[type="text"] {
  width: 104%;
  /* height: 44px; */
}

h1 {
  font-size: 1.3rem;
}
.download{
  background-color: #349437;
}
</style>
