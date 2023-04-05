<template>
  <div id="dd_report">
    <loader
      :object="styling.objectcolor"
      :color1="styling.animationcolor"
      :color2="styling.animationcolor2"
      :size="styling.size"
      :speed="styling.speed"
      :bg="styling.bgcolor"
      :objectbg="styling.objectbg"
      :opacity="styling.opacity"
      :name="selected"
      :disableScrolling="styling.disableScrolling"
    ></loader>

    <div class="card">
      <h1>Survey Reports</h1>
      <h2 v-if="this.surveys.has_dd_report == 1">Report Cover Photos</h2>
      <br />
      <div class="row" style="width: 100%" v-if="this.surveys.has_dd_report == 1">
        <div>
          <div class="col-75" style="float: left; width: 100%; margin-top: 2px">
            1st Image <input type="file" @change="previewFirstImage" name="first_image" />
          </div>
          <div class="survey_firm_footer" v-if="preview_first_image">
            <img
              :src="preview_first_image"
              alt=""
              style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
            />
          </div>
          <div class="survey_firm_footer" v-else>
           <!-- {{this.selective_images.first_image}} -->
            <img
              :src="this.selective_images.first_image"
              style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
            />
          </div>
        </div>

        <div>
          <div class="col-75" style="margin-top: 2px">
            2nd Image <input type="file" @change="previewSecondImage" name="second_image" />
          </div>
          <div class="survey_firm_footer" v-if="preview_second_image">
            <img
              :src="preview_second_image"
              alt=""
              style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
            />
          </div>
          <div class="survey_firm_footer" v-else>
            <!-- {{ this.selective_images.second_image }} -->
            <img
              :src="this.selective_images.second_image"
              style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
            />
          </div>
        </div>
        <div class="flex-item1" v-if="this.surveys.has_dd_report == 1">
          <div class="report-area" @click="reportDropdown()">
            <p style="align-items: center; color: white; font-size: 1rem">Get Reports</p>
            <div class="report">
              <ul class="report-link" v-bind:class="{ show: isshow }">
                <button
                  v-if="this.surveys.has_dd_report == 1"
                  type="button"
                  value="summary_report"
                  id="summary_report"
                  class="Summary"
                  @click="downloadReports($event)"
                >
                  Summary Report
                </button>
                <button
                  v-if="this.surveys.has_dd_report == 1"
                  type="button"
                  value="final_report"
                  class="Final"
                  @click="downloadReports($event)"
                >
                  Final Report
                </button>
                <button
                  v-if="this.surveys.has_dd_report == 1"
                  type="button"
                  value="final_photos"
                  class="Fhoto"
                  @click="downloadReports($event)"
                >
                  Final photo Gallery
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="this.surveys.has_dd_report == 1">
      <h2 style="margin-top: 3%">Daily Discharge Reports</h2>
      <!-- <div class="flex-container-flex-end" v-if="this.surveys.has_dd_report == 1">
        <div class="flex-item">
          <input type="date" name="start_date" v-model="filterWorkOrderData.start_date" value="" />
        </div>
        <div class="flex-item">
          <input type="date" name="end_date" v-model="filterWorkOrderData.end_date" value="" />
        </div>
        <div class="flex-item">
          <button class="btn" @click="getSurveyReports()">Filter</button>
        </div>
      </div> -->

      <div class="flex-container mobile-flex-container">
        <div class="flex-item">
          Show:
          <select
            name="cars"
            class="entries_count"
            id="cars"
            style="appearance: auto"
            v-model="tableData.length"
            @change="getSurveyReports()"
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
            @input="getSurveyReports()"
            placeholder="Search here"
            class="search"
          />
        </div>
      </div>

      <div>
        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
            <tr v-show="surveys_reports.length" v-for="(report, index) in surveys_reports" :key="index">
              <td data-label="Report no." style="text-align: center">
                {{ index + 1 }}
              </td>
              <!-- <td data-label="Report no." style="text-align: center" v-else>--</td> -->
              <td data-label="Type of Report" style="text-align: center">
                {{ report.method_of_discharge }}
              </td>
              <td data-label="Remark" style="text-align: center">
                {{ report.remark }}
              </td>
              <td data-label="Status" style="text-align: center" class="chips2" v-if="report.status == 0">
                New Report
              </td>
              <td data-label="Status" style="text-align: center" class="chips1" v-if="report.status == 1">Approved</td>
              <td data-label="Status" style="text-align: center" class="chips" v-if="report.status == 2">
                Under Review
              </td>
              <td data-label="Actions" style="text-align: center">
                <div class="dropdown">
                  <button class="dropbtn" type="button">
                    <span class="material-icons-sharp"> more_horiz </span>
                  </button>
                  <div class="dropdown-content">
                    <!-- <a :href="download_report_url + report.id" target="_blank">
                      <button type="button" class="actio-button-margin appoint">
                        Download DD
                      </button>
                    </a> -->
                    <button
                      title="Download"
                      type="button"
                      class="actio-button-margin download"
                      @click="downloadDailyDischargeReport(report.id)"
                    >
                      Download
                    </button>
                    <!-- <a :href="download_report_url + report.id" target="_blank"> -->
                    <button
                      title="Approved"
                      type="button"
                      value="1"
                      class="actio-button-margin appoint"
                      @click="changeStatus($event, report)"
                      v-if="report.status != 1"
                    >
                      Approve
                    </button>
                    <!-- </a> -->
                    <!-- <a :href="download_report_url + report.id" target="_blank"> -->
                    <button
                      title="Review"
                      type="button"
                      value="2"
                      class="actio-button-margin review"
                      @click="changeStatus($event, report)"
                      v-if="report.status != 1"
                    >
                      Review
                    </button>
                    <!-- </a> -->
                  </div>
                </div>
              </td>
            </tr>
            <tr v-show="!surveys_reports.length">
              <td colspan="5">No Data Found</td>
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
            <pagination :pagination.sync="pagination" :offset="5" @paginate="getSurveyReports()"></pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="this.surveys.has_dd_report == 1">
      <summaryReport />
    </div>

    <div class="card" style="margin-bottom: 20px" v-if="this.surveys.has_dd_report == 1">
      <finalReport />
    </div>

    <div class="card" style="margin-bottom: 20px">
      <otherReport />
    </div>
    <div class="row">
      <input type="button" value="Back" @click="back()" class="back-btn" />
    </div>
  </div>
</template>

<script>
import DataTable from "../../../components/datatable/Datatable";
import Pagination from "../../../components/datatable/Pagination.vue";
import SummaryReport from "./summary_report/SummaryReport.vue";
import FinalReport from "./final_report/FinalReport.vue";
import OtherReport from "./other_report/OtherReport.vue";

import { mapState } from "vuex";

import { http } from "../../../service/http_service";
import { downloadPdf } from "../../../service/http_service";

export default {
  name: "InterportW_Orders",
  title: "Inter-Port - Work_Orders",

  components: {
    datatable: DataTable,
    pagination: Pagination,
    summaryReport: SummaryReport,
    finalReport: FinalReport,
    otherReport: OtherReport,
  },

  data() {
    let sortOrders = {};
    let columns = [
      { label: "Report no.", name: "id" },
      { label: "Type of Report", name: "method_of_discharge" },
      { label: "Remark", name: "remark" },
      { label: "Status", name: "status" },
      { label: "Action", name: "action" },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    let apiUrl = this.$store.state.apiUrl;
    return {
      surveys: [],
      selective_images: [],
      // has_dd_report:"",
      reportData: {
        first_image: "",
        second_image: "",
        survey_id: "",
      },
      isshow: false,
      visible: false,
      surveys_reports: [],
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
      download_report_url: apiUrl + "v1/download/dd_report/",
      download_dd_report_url: apiUrl + "v1/download/dd_report/",
      baseUrl: apiUrl,
      text_file: "",
      preview_first_image: "",
      preview_second_image: "",
      selected: "",
      value: 2,
      styling: {
        objectcolor: "#ff9633",
        animationcolor: "#ffffff",
        animationcolor2: "#17fd3d",
        objectbg: "#999793",
        opacity: 80,
        bgcolor: "#343a40",
        size: 5,
        speed: 2,
        disableScrolling: true,
      },
      code: ``,
      flag: false,
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.w_order.success_message,
      iml_reference_no: (state) => state.w_order.iml_reference_no,
    }),
  },

  mounted() {
    this.getSurveyReports();
    this.getAllSurvey();
    this.flag = true;
    this.getSelectiveImages();
  },

  methods: {
    loader(loader) {
      this.selected = loader;
      this.code = `<loader object="${this.styling.objectcolor}" color1="${this.styling.animationcolor}" color2="${this.styling.animationcolor2}" size="${this.styling.size}" speed="${this.styling.speed}" bg="${this.styling.bgcolor}" objectbg="${this.styling.objectbg}" opacity="${this.styling.opacity}" disableScrolling="${this.styling.disableScrolling}" name="${this.selected}"></loader>`;
      const body = document.getElementsByTagName("html")[0];
      body.classList.add("overflow-hidden");
      setTimeout(() => {
        this.selected = "";
        const body = document.getElementsByTagName("html")[0];
        body.classList.remove("overflow-hidden");
      }, this.value * 1000);
    },


    getSelectiveImages: async function () {
      let id = this.$route.params.id;
      return http()
        .get(`v1/surveys/get_selective_images/${id}`)
        .then((response) => {
          this.selective_images = response.data;
        });
    },


    getAllSurvey() {
      let id = this.$route.params.id;
      return http()
        .get(`v1/admin_survey_details/${id}`)
        .then((response) => {
          this.loader("circular");
          this.surveys = response.data.survey;
          // this.response = response.data;
          // console.log(this.surveys.has_dd_report);
          // console.log(this.survey_details.description);
        });
    },

    previewFirstImage: async function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_first_image = e.target.result;
        };
        this.reportData.first_image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }

      try {
        let formData = new FormData();
        formData.append("survey_id", this.$route.params.id);
        formData.append("first_image", this.reportData.first_image);
        return http()
          .post("v1/surveys/store/photo", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Photo Stored Sucessfuly",
              showConfirmButton: false,
              timer: 1500,
            });

            this.reportData = {};
            this.$router.go(0);
          });
      } catch (e) {
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

    previewSecondImage: async function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_second_image = e.target.result;
        };
        this.reportData.second_image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      try {
        let formData = new FormData();
        formData.append("survey_id", this.$route.params.id);
        formData.append("second_image", this.reportData.second_image);
        return http()
          .post("v1/surveys/store/photo", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Photo Stored Sucessfuly",
              showConfirmButton: false,
              timer: 1500,
            });

            this.reportData = {};
            this.$router.go(0);
          });
      } catch (e) {
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

    addImage: async function () {
      try {
        let formData = new FormData();
        formData.append("first_image", this.reportData.first_image);
        formData.append("second_image", this.reportData.second_image);
        return http().post("v1/survey_details/change_status/", formData);
      } catch (e) {
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

    back() {
      this.$router.go(-1);
    },

    downloadReports(event) {
      let value = event.target.value;
      var url = this.baseUrl + "v1/download/" + value + "/" + this.$route.params.id;
      return downloadPdf(url, value + "__" + this.iml_reference_no);
    },

    reportDropdown() {
      this.isshow = !this.isshow;
    },

    downloadDailyDischargeReport(id) {
      let url = this.download_dd_report_url + id;
      return downloadPdf(url, "Daily_Discharge_Report__" + this.iml_reference_no);
    },

    changeStatus(event, report) {
      let surveyDetailsID = report.id;
      let statusID = event.target.value;
      // return report.id;
      console.log(event.target.value, report.id);
      return http()
        .post("v1/survey_details/change_status/" + surveyDetailsID + "/" + statusID)
        .then((response) => {
          console.log(response);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getSurveyReports() {
      console.log("Here inside fun.");
      this.tableData.draw++;
      let params = new URLSearchParams();
      params.append("page", this.pagination.current_page);
      params.append("draw", this.tableData.draw);
      params.append("length", this.tableData.length);
      params.append("search", this.tableData.search);
      params.append("column", this.tableData.column);
      params.append("dir", this.tableData.dir);

      return http()
        .get("v1/survey_details/getData/" + this.$route.params.id + params)
        .then((response) => {
          this.surveys_reports = response.data;
          // console.log(response.data);
          this.pagination = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showImage(img) {
      let server_Path = this.$store.state.serverPath;
      return server_Path + "/storage/uploads/work_orders/image/" + img;
    },

    getImage(img)
    {
      let url = "http://10.104.0.4"

      return url+"/home/storage/"+img;
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

    deleteW_Orders: async function (w_order) {
      let id = w_order.id;

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
#dd_report {
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

.flex-container-flex-end {
  display: flex;
  text-align: center;
  justify-content: flex-end;
}
#work_order_status {
  border: 1px solid #aaa !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  padding: 14px !important;
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
  background-color: rgb(60, 60, 247);
}

button {
  width: fit-content;
  padding: 5px 5px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 2%;
}
.Summary {
  background-color: rgba(239, 161, 72, 0.82);
  font-size: 11px;
  padding: 10px;
  /* border-radius: 5px; */
}
.Summary:hover {
  background-color: rgba(177, 109, 30, 0.82);
}
.Summary h5 {
  margin-left: 20%;
  margin-top: -17%;
}
.Final {
  background-color: rgba(74, 148, 228, 0.82);
  font-size: 11px;
  padding: 10px;
  margin-top: 1%;
  /* border-radius: 5px; */
}
.Final:hover {
  background-color: rgba(72, 122, 230, 0.82);
}
.Final h5 {
  margin-left: 20%;
  margin-top: -17%;
}
.Other {
  background-color: rgba(53, 107, 226, 0.82);
  font-size: 11px;
  margin-top: 1%;
  padding: 10px;
  /* border-radius: 5px; */
}
.Other:hover {
  background-color: rgba(28, 62, 144, 0.82);
}
.Other h5 {
  margin-left: 20%;
  margin-top: -17%;
}
.Fhoto {
  background-color: rgba(62, 216, 236, 0.82);
  font-size: 11px;
  margin-top: 1%;
  padding: 10px;
  /* border-radius: 5px; */
}
.Fhoto:hover {
  background-color: rgba(19, 135, 177, 0.82);
}
.Fhoto h5 {
  margin-left: 20%;
  margin-top: -17%;
}
.Photo {
  background-color: rgb(79 222 181 / 82%);
  font-size: 11px;
  margin-top: 1%;
  padding: 10px;
  /* border-radius: 5px; */
}
.Photo:hover {
  background-color: rgba(39, 137, 110, 0.82);
}
.Photo h5 {
  margin-left: 20%;
  margin-top: -17%;
}
.chips {
  width: 45%;
  margin-top: 58px;
  margin-left: 83px;
  margin-right: 24px;
  background-color: #cea1298c;
}
.chips1 {
  width: 45%;
  margin-top: 58px;
  margin-left: 83px;
  margin-right: 24px;
  color: #595050;
  background-color: #5ec83b83;
}
.chips2 {
  width: 45%;
  margin-top: 58px;
  margin-left: 83px;
  margin-right: 24px;
  background-color: #ebc1a0;
}
th,
td {
  padding: 21px;
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
  /* background-color: #f1f1f1; */
  border-radius: 5px;
  background: rgb(255, 255, 255);
  min-width: 100px;
  right: 0;
  /* box-shadow: 0px 6px 12px 0px rgb(0 0 0 / 20%); */
  box-shadow: 4px 4px 16px rgba(108, 54, 121, 0.1);
  /* top: calc(100% + 10px); */
  z-index: 4;
  /* opacity: 0; */
  /* position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgb(255, 255, 255);
  padding: 10px 0;
  box-shadow: 4px 4px 16px rgba(108, 54, 121, 0.1);
  border-radius: 10px;
  width: 160px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease; */
  /* */
}

.active {
  opacity: 2;
  pointer-events: visible;
  top: 100%;
  display: none;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 5px 5px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
/* .dropdown:hover .download{
  background-color: #3e8e41;
} */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  background-color: white;
}

.dropdown-menu {
  position: absolute;
  border-radius: 5px;
  border-top-color: #c9d7f1;
  border-right-color: #36c;
  border-bottom-color: #36c;
  border-left-color: #a2bae7;
  border-style: solid;
  border-width: 1px;
  z-index: 22;
  padding: 0;
  background-color: white;
  overflow: hidden;
  font-size: small;
  font-family: Arial;
  line-height: 2em;
  word-spacing: 0;
  margin-top: 2px;
}

.dropdown-menu a {
  font-size: 1.25em;
  color: #00c;
  padding: 5px 5px;
  text-decoration: none;
  background: white;
  display: block;
  cursor: pointer;
}

.dropdown-menu a:hover {
  background: #00c;
  color: white;
}
.download {
  padding: 5px;
  background-color: rgb(97, 215, 228);
  border: 1px solid rgb(97, 207, 219);
}
.download:hover {
  background-color: rgb(45, 139, 239);
}
.appoint {
  padding: 5px;
  background-color: rgb(72, 229, 61);
  border: 1px solid rgb(72, 229, 61);
}
.appoint:hover {
  background-color: rgb(26, 179, 15);
}
.review {
  padding: 5px;
  background-color: rgb(20, 147, 182);
  border: 1px solid rgb(20, 147, 182);
}
.review:hover {
  background-color: rgb(4, 89, 113);
}
/* button {
  width: 100%;
  margin-top: 1%;
} */
.flex-item1 {
  /* margin-left: 15%; */
  /* margin-top: 2%; */
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
.flex-item1 button {
  width: 100%;
}
/* dropdown */

.flex-item1 .report-area {
  /* width: 10%; */
  height: 36px;
  background-color: #01579b;
  margin-right: 0%;
  color: rgb(238 239 240);
  /* font-weight: 600; */
  /* margin-top: -3%; */
  /* margin-left: 90%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #324568; */
  margin-right: 10px;
  width: 88px;
  border-radius: 5px;
  justify-content: center;
  cursor: pointer;
  /* gap: 4rem;*/
}

.flex-item1 .report-area:hover {
  background-color: #0c111a;
}

.flex-item1 .report-area .theme-btn {
  display: flex;
  background: var(--color-light);
  width: 5rem;
  height: 2rem;
  border-radius: var(--border-radius-2);
  cursor: pointer;
}

.flex-item1 .report-area .theme-btn span {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.flex-item1 .report-area .theme-btn .active {
  background: var(--color-dark);
  border-radius: var(--border-radius-2);
  color: var(--color-white);
}

.flex-item1 .report-area .profile {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
}

.flex-item1 .report-area .profile-photo {
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
}

/* .flex-item1 .report-area button {
  display: none;
} */

.flex-item1 .report-link.show {
  display: block;
}

.flex-item1 .report {
  position: relative;
}
.flex-item1 .report img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
.flex-item1 .report .report-link {
  position: absolute;
  top: calc(100% + 10px);
  margin-right: -44%;
  margin-top: -17%;
  right: 0;
  background: rgb(255, 255, 255);
  padding: 10px 0;
  box-shadow: 4px 4px 16px rgba(108, 54, 121, 0.1);
  border-radius: 10px;
  width: 160px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.flex-item1 .report .report-link.show {
  opacity: 1;
  pointer-events: visible;
  top: 100%;
  margin-top: 16px;
}
.flex-item1 .report .report-link a {
  padding: 10px 16px;
  display: flex;
  grid-gap: 10px;
  font-size: 14px;
  color: var(--dark);
  align-items: center;
  transition: all 0.3s ease;
}
.flex-item1 .report .report-link a:hover {
  background: var(--grey);
}
h3 {
  background-color: #3c10df;
  color: #f8f8f8;
  padding: 6px;
  font-size: 16px;
  margin-top: -50%;
  border: none;
  width: 136%;
  border-radius: 5px;
  text-align: center;
}
.icon {
  margin-left: -62%;
  margin-bottom: 4%;
}
.photo {
  /* margin-left: 63%; */
  float: left;
  width: 100%;
  margin-top: -44px;
}
.row {
  display: flex;
  /* margin-top: 1%; */
  /* margin-left: 20%; */
}
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  /* border-radius: 6px; */
  margin-right: 0;
}
input[type="text"] {
  width: 104%;
}
input[type="date"] {
  width: 100%;
  height: 38px;
}
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-left: 0%;
}
h4 {
  margin-bottom: 1rem;
}
.back-btn {
  margin-left: 93%;
}
</style>
