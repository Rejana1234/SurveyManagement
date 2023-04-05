<template>
  <div id="surveyor">
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
      <h2>Surveyor List</h2>
      <div class="flex-container" style="justify-content: flex-end">
        <div class="exportimport">
          <form @submit.prevent="uploadFile" enctype="multipart/form-data">
            <div class="overlay" v-if="showModal" @click="closeModal()"></div>

            <div class="dropup">
              <button
              v-if="user_role_id==1"
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
                  v-if="user_role_id==1"
                    type="submit"
                    class="import"
                    v-on:click="uploadFile(file)"
                    style="font-weight: 900"
                  >
                    <span
                      class="material-icons-sharp add"
                      style="font-size: 11px"
                      >upload</span
                    >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <a
            v-if="user_role_id==1"
              :href="export_url"
              type="button"
              class="export"
              style="font-weight: 900"
            >
              <span class="material-icons-sharp add" style="font-size: 11px"
                >download</span
              >
              Export
            </a>
          </form>
        </div>
        <router-link to="add_surveyor" v-if="user_role_id==1">
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
            @change="getAllSurveyor()"
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
            @input="getAllSurveyor()"
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
              v-show="surveyors.length"
              v-for="(surveyor) in surveyors"
              :key="surveyor.id"
            >
              <!-- <td data-label="#" style="text-align: center">
                {{ index+1 }}
              </td> -->
              <td data-label="Name" style="text-align: center">
                {{ surveyor.name }}
              </td>
              <td data-label="Surveyor Type" style="text-align: center">
                {{ surveyor.type_name }}
              </td>
              <td data-label="Phone Number" style="text-align: center">
                {{ surveyor.phone }}
              </td>
              <td data-label="Email" style="text-align: center">
                {{ surveyor.email }}
              </td> 
              <!-- <td data-label="Rating" style="text-align: center" v-if="surveyor.rating">
              {{ surveyor.rating }}
            </td>
            <td data-label="Rating" style="text-align: center" v-else>
              --
            </td> -->
              <td data-label="Status" style="text-align: center" v-if="user_role_id==1">
                <input
                  type="checkbox"
                  style="margin-top: 2%"
                  :id="surveyor.id"
                  :checked="surveyor.status === 1"
                  @click="switchStatus(surveyor)"
                /><label :for="surveyor.id">Toggle</label>
              </td>

              <td data-label="Create" style="text-align: center">
                {{ moment(surveyor.created_at).format("YYYY-DD-MM") }}
              </td> 

              <td data-label="Action" style="text-align: center" v-if="user_role_id==1">
                <router-link :to="`/dashboard/edit_surveyor/${surveyor.id}`">
                  <button
                    type="button"
                    class="actio-button-margin edit"
                    title="Edit Surveyor"
                  >
                    <span
                      class="material-icons-sharp add"
                      style="font-size: 11px"
                      >edit</span
                    >
                  </button>
                </router-link>
                <button
                  title="Delete Surveyor"
                  type="button"
                  class="actio-button-margin delete"
                  v-on:click="confirmDelete(surveyor)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >delete</span
                  >
                </button>
                <router-link
                  :to="`/dashboard/surveyor/surveyor_details/${surveyor.user_id}`"
                >
                  <button
                    type="button"
                    class="actio-button-margin survey"
                    title="Surveyor Details"
                  >
                    <span
                      class="material-icons-sharp add"
                      style="font-size: 11px"
                      >details</span
                    >
                  </button>
                </router-link>
              </td>
              <td data-label="Action" style="text-align: center" v-else>
                --
              </td>
            </tr>
            <tr v-show="!surveyors.length">
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
              @paginate="getAllSurveyor()"
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
import moment from "moment";

import { mapState } from "vuex";
import axios from "axios";

import { http } from "../../../service/http_service";

export default {
  name: "InterportSurveyor",
  title: "Inter-Port - Surveyor",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "Name", name: "department_name" },
      { label: "Surveyor Type", name: "type_name" },
      { label: "Phone Number", name: "phone" },
      { label: "Email", name: "email" },
      { label: "Status", name: "status" },
      { label: "Created At", name: "create_at" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    let apiUrl = this.$store.state.apiUrl;

    return {
      showModal: false,
      surveyors: [],
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
      filterSurveyorData: {
        surveyor_id: "",
      },
      export_url: apiUrl + "v1/surveyors/export",
      switch_status_url: apiUrl + "v1/surveyors/switch_status/",
      import_file_url: apiUrl + "v1/surveyors/import",
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
      moment: moment,
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
      message: (state) => state.surveyors.success_message,
    }),
  },

  mounted() {
    this.getAllSurveyor();
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

    switchStatus(surveyor) {
      return http()
        .get(this.switch_status_url + surveyor.user_id)
        .then((response) => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Status updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllSurveyor();
          console.log(response);
        });
    },

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

    getAllSurveyor() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/surveyors/getData?" + params)
        .then((response) => {
          this.loader('circular');
          this.surveyors = response.data.data.data;
          this.pagination = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showImage(img) {
      let server_Path = this.$store.state.serverPath;
      return server_Path + "/storage/uploads/surveyors/image/" + img;
    },
    showVCImage(img) {
      let server_Path = this.$store.state.serverPath;
      return server_Path + "/storage/uploads/surveyors/vaccine/" + img;
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, "name", key);
      this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
      this.getAllSurveyor();
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
        await axios.post(this.import_file_url, formData);
        location.reload();
        alert("File Uploaded Successfully");
      } catch (error) {
        console.log(error);
      }
    },
    confirmDelete(surveyor_details) {
      let surveyor_id = surveyor_details.id;
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
            console.log(surveyor_id);
            this.deleteSurveyor(surveyor_id);
          }
        });
    },
    deleteSurveyor: async function (id) {
      // let id = surveyor.id;

      try {
        await this.$store.dispatch("surveyors/delete_surveyor", id).then(() => {
          this.loader('circular');
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllSurveyor();
        });
      } catch (e) {
        console.log(e);
        switch (e.response.status) {
          case 422:
            this.errors = e.response.data.errors;
            break;
          default:
            this.$swal.fire({
              icon: "error",
              text: "Oops",
              title: e.response.data.error,
            });
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#surveyor {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
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
  /* border-radius: 6px; */
  margin-right: 0;
}

th,
td {
  padding: 25px;
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
/* .search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 0;
} */
.close {
  background-color: rgb(183, 182, 180);
}
.exportimport {
  margin-top: 0.25%;
}
.add_new:hover {
  background-color:  #008CBA;
}

.add_new {
  background-color: #1367A2;
  padding: 7px 7px;
}
.survey {
  background-color: rgb(60, 60, 247);
}

th,
td {
  padding: 25px;
}

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

input[type="text"] {
  width: 97%;
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
  margin-left: 25px;
  margin-top: -22%;
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

th,
td {
  padding: 25px;
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
button:hover {
  background-color: rgb(0, 0, 170);
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
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
.close {
  background-color: rgb(183, 182, 180);
}
.exportimport {
  margin-top: 0.25%;
}
.add_new {
  padding: 6px 7px;
}
.survey {
  background-color: rgb(60, 60, 247);
}
h1 {
  font-size: 1.3rem;
}
select {
  height: 30px
}
</style>
