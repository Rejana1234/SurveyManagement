<template>
  <div id="add_user">
    <div class="card">
      <form v-on:submit.prevent="addUser">
        <div class="container">
          <div class="row">
            <div class="col-25">
              <label for="fname">Survey Firm's File Reference No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="survey_firm_reference_no"
                name="survey_firm_reference_no"
                v-model="surveyFirms.survey_firm_reference_no"
                placeholder="Enter Survey Reference No."
              />
              <span
                v-if="errors.survey_firm_reference_no"
                class="danger_text"
                >{{ errors.survey_firm_reference_no[0] }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="role">Survey Firm</label>
            </div>
            <div class="col-75">
              <select
                name="survey_firm"
                id="survey_firm"
                v-model="surveyFirms.survey_firm"
                class="box"
                required
              >
                <option value="" selected disabled>Select Survey Firm</option>
                <option
                  :value="surveyFirm.id"
                  v-for="surveyFirm in survey_firms"
                  :key="surveyFirm.id"
                >
                  {{ surveyFirm.name }}
                </option>
              </select>
              <span v-if="errors.surveyFirm" class="danger_text">{{
                errors.surveyFirm[0]
              }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Assign" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { http } from "../../service/http_service";
import { mapState, mapActions } from "vuex";

export default {
  name: "InterPortAddUser",

  data() {
    return {
      surveyFirms: {
        survey_firm: "",
        survey_firm_reference_no: "",
        // email: '',
        // password: '',
        // phone: '',
        // survey_firm: '',
        // role: ''
      },

      errors: {},
    };
  },

  computed: {
    ...mapState({
      survey_firms: (state) => state.surveyfirm.firms,
      roles: (state) => state.role.roles,
      message: (state) => state.users.success_message,
    }),
  },

  mounted() {
    this.getRole();
    this.getSurveyFirm();
  },

  methods: {
    ...mapActions({
      getRole: "role/get_role",
      getSurveyFirm: "surveyfirm/get_firm",
    }),

    addUser: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();
        formData.append("survey_firm", this.surveyFirms.survey_firm);
        formData.append(
          "survey_firm_reference_no",
          this.surveyFirms.survey_firm_reference_no
        );
        // formData.append('phone', this.userData.phone);
        // formData.append('password', this.userData.password);
        // formData.append('survey_firm', this.userData.survey_firm);
        // formData.append('role', this.userData.role);
        return http()
          .post("v1/work_orders/assigned_survey_firm/" + id, formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.surveyFirms = {};
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
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.2rem;
  margin-top: 1%;
  margin-bottom: 2.5rem;
}
.box {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
select {
  width: 70%;
  height: 40px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
