<template>
  <div id="add_other_report">
    <div class="card">
      <div class="container">
        <h2>Add Other Report</h2>
        <form v-on:submit.prevent="addOtherReport">
          <div class="row">
            <div class="col-25">
              <label for="dname">Name</label>
            </div>
            <div class="col-75">
              <input type="text" name="name" v-model="otherReportData.name" class="box" />
              <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="applicant">Report File Upload</label>
            </div>
            <div class="col-75">
              <input
                type="file"
                class="box file_upload"
                name="report_file"
                v-on:change="attachImage"
                ref="newReportFile"
              />
              <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
            <router-link :to="`/dashboard/survey/${this.$route.params.survey_id}`" style="float: right">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InterportAddOtherReport",
  title: "Interport - Add Other Report",

  data() {
    return {
      otherReportData: {
        name: "",
        report_file: "",
      },
      errors: {},
    };
  },

  mounted() {},

  computed: {
    ...mapState({
      message: (state) => state.other_report.success_message,
    }),
  },

  methods: {
    attachImage: function () {
      //to use some file todo
      this.otherReportData.report_file = this.$refs.newReportFile.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.otherReportData.report_file);
    },

    addOtherReport: async function () {
      try {
        let survey_id = this.$route.params.survey_id;

        let formData = new FormData();

        formData.append("survey_id", survey_id);
        formData.append("name", this.otherReportData.name);
        formData.append("report_file", this.otherReportData.report_file);

        await this.$store
          .dispatch("other_report/store_other_report", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.otherReportData = {};
            this.$router.go(-1);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#add_other_report {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.box {
  width: 100%;
}

.file_upload {
  border: 1px solid #ccc;
  width: 100%;
  padding: 5px;
  margin: 5px;
  border-radius: 4px;
}
</style>
