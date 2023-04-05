<template>
  <div class="card">
    <h2>C F Consignee List</h2>
    <div class="flex-container" style="justify-content: flex-end">
      <div class="exportimport">
        <form @submit.prevent="uploadFile" enctype="multipart/form-data">
          <div class="overlay" v-if="showModal" @click="closeModal()"></div>

          <div class="dropup">
            <button
              class="dropbtn"
              @click="openModal()"
              style="font-weight: 900"
            >
              <span class="material-icons-sharp add" style="font-size: 11px"
                >upload</span
              >
              Import
            </button>
          </div>
          <div class="overlay" v-if="showModal" @click="closeModal()"></div>
          <div class="modal" v-show="showModal">
            <div id="app" class="modal-vue">
              <!-- button show -->
              <!-- overlay -->
              <div class="overlay"></div>
              <!-- modal -->
              <div class="modal">
                <button class="close" @click="closeModal()">x</button>
                <input type="file" ref="file" @change="selectFile()" />
                <button
                  type="submit"
                  class="import"
                  v-on:click="uploadFile(file)"
                  style="font-weight: 900"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >upload</span
                  >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <a :href="url" type="button" class="export" style="font-weight: 900">
            <span class="material-icons-sharp add" style="font-size: 11px"
              >download</span
            >
            Export
          </a>
        </form>
      </div>
      <router-link to="add_consign">
        <button type="button" class="add_new">
          <span class="material-icons-sharp add" style="font-size: 11px"
            >add</span
          >Add New
        </button>
      </router-link>
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
          @change="getAllConsign()"
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
          @input="getAllConsign()"
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
            v-show="consigns.length"
            v-for="consign in consigns"
            :key="consign.id"
          >
            <td data-label="#Sl" style="text-align: center">
              {{ consign.id }}
            </td>
            <td data-label="Company" style="text-align: center">
              {{ consign.company_name }}
            </td>
            <td data-label="Name" style="text-align: center">
              {{ consign.c_f_name }}
            </td>
            <td data-label="Phone" style="text-align: center">
              {{ consign.phone }}
            </td>
            <td data-label="Address" style="text-align: center">
              {{ consign.address }}
            </td>
            <td data-label="Action" style="text-align: center">
              <router-link :to="`/dashboard/edit_consign/${consign.id}`">
                <button type="button" class="actio-button-margin edit">
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >edit</span
                  >
                </button>
              </router-link>
              <button
                type="button"
                class="actio-button-margin delete"
                v-on:click="deleteConsign(consign)"
              >
                <span class="material-icons-sharp add" style="font-size: 11px"
                  >delete</span
                >
              </button>
            </td>
          </tr>

          <tr v-show="!consigns.length">
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
            @paginate="getAllConsign()"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";
import axios from "axios";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "InterportC_F_Consign",
  title: "Inter-Port - C_F Consignee",
  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "#Sl", name: "id" },
      { label: "Company", name: "company_name" },
      { label: "Name", name: "c_f_name" },
      { label: "Phone", name: "phone" },
      { label: "Address", name: "address" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      showModal: false,
      consigns: [],
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
      url: "http://127.0.0.1:8000/api/interport/v1/cf_consignees/export",
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.c_f_consign.success_message,
    }),
  },

  mounted() {
    this.getAllConsign();
  },

  methods: {
    openModal() {
      this.showModal = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },

    closeModal() {
      this.showModal = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },

    getAllConsign() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/cf_consignee/getData?" + params)
        .then((response) => {
          this.consigns = response.data.data.data;
          this.pagination = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, "c_f_name", key);
      this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
      this.getAllConsign();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        await axios.post(
          "http://127.0.0.1:8000/api/interport/v1/cf_consignees/import",
          formData
        );
        location.reload();
        alert("File Uploaded Successfully");
      } catch (error) {
        console.log(error);
      }
    },

    deleteConsign: async function (department) {
      let id = department.id;

      try {
        await this.$store
          .dispatch("c_f_consign/delete_consign", id)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllConsign();
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

.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 7px;
  font-size: 13px;
  border: none;
}

.dropup {
  position: relative;
  display: inline-block;
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}

.dropup-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 70px;
  top: 33px;
  z-index: 1;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropup-content a:hover {
  background-color: #ccc;
}

.dropup:hover .dropup-content {
  display: block;
}

.dropup:hover .dropbtn {
  background-color: #2980b9;
}

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: absolute;
  width: 25%;
  z-index: 9999;
  margin: -100px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal {
  margin-right: 10%;
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
.close {
  background-color: rgb(183, 182, 180);
}
.exportimport {
  margin-top: 0.25%;
}
h1 {
  font-size: 1.3rem;
}
</style>
