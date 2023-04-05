<template>
  <div class="card">
    <h2>Surveyor Details</h2>
    <div class="rows">
      <div>
        <div class="col-25">
          <label><h3>ID</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.id }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>User ID</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.user_id }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>Surveyor Type</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.type_name }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>Surveyor Name</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.name }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>Address</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.address }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>Phone Number</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.user.phone }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>Email</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.user.email }}
        </div>
      </div>
      <div>
        <div class="col-25">
          <label><h3>DOB</h3></label>
        </div>
        <div class="col-75">
          {{ surveyor.dob }}
        </div>
      </div>
      <div class="">
        <div class="">
          <label><h3>NID</h3></label>
        </div>
        <div class="rows">
          <div style="width: 180%;height: 100%;">
            <img :src="surveyor.nid" />
          </div>
        </div>
      </div>
      <div class="">
        <div class="">
          <label><h3>Other Documents</h3></label>
        </div>
        <div class="rows">
          <div style="width: 180%">
            <img :src="surveyor.others_doc" />
          </div>
        </div>
      </div>
      <div class="">
        <div class="">
          <label><h3>Image</h3></label>
        </div>
        <div class="rows">
          <div style="width: 180%">
            <img :src="surveyor.image" />
          </div>
        </div>
      </div>
      <div class="">
        <div class="">
          <label><h3>Vacine Card</h3></label>
        </div>
        <div class="rows">
          <div style="width: 180%">
            <img :src="surveyor.vacine_card" />
          </div>
        </div>
      </div>
      <div class="row">
        <router-link to="/dashboard/surveyor">
          <input type="button" value="Back" class="back-btn" />
        </router-link>
      </div>
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
      surveyor: [],
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
      let id = this.$route.params.user_id;
      return http()
        .get(`v1/surveyors/details/${id}`)
        .then((response) => {
          this.surveyor = response.data.surveyor;
          this.response = response.data;
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
.back-btn {
  margin-right: -207.7%;
}
h1 {
  margin-left: 0px;
}
</style>
