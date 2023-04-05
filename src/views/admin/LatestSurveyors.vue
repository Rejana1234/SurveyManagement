<template>
  <div id="work_order">
    <div class="table_card">
      <h3 style="margin-bottom: 20px">Latest Surveyors</h3>
      <div>
        <table class="short_table">
          <thead>
            <tr>
              <th>#Sl No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dob</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="records.length"
              v-for="record in records"
              :key="record.id"
            >
              <td data-label="#Sl" style="text-align: left">
                {{ record.id }}
              </td>
              <td data-label="Image" style="text-align: left">
                <img :src="record.image" />
              </td>
              <td data-label="Name" style="text-align: left">
                {{ record.name }}
              </td>
              <td data-label="Email" style="text-align: left">
                {{ record.email }}
              </td>
              <td data-label="Phone" style="text-align: left">
                {{ record.phone }}
              </td>
              <td data-label="Dob" style="text-align: left">
                {{ record.dob }}
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
      users: [],
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
          this.records = response.data.record.surveyors;
          this.users = response.data.record.users;
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

.chip {
  margin-top: 23px;
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
  width: 47%;
}

.chip1 {
  margin-top: 23px;
  display: inline-flex;
  padding: 4px 6px;
  height: 22px;
  font-size: 12px;
  line-height: 13px;
  border-radius: 32px;
  background-color: #ff8901;
  margin-left: 50px;
  margin-right: 4px;
  color: white;
  width: 47%;
}
</style>
