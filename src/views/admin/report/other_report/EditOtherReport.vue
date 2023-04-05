<template>
    <div id="edit_other_report">
        <div class="card">
            <div class="container">
              <h2>Edit Other Report</h2>
              <form v-on:submit.prevent="editOtherReport">

                <div class="row">
                  <div class="col-25">
                    <label for="dname">Name</label>
                  </div>
                  <div class="col-75">
                    <input type="text" name="name" v-model="editOthertData.name" class="box" />
                    <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                  </div>
                </div>
      
               
                <div class="row">
                  <div class="col-25">
                    <label for="applicant">Report File Upload</label>
                  </div>
                  <div class="col-75">
                    <input type="file" class="box file_upload" name="report_file" v-on:change="attachImage" ref="newReportFile">
                    <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                  </div>
                </div>

                <div class="row">
                    <iframe frameborder="5" width="100px" height="100px" class="pdf"></iframe>
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

    export default{
        name: "InterportEditOtherReport",
        title: "Interport - Edit Other Report",

        data(){
            return{
                report_file: '',
                errors: {}
            }
        },

       
        computed: {
            ...mapState({
                editOthertData: state => state.other_report.other_report,
                message: state => state.other_report.success_message
            })
        },

        mounted(){
            this.getEditOtherReport(this.$route.params.other_report_id);
        },


        methods: {
            ...mapActions({
                getEditOtherReport: 'other_report/edit_other'
            }),

            attachImage: function(){
                //to use some file todo
                this.report_file = this.$refs.newReportFile.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(this.report_file);
            },

            editOtherReport: async function(){
                try {
                    let survey_id = this.$route.params.survey_id;

                    let id = this.$route.params.other_report_id;

                    let formData = new FormData();

                    formData.append('survey_id', survey_id);
                    formData.append('name', this.editOthertData.name)
                    formData.append('report_file', this.report_file)
                    formData.append('_method', 'PUT')

                    await this.$store.dispatch('other_report/update_other_report', {id:id, data:formData}).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        this.getEditOtherReport(id);
                    }).catch((err) => {
                        console.log(err);
                    });
                } catch (error) {
                    console.log(error);
                }
            }

        }

    }
</script>

<style scoped>
#edit_other_report{
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

  .pdf{
    border: 1px solid #000;
    background-image: url('../../../../assets/pdf_icon_1.png');
}
</style>