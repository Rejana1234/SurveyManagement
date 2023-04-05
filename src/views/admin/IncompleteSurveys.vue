<template>
  <div id="work_order">
    <div class="table_card">
       <h3 style="margin-bottom: 20px">Incomplete Surveys</h3>
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
          this.records = response.data.record.incomplete_surveys;
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
  width: 60%;
}

.chips1 {
    width: 60%;
    margin-left: 8px;
}
.chips2 {
  width: 60%;
  margin-left: 8px;
}
</style>
