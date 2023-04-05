<template>
  <div id="edit_survey">
    <div class="dcard">
      <form class="AddCountry-form" v-on:submit.prevent="editSurvey">
        <h2>Edit Survey</h2>
        <!-- <div class="row">
          <div class="col-25">
            <label for="subject">Start Date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              id="start_date"
              name="start_date"
              v-model="editSurveyList.start_date"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">End Date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              id="end_date"
              name="end_date"
              v-model="editSurveyList.end_date"
              accept="image/png, image/jpeg"
            />
          </div>
        </div> -->
        <div class="col">
          <div class="row">
            <div class="col-25">
              <label>Category Type</label>
            </div>
            <div class="col-75">
              <select id="category_id" name="category_id" v-model="editSurveyList.category_id">
                <option value="">Select Category</option>
                <option v-for="(category, index) in categories" :key="index" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <span v-if="errors.category_id" class="danger_text">{{ errors.category_id[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="end_date">Note</label>
            </div>
            <div class="col-75">
              <input type="text" id="note" name="note" v-model="editSurveyList.note" />
              <span v-if="errors.note" class="danger_text">{{ errors.note[0] }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table_card" style="">
            <input
              style="
                width: 10%;
                background-color: rgb(1, 87, 155);
                margin-right: 0%;
                color: rgb(238, 239, 240);
                font-weight: 600;
                margin-top: 2%;
                margin-left: 90%;
                border-radius: 6px;
              "
              type="button"
              value="+Add New"
              class="add_new"
              @click="addRowSurvey"
            />
            <table class="" style="">
              <thead class="text text-success" style="width: 100%">
                <tr style="width: 100%">
                  <th style="width: 25%">Scope of Survey</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style="width: 100%">
                <tr v-for="(survey, index) in scops" :key="survey.survey_scope" style="width: 100%">
                  <td style="width: 75%">
                    <input name="survey_scope" v-model="survey.survey_scope" class="form-control" type="text" />
                  </td>
                  <td style="width: 25%">
                    <input
                      style="color: aliceblue; background-color: red"
                      type="button"
                      value="Remove"
                      class="back-btn"
                      @click="deleteRowSurvey(index)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-25">
            <label for="end_date">Scope</label>
          </div>
          <div class="col-75" v-for="survey in scops" :key="survey.survey_scope">
            <input type="text" id="scope" name="scope" v-model="survey.survey_scope" />
            <span v-if="errors.scope" class="danger_text">{{ errors.scope[0] }}</span>
          </div>
        </div> -->

        <div class="row">
          <input type="submit" value="Update" />
          <input type="button" @click="goBack" value="Back" class="back-btn" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EditSurvey",

  data() {
    return {
      scops: [],
      surveyData: {
        work_order_id: "",
        start_date: "",
        end_date: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editSurveyList: (state) => state.survey.survey,
      scopes: (state) => state.survey.scopes,
      workOrder: (state) => state.w_order.w_orders,
      categories: (state) => state.category.categories,
      message: (state) => state.survey.success_message,
    }),
  },

  mounted() {
    this.getEditSurvey(this.$route.params.id);
    this.getAllW_Order();
    this.getAllCategories();
    this.scops = this.scopes;
    this.testFun();
  },

  methods: {
    ...mapActions({
      getEditSurvey: "survey/edit_survey",
      getAllW_Order: "w_order/get_all_w_order",
      getAllCategories: "category/get_all_category",
    }),

    addRowSurvey: function () {
      this.scops.push({ survey_scope: "" });
    },
    deleteRowSurvey(index) {
      this.scops.splice(index, 1);
    },

    testFun() {
      console.log("SCOPES: " + this.scops);
    },

    editSurvey: async function () {
      try {
        let formData = new FormData();
        let id = this.$route.params.id;
        // let scops = JSON.parse(scope);
        var scops = JSON.stringify(this.scops);

        formData.append("work_order_id", this.editSurveyList.work_order_id);
        formData.append("start_date", this.editSurveyList.start_date);
        formData.append("end_date", this.editSurveyList.end_date);
        formData.append("category_id", this.editSurveyList.category_id);
        formData.append("scope", scops);
        formData.append("note", this.editSurveyList.note);
        formData.append("_method", "PUT");
        await this.$store.dispatch("survey/update_survey", { id: id, data: formData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getEditSurvey(this.$route.params.id);
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
    goBack: async function () {
      this.$router.go(-1);
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
.col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
}
select {
  width: 70%;
  height: 38px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
