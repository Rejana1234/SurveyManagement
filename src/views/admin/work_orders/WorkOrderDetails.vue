<template>
  <div id="w_details">
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

    <div class="card" style="padding: 10px 10px">
      <div style="margin-bottom: 10px; font-weight: bold; float: left">
        <h2>File Details</h2>
      </div>
      <div style="float: right">
        <div class="bn">
          <div v-if="user_role_id < 4" class="flex-container" style="justify-content: flex-end; margin-top: 10px">
            <button type="button" class="add_firm" @click="openModal1()" v-if="w_orders.survey_firm_name">
              Survey Firm:
              {{ w_orders.survey_firm_name ? w_orders.survey_firm_name : "--" }}
            </button>
            <button type="button" class="add_firm0" @click="openModal1()" v-else>Assign Survey Firm</button>
          </div>

          <div class="overlay" v-if="showModal1" @click="closeModal1()"></div>

          <div class="modal1" v-show="showModal1">
            <div id="app" class="modal-vue">
              <div class="overlay"></div>
              <!-- modal -->
              <div class="modal1">
                <button class="close" @click="closeModal1()">x</button>
                <SurveyFirms />
                <!-- <AddSurvey /> -->
              </div>
            </div>
          </div>
          <div v-if="user_role_id <= 3" class="flex-container" style="justify-content: flex-end; margin-top: 10px">
            <button type="button" class="add_handler" @click="openModal2()" v-if="w_orders.claim_handler">
              Claim Handler: {{ claim_handler.name }}
            </button>
            <button type="button" class="add_handler0" @click="openModal2()" v-else>Assign Claim Handler</button>
          </div>

          <div class="overlay" v-if="showModal2" @click="closeModal2()"></div>

          <div class="modal1" v-show="showModal2">
            <div id="app" class="modal-vue">
              <!-- button show -->
              <!-- overlay -->
              <div class="overlay"></div>
              <!-- modal -->
              <div class="modal1">
                <button class="close" @click="closeModal2()">x</button>
                <claimHandler />
                <!-- <AddSurvey /> -->
              </div>
            </div>
          </div>
          <div class="flex-container" style="justify-content: flex-end; margin-top: 10px">
            <button type="button" class="add_new" @click="openModal()" v-if="user_role_id < 4">
              <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add Survey
            </button>
            <button type="button" class="add_new" @click="openInvoiceModal()">
              <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add Invoice
            </button>
            <button type="button" class="add_new" @click="openCargoModal()" v-if="user_role_id < 4">
              <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add Cargo Info.
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
                <AddSurvey />
              </div>
            </div>
          </div>
          <div class="modal" v-show="showInvoiceModal">
            <div id="app" class="modal-vue">
              <!-- button show -->
              <!-- overlay -->
              <div class="overlay"></div>
              <!-- modal -->
              <div class="modal">
                <button class="close" @click="closeInvoiceModal()">x</button>
                <AddInvoice />
              </div>
            </div>
          </div>
          <div class="modal" v-show="showCargoModal">
            <div id="app" class="modal-vue">
              <!-- button show -->
              <!-- overlay -->
              <div class="overlay"></div>
              <!-- modal -->
              <div class="modal">
                <button class="close" @click="closeCargoModal()">x</button>
                <FileCargoInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
      <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
        <tr v-on:submit.prevent="detailsW_order">
          <td data-label="IML File Ref No." style="text-align: center" v-if="w_orders.iml_reference_no">
            {{ w_orders.iml_reference_no }}
          </td>
          <td data-label="IML File Ref No." style="text-align: center" v-else>--</td>
          <td
            data-label="Survey Firm’s File Ref no."
            style="text-align: center"
            v-if="w_orders.survey_firm_reference_no"
          >
            {{ w_orders.survey_firm_reference_no }}
          </td>
          <td data-label="Survey Firm’s File Ref no." style="text-align: center" v-else>--</td>
          <td data-label="Name of the Vessel/Ship" style="text-align: center" v-if="w_orders.vessel_name">
            {{ w_orders.vessel_name }}
          </td>
          <td data-label="Name of the Vessel/Ship" style="text-align: center" v-else>--</td>
          <td data-label="File opening date" style="text-align: center" v-if="w_orders.file_opening_date">
            {{ w_orders.file_opening_date }}<br />
          </td>
          <td data-label="File opening date" style="text-align: center" v-else>--</td>
          <td
            data-label="Club’s/Client’s File Ref no."
            style="text-align: center"
            v-if="w_orders.club_file_reference_no"
          >
            {{ w_orders.club_file_reference_no }}
          </td>
          <td data-label="Club’s/Client’s File Ref no." style="text-align: center" v-else>--</td>

          <td data-label="Status" style="text-align: center" v-if="w_orders.status == 0">
            <p class="chips2">Not Started</p>
          </td>
          <td data-label="Status" style="text-align: center" v-if="w_orders.status == 3">
            <p class="chips1">Pending</p>
          </td>
          <td data-label="Status" style="text-align: center" v-if="w_orders.status == 2">
            <p class="chips1">Inprogress</p>
          </td>
          <td data-label="Status" style="text-align: center" v-if="w_orders.status == 1">
            <p class="chips">Completed</p>
          </td>

          <td data-label="Actions" style="text-align: center" v-if="user_role_id < 4">
            <div class="dropdown">
              <button class="dropbtn" type="button">
                <span class="material-icons-sharp"> more_horiz </span>
              </button>
              <div class="dropdown-content">
                <button
                  title="Change Status"
                  type="button"
                  value="0"
                  class="actio-button-margin notstarted"
                  @click="changeStatus($event)"
                >
                  <span class="material-icons-sharp" style="font-size: 11px"> not_started </span>
                  Not Started
                </button>
                <!-- <button
                  type="button"
                  class="actio-button-margin pending"
                  value="3"
                  @click="changeStatus($event)"
                >
                  <span class="material-icons-sharp" style="font-size: 11px"> pending </span>
                  Pending
                </button> -->
                <button
                  title="Change Status"
                  type="button"
                  value="2"
                  class="actio-button-margin inprogress"
                  @click="changeStatus($event)"
                >
                  <span class="material-icons-sharp" style="font-size: 11px"> sync </span>
                  Inprogress
                </button>
                <button
                  title="Change Status"
                  type="button"
                  value="1"
                  class="actio-button-margin completed"
                  @click="changeStatus($event)"
                >
                  <span class="material-icons-sharp add" style="font-size: 11px"> check_circle </span>
                  Completed
                </button>
                <!-- </a> -->
              </div>
            </div>
          </td>
          <td data-label="Action" style="text-align: center" v-else>--</td>
        </tr>
      </datatable>
    </div>

    <WorkOrderSurvey :work_order_id="w_orders" />
    <InvoiceFile :work_order_id="w_orders" />
    <Cargo :work_order_id="w_orders" />
    <!-- <Survey /> -->
    <div class="row">
      <input type="button" value="Back" @click="back()" class="back-btn" />
    </div>
  </div>
</template>

<script>
import AddInvoice from "@/views/admin/invoice/AddInvoice.vue";
import FileCargoInfo from "@/views/admin/work_orders/FileCargoInfo.vue";
import Cargo from "@/views/admin/cargos/Cargo.vue";
import AddSurvey from "@/views/admin/survey/AddSurvey.vue";
import SurveyFirms from "@/views/admin/SurveyFirms.vue";
import ClaimHandler from "@/views/admin/ClaimHandler.vue";
import DataTable from "../../../components/datatable/Datatable";
import WorkOrderSurvey from "../../admin/survey/WorkOrderSurvey.vue";

import { http } from "../../../service/http_service";
import { httpAuth } from "../../../service/login_service";
import { downloadPdfInfoice } from "../../../service/http_service";

import { mapState, mapActions } from "vuex";
import InvoiceFile from "../invoice/InvoiceFile.vue";

export default {
  name: "InterportW_Orders",
  components: {
    datatable: DataTable,
    SurveyFirms,
    ClaimHandler,
    AddSurvey,
    WorkOrderSurvey,
    InvoiceFile,
    AddInvoice,
    FileCargoInfo,
    Cargo,
  },
  data() {
    let sortOrders = {};
    let columns = [
      { label: "IML File Ref No.", name: "iml_reference_no" },
      { label: "Survey Firm’s File Ref no.", name: "survey_firm_reference_no" },
      { label: "Name of the Vessel/Ship", name: "vessel_name" },
      { label: "File opening date", name: "file_opening_date" },
      { label: "Club’s/Client’s File Ref no.", name: "club_file_reference_no" },
      { label: "Status", name: "status" },
      { label: "Actions", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    let apiUrl = this.$store.state.apiUrl;
    return {
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
      surveyData: {
        work_order_id: "",
        start_date: "",
        end_date: "",
      },
      showCargoModal: false,
      showInvoiceModal: false,
      showModal: false,
      showModal1: false,
      showModal2: false,
      w_orders: [],
      sr_surveyor: [],
      claim_handler: [],
      claim_handlers: [],
      survey_firms: [],
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
      errors: "",
      download_invoice_url: apiUrl + "v1/work_orders/download_invoice/",
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
      detailsW_orderList: (state) => state.w_order.w_order,
      message: (state) => state.w_order.success_message,
    }),
  },

  mounted() {
    this.getDetailsW_order();
    this.getClaimHandlers();
    this.getSurveyFirms();
    this.setWorkOrderDetails(this.$route.params.id);

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

    ...mapActions({
      setWorkOrderDetails: "w_order/w_order_details",
    }),
    
    changeStatus(event) {
      let statusID = event.target.value;
      let formData = new FormData();
      formData.append("status", statusID);
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, change it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            return http()
              .post("v1/work_orders/change_status/" + this.$route.params.id, formData)
              .then((response) => {
                console.log(response);
                this.getDetailsW_order();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      console.log("ok");
    },

    back() {
      this.$router.go(-1);
    },

    getSurveyFirms() {
      return http()
        .get("/v1/survey_firms")
        .then((response) => {
          this.survey_firms = response.data.survey_firms;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getClaimHandlers() {
      return httpAuth()
        .get("/access/v1/users/role/claim-handler")
        .then((response) => {
          this.claim_handlers = response.data.users;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetailsW_order() {
      let id = this.$route.params.id;
      return http()
        .get("v1/work_orders/details/" + id)
        .then((response) => {
           this.loader('circular');
          this.w_orders = response.data.workOrder;
          this.sr_surveyor = response.data.srSurveyor;
          this.claim_handler = response.data.claimHandler;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    openCargoModal() {
      this.showCargoModal = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },

    closeCargoModal() {
      this.showCargoModal = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },

    openInvoiceModal() {
      this.showInvoiceModal = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },

    closeInvoiceModal() {
      this.showInvoiceModal = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },

    downloadInvoice(id) {
      let url = this.download_invoice_url + id;
      return downloadPdfInfoice(url);
    },

    openModal() {
      this.showModal = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },
    openModal1() {
      this.showModal1 = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },
    openModal2() {
      this.showModal2 = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },

    closeModal() {
      this.showModal = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-auto");
    },
    closeModal1() {
      this.showModal1 = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },
    closeModal2() {
      this.showModal2 = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },

    detailsW_order: async function () {
      try {
        let id = this.$route.params.id;
        let tableData = new DataTable();

        tableData.append("id", this.detailsW_orderList.reference_no);
        tableData.append("image", this.detailsW_orderList.image);
        tableData.append("name", this.detailsW_orderList.client.name);
        tableData.append("work_order_date", this.detailsW_orderList.work_order_date);
        tableData.append("project_name", this.detailsW_orderList.project_name);
        tableData.append("cargo_volume", this.detailsW_orderList.cargo_volume);
        tableData.append("status", this.detailsW_orderList.status);
        tableData.append("_method", "PUT");

        return this.$get.dispatch("w_order/details_w_order", { id: id, data: tableData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getDetailsW_order(this.$route.params.id);
        });
      } catch (e) {
        console.log(e);
      }
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
      this.getAllW_Orders(this.$route.params.id);
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },

    deleteW_Orders: async function (department) {
      let id = department.id;

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
#w_details {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
  /* background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
  overflow: auto; */
}
.box {
  background-color: rgb(132, 130, 130);
}
.select {
  border-radius: 3%;
}
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
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
  width: 50%;
  height: 80%;
  z-index: 9999;
  margin: -200px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
  margin-top: -3%;
  overflow: auto;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal {
  margin-right: 10%;
}

.bn {
  display: flex;
}

.modal-vue .modal1 {
  position: absolute;
  width: 50%;
  z-index: 9999;
  margin: -100px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
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
.dropdown-content button {
  /* padding: 5px 5px; */
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 1%;
  /* width: 100%; */
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

.chips {
  width: 56%;
  margin-left: 10px;
  margin-top: 0px;
  margin-right: 0px;
}
.chips1 {
  width: 56%;
  margin-left: 10px;
  margin-top: 0px;
  margin-right: 0px;
}
.chips2 {
  width: 56%;
  margin-left: 10px;
  margin-top: 0px;
  margin-right: 0px;
  padding: 13px 15px;
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
  margin: 3px 4px 3px 8px;
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

.notstarted {
  padding: 5px;
  background-color: rgb(54 197 213);
  border: 1px solid rgb(97, 207, 219);
  margin-top: 6px;
}

.notstarted:hover {
  background-color: rgb(45, 139, 239);
}
.pending {
  padding: 5px;
  background-color: rgb(49, 164, 177);
  border: 1px solid rgb(49, 164, 177);
}
.pending:hover {
  background-color: rgb(30, 110, 195);
}
.inprogress {
  padding: 5px;
  background-color: rgb(24 148 15);
  border: 1px solid rgb(72, 229, 61);
}
.inprogress:hover {
  background-color: rgb(26, 179, 15);
}
.completed {
  padding: 5px;
  background-color: rgb(20, 147, 182);
  border: 1px solid rgb(20, 147, 182);
}
.completed:hover {
  background-color: rgb(4, 89, 113);
}
.back-btn {
  margin-top: 1%;
}
.add_firm {
  background-color: #4464bb;
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  /* background-color: blue; */
  font-weight: 900;
}
.add_handler {
  background-color: #4464bb;
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  /* background-color: blue; */
  font-weight: 900;
}
.add_firm0 {
  background-color: #6887da;
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  /* background-color: blue; */
  font-weight: 900;
}
.add_handler0 {
  background-color: #6887da;
  padding: 10px 15px;
  margin: 10px;
  color: #ffffff;
  /* background-color: blue; */
  font-weight: 900;
}
.add_new {
  background-color: #4464bb;
  padding: 5px 12px;
}
.add_new:hover {
  background-color: #6887da;
}
</style>
