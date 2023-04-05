<template>
  <div class="card">
    <h1>Survey Report Details</h1>
    <div class="rows">
      <div>
        <div class="col-25">
          <label><h2>Survey ID</h2></label>
        </div>
        <div class="col-75">
          {{ survey_details.survey_id }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h2>Reference</h2></label>
        </div>
        <div class="col-75">
          {{ response.survey_reference_no }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h2>Project Name</h2></label>
        </div>
        <div class="col-75">
          {{ response.work_order.project_name }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h2>Surveyor Name</h2></label>
        </div>
        <div class="col-75">
          {{ response.survey_appointment.surveyor.name }}
        </div>
      </div>
      <div class="col-25">
        <label><h2>Damage Type:</h2></label>
        <div
          class="col-75"
          v-for="damage_name in survey_details.survey_details_damage"
          :key="damage_name.id"
        >
          {{ damage_name.damage_type.damage_type_name }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h2>Description</h2></label>
        </div>
        <div class="col-75">
          {{ survey_details.description }}
        </div>
      </div>
    </div>
    <div class="">
      <div class="">
        <label><h2>Image</h2></label>
      </div>
      <div class="rows">
        <div
          v-for="image in survey_details.survey_details_image"
          :key="image.id"
          style="width: 180%"
        >
          <img :src="image.image" />
        </div>
      </div>
    </div>
    <div class="row">
      <router-link to="/dashboard/survey_details">
        <input type="button" value="Back" class="back-btn" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { http } from "../../../service/http_service";
export default {
  name: "InterportSurvey",

  components: {},

  data() {
    let sortOrders = {};
    return {
      survey_details: [],
      response: [],
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
      message: (state) => state.survey.success_message,
    }),
  },

  mounted() {
    this.getAllSurvey();
  },

  methods: {
    getAllSurvey() {
      let id = this.$route.params.id;
      return http()
        .get(`v1/admin_survey_details/${id}`)
        .then((response) => {
          this.survey_details = response.data.survey_details;
          this.response = response.data;
          console.log(this.survey_details);
          console.log(this.survey_details.description);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
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

.rows {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3%;
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
  margin-right: 0;
}
.col-75 {
  font-size: initial;
  margin-left: 11px;
}
</style>
