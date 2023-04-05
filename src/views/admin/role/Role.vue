<template>
  <div id="role">
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
      <h2>Roles</h2>
      <div class="flex-container" style="justify-content: flex-end">
        <router-link to="add_role">
          <button type="button" class="btn">
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
            @change="getAllRole()"
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
            @input="getAllRole()"
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
            <tr v-show="roles.length" v-for="role in roles" :key="role.id">
              <!-- <td data-label="#Sl" style="text-align: center">{{ role.id }}</td> -->
              <td data-label="role Name" style="text-align: center">
                {{ role.name }}
              </td>
              <!-- <td>
              <ul>
                <li v-for="permission in role.permissions" :key="permission.id">{{ permission.name }}</li>
              </ul>
            </td> -->
              <td
                data-label="Action"
                style="text-align: center"
                v-if="role.id > 5"
              >
                <router-link :to="`/dashboard/edit_role/${role.id}`">
                  <button
                    type="button"
                    class="actio-button-margin edit"
                    title="Edit Role"
                  >
                    <span
                      class="material-icons-sharp add"
                      style="font-size: 11px"
                      >edit</span
                    >
                  </button>
                </router-link>

                <button
                  title="Delete Role"
                  type="button"
                  class="actio-button-margin delete"
                  v-on:click="confirmDelete(role)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >delete</span
                  >
                </button>
              </td>
              <td style="text-align: center" v-else>System Role</td>
            </tr>
            <tr v-show="!roles.length">
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
              @paginate="getAllPermission()"
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

import { httpAuth } from "../../../service/login_service";

export default {
  name: "InterportStyle",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      // { label: "#Sl", name: "id" },
      { label: "Role Name", name: "name" },
      // { label: "Permission Name", name: "permission_name" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      roles: [],
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
      filterRoleData: {
        role_id: "",
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
      message: (state) => state.role.success_message,
    }),
  },

  mounted() {
    this.getAllRole();
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

    getAllRole() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return httpAuth()
        .get("access/v1/role/getData?" + params)
        .then((response) => {
          this.loader('circular');
          this.roles = response.data.data.data;
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
      this.getAllRole();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(role_details) {
      let role_id = role_details.id;
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
            console.log(role_id);
            this.deleteRole(role_id);
          }
        });
    },

    deleteRole: async function (id) {
      // let id = role.id;

      try {
        await this.$store.dispatch("role/delete_role", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getAllRole();
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#role {
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

ul {
  background: #f3dbdb;
  display: flex;
  flex-wrap: wrap;
}
ul li {
  flex-grow: 1;
  border-width: 5px 5px 5px 5px;
  border-color: #fff;
  border-style: solid;
  text-align: center;
}
input[type="text"] {
  width: 97%;
}
h1 {
  font-size: 1.3rem;
}
.btn:hover {
  background-color:  #008CBA;
}
.btn {
  background-color: #1367A2;
    padding: 8px 12px;
    border-radius: 5px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    margin-left: -30%;
    background-color:  #008CBA;
    height: 38px;
}
</style>
