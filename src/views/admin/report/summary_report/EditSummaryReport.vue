<template>
    <div id="edit_summary_report">
        <div class="card">
            <div class="container">
                <h2>Edit Summary Report</h2>
                <form v-on:submit.prevent="editSummaryReport">
                  <div class="row">
                    <div class="col-25">
                      <label for="dname">Conditions of remaining packages</label>
                    </div>
                    <div class="col-75">
                      <input type="text" v-model="editSummaryData.condition_of_remaining_packages" name="condition_of_remaining_packages" class="box">
                      <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="dname">Note</label>
                    </div>
                    <div class="col-75">
                      <textarea cols="10" v-model="editSummaryData.note" name="note" class="box"></textarea>
                      <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="dname">Remarks</label>
                    </div>
                    <div class="col-75">
                      <input type="text" v-model="editSummaryData.remarks" name="remarks" class="box">
                      <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="applicant">Signature</label>
                    </div>
                    <div class="col-75">
                      <select name="signature" id="signature" v-model="editSummaryData.signature" class="box">
                        <option value="">Select signature</option>
                        <option :value="client.id" v-for="client in clients" :key="client.id">{{ client.name }}</option>
                      </select>
                      <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                    </div>
                  </div>

                  <div v-if="signature">
                    <img src="" ref="summarySignatureDisplay" width="150px" height="150px">
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

    import { mapState, mapActions } from 'vuex';
    export default{
        name: "InterportAddSummerReport",
        title: "Interport - Add Summary Report",

        data(){
            return{
                errors: {}
            }
        },

        computed: {
          ...mapState({
            editSummaryData: state => state.summary_report.summary_report,
            clients: state => state.summary_report.clients,
            message: state => state.summary_report.success_message
          })
        },

        mounted(){
          this.getEditSummary(this.$route.params.summary_id);
          this.getAllClients();
        },

        methods: {
            ...mapActions({
              getEditSummary:'summary_report/editSummaryReport',
              getAllClients: 'summary_report/get_clients'
            }),

            attachImage: function(){
                //to use some file todo
                this.signature = this.$refs.summary_signature.files[0];
                let reader = new FileReader();
                reader.addEventListener('load', function () {
                    this.$refs.summarySignatureDisplay.src = reader.result;
                }.bind(this),false);
                reader.readAsDataURL(this.signature);
            },

            editSummaryReport: async function(){
                try{
                    let survey_id = this.$route.params.survey_id;
                    let id = this.$route.params.summary_id;

                    let formData = new FormData();

                    formData.append('survey_id', survey_id);
                    formData.append('condition_of_remaining_packages', this.editSummaryData.condition_of_remaining_packages);
                    formData.append('note', this.editSummaryData.note);
                    formData.append('remarks', this.editSummaryData.remarks);
                    formData.append('signature', this.editSummaryData.signature);
                    formData.append('_method', 'PUT');

                    await this.$store.dispatch("summary_report/update_summary_report", {id:id, data:formData}).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        this.summary_report_data = {};
                    }).catch((err) => {
                        console.log(err);
                    });
                }catch(e){
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
#edit_summary_report {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.box{
    width: 100%;
}

.file_upload{
    border: 1px solid #ccc;
    width: 100%;
    padding: 5px;
    margin: 5px;
    border-radius: 4px;
}

img{
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