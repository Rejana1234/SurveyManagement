<template>
  <div id="attendance">
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
      <h2>Attendance List</h2>
      <div class="flex-container">
        <div class="flex-item">
          Show:
          <select
            name="cars"
            class="entries_count"
            id="cars"
            style="appearance: auto"
            v-model="tableData.length"
            @change="getAllAttendance()"
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
            @input="getAllAttendance()"
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
              v-show="attendances.length"
              v-for="att in attendances"
              :key="att.id"
            >
              <!-- <td data-label="#SL" style="text-align: center">
                {{ att.id }}
              </td> -->
              <td data-label="Name" style="text-align: center">
                {{ att.name }}
              </td>
              <td data-label="Vessel Name" style="text-align: center">
                {{ att.vessel_name }}
              </td>
              <td data-label="IML Reference No" style="text-align: center">
                {{ att.iml_reference_no }}
              </td>
              <td
                data-label="Survey Firm Reference No"
                style="text-align: center"
              >
                {{ att.survey_firm_reference_no }}
              </td>
              <td data-label="Date" style="text-align: center">
                {{ att.date }}
              </td>
              <td data-label="Check In" style="text-align: center">
                {{ att.check_in_time }}
              </td>      
              <td data-label="Location" style="text-align: center">
                {{ att.location }}
              </td>
              <td data-label="Actions" style="text-align: center" v-if="user_role_id<4">
                <button
                  title="Delete Attendence"
                  type="button"
                  class="actio-button-margin delete"
                  v-on:click="confirmDelete(att)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >delete</span
                  >
                </button>
              </td>
            </tr>
          </tbody>
          <tr v-show="!attendances.length">
            <td colspan="9">No Data Found</td>
          </tr>
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
              @paginate="getAllAttendance()"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datatable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "MyAttandance",
  title: "Inter-Port - Attendance",

  components: {
    Datatable,
    Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      // { label: "#Sl", name: "id" },
      { label: "Name", name: "name" },
      { label: "Vessel Name", name: "Vessel_Name" },
      { label: "IML File Ref. No.", name: "Check_out_time" },
      { label: "Survey Firm Ref. No.", name: "survey_firm_reference_no" },   
      { label: "Date", name: "date" },
      { label: "Check In", name: "check_in_time" },
      { label: "Location", name: "location" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
      attendances: [],
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
      filterUserData: {
        attendence_id: "",
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
    ...mapState({}),
  },

  mounted() {
    this.getAllAttendance();
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

    getAllAttendance() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/attendance/getData?" + params)
        .then((response) => {
          this.loader('circular');
          this.attendances = response.data.data.data;
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
      this.getAllAttendance();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(attendence_details) {
      let attendence_id = attendence_details.id;
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
            console.log(attendence_id);
            this.deleteAttendance(attendence_id);
          }
        });
    },

    deleteAttendance: async function (id) {
      try {
        return await http()
          .delete(`v1/attendance/destroy/${id}`)
          .then((res) => {
            this.attendances = this.attendances.filter((item) => {
              return id !== item.id;
            });

            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getAllAttendance();
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#attendance {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  /* border-radius: 6px; */
  margin-right: 0;
}
input[type="text"] {
  width: 97%;
}
h1 {
  font-size: 1.3rem;
}
</style>
