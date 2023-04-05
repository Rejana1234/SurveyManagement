<template>
  <div id="work_order">
    <div class="table_card">
      <h3 style="margin-bottom: 20px">Latest Files</h3>
      <div>
        <table class="short_table">
          <thead>
            <tr>
              <th>#Sl No</th>
              <th>IML File Ref No.</th>
              <th>Survey Firm’s File Ref no.</th>
              <th>Name of the vessel/ship</th>
              <th>File opening date</th>
              <th>Club’s/Client’s File Ref no.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="records.length" v-for="record in records" :key="record.id">
              <td data-label="#Sl">
                {{ record.id }}
              </td>
              <td data-label="Project">
                {{ record.iml_reference_no }}
              </td>
              <td data-label="Client Name">
                {{ record.survey_firm_reference_no }}
              </td>
              <td data-label="Port Name">
                {{ record.vessel_name }}
              </td>
              <td data-label="Work Order Date">
                {{ record.file_opening_date }}
              </td>
              <td data-label="Work Order Date">
                {{ record.club_file_reference_no }}
              </td>
              <td
                data-label="Status"
                style="text-align: right; font-weight: 400"
                class="chips"
                v-if="record.status == 1"
              >
                Completed
              </td>
              <td
                data-label="Status"
                style="text-align: right; font-weight: 400"
                class="chips1"
                v-if="record.status == 2"
              >
                Inprogress
              </td>
              <td
                data-label="Status"
                style="text-align: right; font-weight: 400"
                class="chips2"
                v-if="record.status == 0"
              >
                Not Started
              </td>
            </tr>
            <tr v-show="!records.length">
              <td>No Data Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../service/http_service";

export default {
  name: "InterportW_Orders",
  data() {
    return {
      records: [],
    };
  },

  computed: {},

  mounted() {
    this.getAllRecords();
  },

  methods: {
    getAllRecords() {
      return http()
        .get("v1/records/latest")
        .then((response) => {
          this.records = response.data.record.work_orders;
        })
        .catch((error) => {
          console.log(error);
        });
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

.survey {
  background-color: rgb(60, 60, 247);
}

.chips {
  margin-top: 8px;
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #39cb5f;
  margin-left: 12px;
  margin-right: -18px;
  color: white;
  width: 70%;
}

.chips1 {
  width: 47%;
  margin-left: 48px;
  margin-top: 8px;
}
.chips2 {
  width: 54%;
  margin-left: 48px;
  margin-top: 17px;
}
td {
  /* text-align: center; */
  /* font-weight: 400; */
}
</style>
