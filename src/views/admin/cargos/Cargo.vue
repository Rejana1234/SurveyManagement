<template>
  <div class="card">
    <h2>Cargo List</h2>
    <div class="flex-container" style="justify-content: flex-end"></div>
    <div class="flex-container">
      <div class="flex-item">
        Show:
        <select
          name="cars"
          class="entries_count"
          id="cars"
          style="appearance: auto"
          v-model="tableData.length"
          @change="getAllCargos()"
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
          @input="getAllCargos()"
          placeholder="Search here"
          class="search"
        />
      </div>
    </div>

    <div style="padding: 10px 10px">
      <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
        <tbody>
          <tr v-show="cargos.length" v-for="cargo in cargos" :key="cargo.id">
            <!-- <td data-label="#SL" style="text-align: center">
              {{ cargo.id }}
            </td> -->
            <td data-label="Cargo Type" style="text-align: center">
              {{ cargo.cargo_type }}
            </td>
            <td data-label="Cargo Name" style="text-align: center">
              {{ cargo.cargo_name }}
            </td>
            <td data-label="Cargo Quantity" style="text-align: center">
              {{ cargo.cargo_quantity }}
            </td>
            <td data-label="Supplier" style="text-align: center">
              {{ cargo.supplier }}
            </td>
            <td data-label="BL Date" style="text-align: center">
              {{ cargo.bl_date }}
            </td>

            <td data-label="Action" style="text-align: center" v-if="user_role_id < 4">
              <div class="dropdown">
                <button class="dropbtn" type="button">
                  <span class="material-icons-sharp"> more_horiz </span>
                </button>
                <div class="dropdown-content">
                  <router-link :to="`/dashboard/edit_cargo/${cargo.id}`">
                    <button title="Edit Cargo" type="button" class="actio-button-margin edit">
                      <span class="material-icons-sharp add" style="font-size: 11px">edit</span>Edit
                    </button>
                  </router-link>
                  <button
                    title="Delete Cargo"
                    type="button"
                    class="actio-button-margin delete"
                    v-on:click="confirmDelete(cargo)"
                  >
                    <span class="material-icons-sharp add" style="font-size: 11px">delete</span>Delete
                  </button>
                  <!-- <button type="button" class="actio-button-margin download">
                      <a :href="download_invoice_url + invoice.id" target="_blank"
                        ><span
                          class="material-icons-sharp add"
                          style="font-size: 11px"
                          >download</span
                        >
                      </a>
                    </button> -->
                </div>
              </div>

              <!-- <button
                      type="button"
                      class="actio-button-margin appoint"
                      v-if="survey.status == 0"
                      
                    >
                    <a :href="'http://localhost:8000/api/interport/v1/surveys/download/' + survey.id" target="_blank"><span class="material-icons-sharp add" style="font-size: 11px"
                        >download</span
                      >
                    </a>
                      
                    </button> -->
            </td>
            <td data-label="Action" style="text-align: center" v-else>--</td>
          </tr>
          <tr v-show="!cargos.length">
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
          <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllCargos()"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";
// import { downloadPdfInfoice } from "../../../service/http_service";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "InterportCargo",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  props: ["work_order_id"],

  data() {
    let sortOrders = {};
    let columns = [
      // { label: "#SL", name: "id" },
      { label: "Cargo Type", name: "cargo_type" },
      { label: "Cargo Name", name: "cargo_name" },
      { label: "Cargo Quantity", name: "cargo_quantity" },
      { label: "Supplier", name: "supplier" },
      { label: "BL Date", name: "bl_date" },
      //   { label: "Surveyor Name", name: "surveyor_name" },
      //   { label: "Download Invoice", name: "status" },
      // { label: "Download", name: "invoice" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    // let apiUrl = this.$store.state.apiUrl;
    return {
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
      cargos: [],
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
      // filterWorkOrderInvoiceData: {
      //   invoice_id: "",
      // },
      // download_invoice_url: apiUrl + "v1/work_orders/download_invoice/",
      active: false,
      isopen: "",
      error: "",
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.cargos.success_message,
    }),
  },

  mounted() {
    this.getAllCargos();
  },

  methods: {
    getAllCargos() {
      this.tableData.draw++;
      let params = new URLSearchParams();

      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/cargos/getData/index/" + this.$route.params.id + "?" + params)
        .then((response) => {
          this.cargos = response.data.data.data;
          console.log(this.cargos);
          this.pagination = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, "id", key);
      this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
      this.getAllCargos();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(cargo_details) {
      let cargo_id = cargo_details.id;
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
            console.log(cargo_id);
            this.deleteCargo(cargo_id);
          }
        });
    },

    deleteCargo: async function (id) {
      try {
        await this.$store.dispatch("cargos/delete_cargo", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllCargos();
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
.badge {
  margin-top: -25px;
  font-size: 15px;
  color: red;
}
.download {
  background-color: #3e8e41;
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
  width: 43%;
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
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  border-radius: 10px;
  width: 80%;
}

.active {
  opacity: 2;
  pointer-events: visible;
  top: 100%;
  display: none;
  z-index: 1;
}

/* Links inside the dropdown */
/* .dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
} */
button:hover {
  background-color: rgb(0, 0, 170);
}

/* Change color of dropdown links on hover */
/* .dropdown-content a:hover {
  background-color: #ddd;
} */

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
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
  width: 60%;
}
h1 {
  font-size: 1.3rem;
}
select {
  height: 30px
}
</style>
