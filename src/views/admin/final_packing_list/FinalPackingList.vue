<template>
  <div id="final_packing_id">
    <div class="card">
    <h2>Final Packing List</h2>
    <div class="flex-container" style="justify-content: flex-end">
      <router-link to="add_final_packing_list">
        <button type="button" class="add_new">
          <span class="material-icons-sharp add" style="font-size: 11px"
            >add</span
          >Add New
        </button>
      </router-link>
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
          @change="getAllFinalPackingList()"
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
          @input="getAllFinalPackingList()"
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
          v-show="final_packing_lists.length"
          v-for="final_packing_list in final_packing_lists"
          :key="final_packing_list.id"
        >
          <td data-label="#Sl" style="text-align: center">{{ final_packing_list.id }}</td>
            <td data-label="picture" style="text-align: center"><img :src="final_packing_list.picture"  ></td>
          <td data-label="Work Order" style="text-align: center">{{ final_packing_list.work_order_id }}</td>
          <td data-label="Purchase" style="text-align: center">{{ final_packing_list.purchase }}</td>
          <td data-label="Item_no" style="text-align: center">{{ final_packing_list.item_no }}</td>
          <td data-label="Supply_no" style="text-align: center">{{ final_packing_list.supply_no }}</td>
            <td data-label="Quantity" style="text-align: center">{{ final_packing_list.quantity_id }}</td>
          <td data-label="origin" style="text-align: center">{{ final_packing_list.origin }}</td>
          <td data-label="package_no" style="text-align: center">{{ final_packing_list.package_no }}</td>
          <td data-label="Style" style="text-align: center">{{ final_packing_list.style_id }}</td>
          <td data-label="Net Weight" style="text-align: center">{{ final_packing_list.net_weight }}</td>
          <td data-label="Kg" style="text-align: center">{{ final_packing_list.kg }}</td>

          <td data-label="Actions" style="text-align: center">
            <router-link
              :to="`/dashboard/edit_final_packing_list/${final_packing_list.id}`"
            >
              <button type="button" class="actio-button-margin edit">
                <span class="material-icons-sharp add" style="font-size: 11px"
                  >edit</span
                >
              </button>
            </router-link>
            <button
              type="button"
              class="actio-button-margin delete"
              v-on:click="deleteFinalPackingList(final_packing_list)"
            >
              <span class="material-icons-sharp add" style="font-size: 11px"
                >delete</span
              >
            </button>
          </td>
        </tr>

        <tr v-show="!final_packing_lists.length">
          <td>No Data Found</td>
        </tr>
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
            @paginate="getAllFinalPackingList()"
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
  name: "InterportFinalPackingLists",
  title: "Inter-Port - Final_Packaging",


  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "#Sl", name: "id" },
      { label: "picture", name: "picture" },
      { label: "Work Order", name: "work_order_id" },
      { label: "Purchase", name: "purchase" },
      { label: "Item_no", name: "item_no" },
      { label: "Supply_no", name: "supply_no" },
      { label: "quantity", name: "quantity_id" },
      { label: "origin", name: "origin" },
      { label: "package_no", name: "package_no" },
      { label: "style", name: "style_id" },
      { label: "net_weight", name: "net_weight" },
      { label: "kg", name: "kg" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });

    return {
      final_packing_lists: [],
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

  computed: {
    ...mapState({
      message: (state) => state.final_packing_list.success_message,
    }),
  },

  mounted() {
    this.getAllFinalPackingList();
  },

  methods: {
    getAllFinalPackingList() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/final_packing_lists/getData?" + params)
        .then((response) => {
          this.final_packing_lists = response.data.data.data;
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
      this.getAllFinalPackingList();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    deleteFinalPackingList: async function (final_packing_list) {
      let id = final_packing_list.id;

      try {
        await this.$store
          .dispatch("final_packing_list/delete_final_packing_list", id)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllFinalPackingList();
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}
h1 {
  font-size: 1.3rem;
}
</style>
