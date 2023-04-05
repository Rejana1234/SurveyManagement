<template>
  <div id="add_summary_report">
    <div class="card">
      <div class="container">
        <h2>Add Summary Report</h2>
        <form v-on:submit.prevent="addSummaryReport">
          <div class="row">
            <div class="col-25">
              <label for="dname">Conditions of remaining packages</label>
            </div>
            <div class="col-75">
              <input type="text" name="condition_of_remaining_packages"
                v-model="summary_report_data.condition_of_remaining_packages" class="box">
              <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="dname">Note</label>
            </div>
            <div class="col-75">
              <textarea cols="10" name="note" v-model="summary_report_data.note" class="box"></textarea>
              <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="dname">Remarks</label>
            </div>
            <div class="col-75">
              <input type="text" name="remarks" v-model="summary_report_data.remarks" class="box">
              <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="applicant">Signature</label>
            </div>
            <div class="col-75">
              <select name="signature" id="signature" v-model="summary_report_data.signature" class="box">
                <option value="">Select signature</option>
                <option :value="client.id" v-for="client in clients" :key="client.id">{{ client.name }}</option>
              </select>
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
import { mapActions, mapState } from 'vuex';

export default {
  name: "InterportAddSummerReport",
  title: "Interport - Add Summary Report",

  data() {
    return {
      summary_report_data: {
        condition_of_remaining_packages: '',
        note: '',
        remarks: '',
        signature: '',
      },
      errors: {}
    }
  },

  computed: {
    ...mapState({
      clients: state => state.summary_report.clients,
      message: state => state.summary_report.success_message
    })
  },

  mounted(){
    this.getAllClients();
  },

  methods: {
    ...mapActions({
      getAllClients: 'summary_report/get_clients'
    }),

    addSummaryReport: async function () {
      try {
        let survey_id = this.$route.params.survey_id;

        let formData = new FormData();

        formData.append('survey_id', survey_id);
        formData.append('condition_of_remaining_packages', this.summary_report_data.condition_of_remaining_packages);
        formData.append('note', this.summary_report_data.note);
        formData.append('remarks', this.summary_report_data.remarks);
        formData.append('signature', this.summary_report_data.signature);

        await this.$store.dispatch("summary_report/add_summary_report", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.summary_report_data = {};
          this.$router.go(-1);
        }).catch((err) => {
          console.log(err);
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
    }
  }
}
</script>

<style scoped>
#add_summary_report {
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

img {
  width: 20% !important;
}

select {
  width: 70%;
  height: 38px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding-left: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>