<template>
  <div id="work_order">
    <div class="table_card">
       <h3 style="margin-bottom: 20px">Latest Surveys</h3>
      <div>
        <table class="short_table">
          <thead>
            <tr>
              <th>#Sl No</th>
              <th>File</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="records.length"
              v-for="record in records"
              :key="record.id"
            >
              <td data-label="#Sl No" style="text-align: left">
                {{ record.id }}
              </td>
              <td data-label="Work Order" style="text-align: left">
                {{record.work_order.project_name}}
              </td>
              <td data-label="Start Date" style="text-align: left">
                {{ record.start_date }}
              </td>
              <td data-label="End Date" style="text-align: left">
                {{ record.end_date }}
              </td>
              <td

                      data-label="Status"
                      style="text-align: left"
                      class="chips"
                      v-if="record.status == 1"
              >
                Completed
              </td>
              <td
                      data-label="Status"
                      style="text-align: left"
                      class="chips1"
                      v-if="record.status == 2"
              >
                Inprogress
              </td>
              <td
                      data-label="Status"
                      style="text-align: left"
                      class="chips2"
                      v-if="record.status == 0"
              >
                Not Assign
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
          this.records = response.data.record.surveys;
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
  margin-top: 25px;
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
  width: 55%;
}

.chips1 {
  margin-top: 23px;
  width: 40%;
  margin-left: 6px;
}

.chips1 {
  width: 40%;
  margin-left: 6px;
}
.chips2 {
  width: 40%;
  margin-left: 6px;
}
</style>
