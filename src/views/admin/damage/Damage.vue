<template>
  <div class="card">
    <div class="flex-container">
      <h2 style="margin-left: 10px; line-height: 40px">Damage List</h2>
      <router-link to="add-damage">
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
          @change="getAllDamage()"
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
        <input
          type="text"
          v-model="tableData.search"
          @input="getAllDamage()"
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
            v-show="damages.length"
            v-for="damage in damages"
            :key="damage.id"
          >
            <td data-label="#Sl" style="text-align: center">{{ damage.id }}</td>
            <td data-label="Damage Type" style="text-align: center">
              {{ damage.damage_type_name }}
            </td>
            <td data-label="Actin" style="text-align: center">
              <router-link :to="`/dashboard/edit-damage/${damage.id}`">
                <button
                  type="button"
                  class="actio-button-margin edit"
                  title="Edit Damage"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"
                    >edit</span
                  >
                </button>
              </router-link>
              <button
                title="Delete Damage"
                type="button"
                class="actio-button-margin delete"
                v-on:click="confirmDelete(damage)"
              >
                <span class="material-icons-sharp add" style="font-size: 11px"
                  >delete</span
                >
              </button>
            </td>
          </tr>

          <tr v-show="!damages.length">
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
            @paginate="getAllDamage()"
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
  name: "InterportDamage",
  title: "InterPort - Damage",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "#Sl", name: "id" },
      { label: "Damage Type", name: "damage_type_name" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      damages: [],
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
      filterDamageData: {
        damage_id: "",
      },
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.damage.success_message,
    }),
  },

  mounted() {
    this.getAllDamage();
  },

  methods: {
    getAllDamage() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/damage/getData?" + params)
        .then((response) => {
          this.damages = response.data.data.data;
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
      this.getAllDamage();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(damage_details) {
      let damage_id = damage_details.id;
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
            console.log(damage_id);
            this.deleteDamage(damage_id);
          }
        });
    },

    deleteDamage: async function (id) {
      // let id = damage.id;

      try {
        await this.$store.dispatch("damage/delete_damage", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getAllDamage();
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
h1 {
  font-size: 1.3rem;
}
</style>
