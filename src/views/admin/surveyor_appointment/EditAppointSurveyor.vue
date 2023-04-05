<template>
  <div id="edit_survey">
    <div class="dcard">
      <form class="AddCountry-form" v-on:submit.prevent="editAppointSurveyor">
        <h2>Edit Appointed Surveyor</h2>
        <div class="row">
          <div class="col-25">
            <label for="surveyor_id">Surveyor Name</label>
          </div>
          <div class="col-75">
            <select
              id="surveyor_id"
              name="surveyor_id"
              class="box"
              v-model="editAppointSurveyorList.surveyor_id"
            >
              <option value="">Select Surveyor</option>
              <option
                v-for="(surveyor, index) in surveyors"
                :key="index"
                :value="surveyor.id"
              >
                {{ surveyor.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Survey_No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="survey_id"
              name="survey_id"
              v-model="editAppointSurveyorList.survey_id"
              accept="image/png, image/jpeg"
              disabled
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Start_date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              id="start_date"
              name="start_date"
              v-model="editAppointSurveyorList.start_date"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">End_date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              id="end_date"
              name="end_date"
              v-model="editAppointSurveyorList.end_date"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Save" />
          <router-link to="/dashboard/survey/surveyorappoint">
            <input type="button" value="Back" class="back-btn" />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EditAppointSurvey",

  data() {
    return {
      surveyData: {
        surveyor_id: "",
        survey_id: "",
        start_date: "",
        end_date: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editAppointSurveyorList: (state) =>
        state.appoint_surveyor.appointed_surveyor,
      surveyors: (state) => state.surveyors.surveyors,
      message: (state) => state.appoint_surveyor.success_message,
    }),
  },

  mounted() {
    this.getEditAppointSurveyor(this.$route.params.id);
    this.getAllSurveyor();
  },

  methods: {
    ...mapActions({
      getEditAppointSurveyor: "appoint_surveyor/edit_appointed_surveyor",
      getAllSurveyor: "surveyors/get_all_surveyor",
    }),

    editAppointSurveyor: async function () {
      try {
        let formData = new FormData();
        let id = this.$route.params.id;
        formData.append(
          "surveyor_id",
          this.editAppointSurveyorList.surveyor_id
        );
        formData.append("survey_id", this.editAppointSurveyorList.survey_id);
        formData.append("start_date", this.editAppointSurveyorList.start_date);
        formData.append("end_date", this.editAppointSurveyorList.end_date);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("appoint_surveyor/update_appointed_surveyor", {
            id: id,
            data: formData,
          })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditAppointSurveyor();
            this.$router.go(-1);
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
#edit_survey {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
