<template>
  <div class="card">
    <h2>Invoice List</h2>
    <div>
      <div class="flex-container">
        <div class="flex-item">
          Show:
          <select
            name="cars"
            class="entries_count"
            id="cars"
            style="appearance: auto"
            v-model="tableData.length"
            @change="getAllInvoice()"
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
            @input="getAllInvoice()"
            placeholder="Search here"
            class="search"
          />
        </div>
      </div>

      <div style="padding: 10px 10px">
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="invoices.length" v-for="invoice in invoices" :key="invoice.id">
              <!-- <td data-label="#SL" style="text-align: center">
                {{ invoice.id }}
              </td> -->
              <td data-label="Invoice No" style="text-align: center">
                {{ invoice.invoice_no }}
              </td>
              <td data-label="Date of Invoice" style="text-align: center">
                {{ invoice.invoice_date }}
              </td>
              <td data-label="Type of Invoice" style="text-align: center">
                {{ invoice.invoice_type }}
              </td>
              <td data-label="Invoice Amount" style="text-align: center">
                {{ invoice.amount.toLocaleString("en-US") }} ({{ invoice.currency }})
              </td>
              <td data-label="Payment Receiving Date" style="text-align: center">
                <input
                  type="date"
                  v-model="invoice.payment_receiving_date"
                  @change="updatePaymenRecieveDate(invoice.id)"
                />
                <!-- {{ invoice.payment_receiving_date }} -->
              </td>
              <td data-label="Status" style="text-align: center">
                <input
                  type="checkbox"
                  :id="invoice.id"
                  :checked="invoice.status === 1"
                  @click="switchStatus(invoice)"
                /><label :for="invoice.id">Toggle</label>
              </td>
              <td data-label="Action" style="text-align: center">
                <div class="dropdown">
                  <button class="dropbtn" type="button">
                    <span class="material-icons-sharp"> more_horiz </span>
                  </button>
                  <div class="dropdown-content">
                    <button
                      title="Delete Invoice"
                      type="button"
                      class="actio-button-margin delete"
                      v-on:click="confirmDelete(invoice)"
                    >
                      <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                      Delete
                    </button>
                    <br />
                    <button
                      title="Download Invoice"
                      type="button"
                      class="actio-button-margin appoint"
                      @click="downloadInvoice(invoice.id)"
                    >
                      <span class="material-icons-sharp add" style="font-size: 11px">download</span> Invoice
                    </button>
                    <button
                      title="Download Time Log"
                      type="button"
                      class="actio-button-margin download"
                      @click="downloadTimeLog(invoice.id)"
                    >
                      <span class="material-icons-sharp add" style="font-size: 11px">download</span> Time Log
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-show="!invoices.length">
              <td colspan="9">No Data Found</td>
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
            <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllInvoice()"></pagination>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";
import { downloadPdf } from "../../../service/http_service";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";

export default {
  name: "InterportInvoice",

  components: {
    datatable: DataTable,
    pagination: Pagination,
  },

  props: ["work_order_id"],

  data() {
    let sortOrders = {};
    let columns = [
      // { label: "#SL", name: "id" },
      { label: "Invoice No.", name: "invoice_no" },
      { label: "Date of Invoice", name: "invoice_date" },
      { label: "Type", name: "invoice_type" },
      { label: "Amount", name: "amount" },
      { label: "Payment Receiving Date", name: "payment_receiving_date" },
      //   { label: "Surveyor Name", name: "surveyor_name" },
      //   { label: "Download Invoice", name: "status" },
      { label: "Status", name: "status" },
      { label: "Download", name: "invoice" },
      // { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    let apiUrl = this.$store.state.apiUrl;
    let token = this.$store.state.token;
    return {
      invoices: [],
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
      filterWorkOrderInvoiceData: {
        invoice_id: "",
      },
      switch_status_url: apiUrl + "v1/invoices/change_status/",
      download_invoice_url: apiUrl + "v1/work_orders/download_invoice/",
      download_time_log_url: apiUrl + "v1/work_orders/download_timelog/",
      active: false,
      isopen: "",
      error: "",
      token: token,
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.invoice.success_message,
    }),
  },

  mounted() {
    this.getAllInvoice();
  },

  methods: {
    updatePaymenRecieveDate(id) {
      console.log(id);
      let formData = new FormData();
      formData.append("payment_receiving_date", event.target.value);
      return http()
        .post("v1/invoices/payment_receive_date/" + id, formData)
        .then((response) => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Status updated",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllInvoice();
          console.log(response);
        });
    },
    switchStatus(invoice) {
      return http()
        .post(this.switch_status_url + invoice.id)
        .then((response) => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Payment Recieved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllInvoice();
          console.log(response);
        });
    },

    downloadInvoice(id) {
      let url = this.download_invoice_url + id;
      // window.open(url, "_blank");

      downloadPdf(url);
    },
    downloadTimeLog(id) {
      let url = this.download_time_log_url + id;
      // window.open(url, "_blank");

      downloadPdf(url);
    },
    getAllInvoice() {
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/invoices/work_order_id/" + this.$route.params.id + "/getData?" + params)
        .then((response) => {
          this.invoices = response.data.data.data;
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
      this.getAllInvoice();
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    confirmDelete(invoice_details) {
      let invoice_id = invoice_details.id;
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
            console.log(invoice_id);
            this.deleteInvoice(invoice_id);
          }
        });
    },

    deleteInvoice: async function (id) {
      try {
        await this.$store.dispatch("invoice/delete_invoice", id).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllInvoice();
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
  width: fit-content;
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  /* margin-top: 2%; */
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
  background-color: rgb(21, 99, 78);
  border: 1px solid rgb(31, 182, 20);
}
.appoint:hover {
  background-color: rgb(102, 174, 95);
}
.download {
  background-color: rgb(25, 210, 191);
  border: 1px solid rgb(31, 182, 20);
}
.download:hover {
  background-color: rgb(44, 174, 161);
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
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 119px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  margin-left: 0%;
  border-radius: 10px;
  width: 100%;
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

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
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
  margin-left: 54px;
  margin-top: -16%;
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
input[type="text"] {
  width: 97%;
}
h1 {
  font-size: 1.3rem;
}
input[type="date"] {
  width: 84%;
}
select {
  height: 30px;
}
</style>
