<template>
    <div id="edit_final_report">
        <div class="card">
            <div class="container">
                <h2>Edit Final Report</h2>

                <form v-on:submit.prevent="editFinalReport">
                    <div class="row">
                        <div class="col-25">
                            <label for="applicant">Applicant</label>
                        </div>
                        <div class="col-75">
                            <select name="applicant" id="applicant" v-model="editFinalReportData.applicant" class="box">
                                <option value="">Select Applicant</option>
                                <option :value="1">Client</option>
                                <option :value="2">Consignee</option>
                                <option :value="3">Cnf</option>
                                <option :value="4">Cnf + Consignee</option>
                                <option :value="5">Shipowner_name</option>
                                <option :value="6">Charterer_name</option>
                                <option :value="7">Iml Client</option>
                            </select>
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="dname">Method Of Discharge</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="method_of_discharge" v-model="editFinalReportData.method_of_discharge" class="box">
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="dname">Nature Of Packing</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="nature_of_packing" v-model="editFinalReportData.nature_of_packing" class="box">
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="dname">Conditions of remaining packages</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="condition_of_remaining_packages"
                                v-model="editFinalReportData.condition_of_remaining_packages" class="box">
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="dname">Note</label>
                        </div>
                        <div class="col-75">
                            <textarea cols="10" name="note" v-model="editFinalReportData.note" class="box"></textarea>
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="dname">Remarks</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="remarks" v-model="editFinalReportData.remarks" class="box">
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row" v-for="fmak in editFinalReportData.makinglable" :key="fmak.id">
                        <div class="col-25">
                            <label for="dname">marking_on_the_label_packages</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="marking_label_packages[]" v-model="fmak.marking_on_the_label_packages">
                            <input type="hidden" name="marking_label_id[]" v-model="fmak.id">
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row" v-for="div in divs" :key="div.id">
                        <div class="col-25">
                            <label for="dname">marking_on_the_label_packages</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="marking_on_the_label_packages"
                                v-model="div.marking_on_the_label_packages">
                            <button @click="deletedRow(div.id)" class="delete_row_btn">Delete</button>
                            <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div @click="addRow()" class="add_row_btn">Add Marking Label Packages</div>
                    </div>

                    <div class="row">
                        <div class="col-25">
                            <label for="applicant">Signature</label>
                        </div>
                        <div class="col-75">
                            <select name="signature" id="signature" v-model="editFinalReportData.signature" class="box">
                                <option value="">Select signature</option>
                                <option :value="client.name" v-for="client in clients" :key="client.id">{{
                                    client.name
                                }}</option>
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
    name: "InterportEditFinalReport",
    title: "Interport - Edit Final Report",

    data() {
        return {
            divs: [],

            index: 0,

            errors: {}
        }
    },

    computed: {
        ...mapState({
            editFinalReportData: state => state.final_report.final_report,
            clients: state => state.final_report.clients,
            applicants: state => state.final_report.applicants,
            message: state => state.final_report.success_message
        })
    },

    mounted(){
        this.getEditFinalReport(this.$route.params.final_report_id);
        this.getAllClients();
        this.getApplicant(this.$route.params.survey_id)
    },

    methods: {
        ...mapActions({
            getEditFinalReport: 'final_report/edit_final_report',
            getAllClients: 'final_report/get_client',
            getApplicant: 'final_report/get_applicant'
        }),

        addRow() {
                this.divs.push({
                    id: this.index,
                    name: 'div' + this.index,
                    marking_on_the_label_packages: '',
                });
                this.index++;
            },

        deletedRow(id) {
            this.divs = this.divs.filter(d => d.id !== id);
        },

        editFinalReport: async function(){
            try {
                let survey_id = this.$route.params.survey_id;

                let id = this.$route.params.final_report_id;

                let formData = new FormData();

                formData.append('survey_id', survey_id);
                formData.append('applicant', this.editFinalReportData.applicant);
                formData.append('method_of_discharge', this.editFinalReportData.method_of_discharge);
                formData.append('nature_of_packing', this.editFinalReportData.nature_of_packing);
                formData.append('condition_of_remaining_packages', this.editFinalReportData.condition_of_remaining_packages);
                formData.append('note', this.editFinalReportData.note);
                formData.append('remarks', this.editFinalReportData.remarks);
                formData.append('signature', this.editFinalReportData.signature);

                this.editFinalReportData.makinglable.forEach(item => formData.append('marking_label_id[]', item.id));
                this.editFinalReportData.makinglable.forEach(item => formData.append('marking_label_packages[]', item.marking_on_the_label_packages));

                this.divs.forEach(item => formData.append('marking_on_the_label_packages[]', item.marking_on_the_label_packages));

                formData.append('_method', 'PUT')

                await this.$store.dispatch('final_report/update_final_report', {id:id, data:formData}).then(() => {
                    this.$swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "success",
                      title: this.message,
                      showConfirmButton: false,
                      timer: 1500,
                    });

                    this.finalReportData = {};
                  }).catch((err) => {
                    console.log(err);
                  });
            } catch (error) {
                console.log(error)
            }
        }

    }
}
</script>

<style scoped>
#edit_final_report {
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

.add_row_btn{
   
    background-color: yellowgreen;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: left;
    margin-left: 5px;
}

.delete_row_btn{
    background-color: red;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    margin-left: 5px;
}
</style>