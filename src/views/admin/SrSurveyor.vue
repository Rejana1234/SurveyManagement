<template>
  <div id="add_user">
      <div class="card">
          <div class="container">
              <!-- <h2>Add User</h2> -->
              <form v-on:submit.prevent="addUser">
                  <div class="row">
                      <div class="col-25">
                          <label for="role">Survey Firm</label>
                      </div>
                      <div class="col-75">
                          <select name="survey_firm" id="survey_firm" v-model="userData.survey_firm" class="box" required>
                              <option value="" selected disabled>Select Survey Firm</option>
                              <option :value="surveyFirm.id" v-for="surveyFirm in survey_firms" :key="surveyFirm.id">{{ surveyFirm.name }}</option>
                          </select>
                          <span v-if="errors.surveyFirm" class="danger_text">{{errors.surveyFirm[0]}}</span>
                      </div>
                  </div>
                  <div class="row">
                      <input type="submit" value="Assign" />
                      <!-- <router-link to="/dashboard/users" style="float: right">
                          <input type="button" value="Back" class="back-btn" />
                      </router-link> -->
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
  import {mapState , mapActions} from "vuex";
  import { http } from "../../service/http_service";

  export default {
      name: "InterPortAddUser",

      data(){
          return{
              userData: {
                  name: '',
                  email: '',
                  password: '',
                  phone: '',
                  survey_firm: '', 
                  role: ''
              },
              sr_surveyors: [],

              errors: {}
          }
      },

      computed: {
          ...mapState({
              survey_firms: state => state.surveyfirm.firms,
              roles: state => state.role.roles,
              message: state => state.users.success_message
          })
      },

      mounted(){
          this.getRole();
          this.getSurveyFirm();
          this.getSrSurveyors();
      },

      methods: {
          ...mapActions({
              getRole: 'role/get_role',
              getSurveyFirm: 'surveyfirm/get_firm',
          }),

          getSurveyFirms() {
      return http()
        .get("/v1/survey_firms")
        .then((response) => {
          this.survey_firms = response.data.survey_firms;
          // console.log(this.survey_firms);
        })
        .catch((error) => {
          console.log(error);
        });
    },
      }
  }
</script>

<style scoped>
  .box{
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
  }
</style>