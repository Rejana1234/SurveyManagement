<template>
  <div id="add_survey">
    <form class="AddCountry-form" v-on:submit.prevent="addSurvey">
      <div class="dcard">
        <h2>Add Survey</h2>
        <div class="distance">
          <div class="row">
            <div class="col-25">
              <label>Category Type</label>
            </div>
            <div class="col-75">
              <select id="category_id" name="category_id" v-model="surveyData.category_id">
                <option value="">Select Category</option>
                <!-- <option :value="single_category.id">{{ single_category.name }} </option> -->
                <option v-for="(category, index) in categories" :key="index" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <span v-if="errors.category_id" class="danger_text">{{ errors.category_id[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Note</label>
            </div>
            <div class="col-75">
              <input type="text" name="note" v-model="surveyData.note" /> <br />
              <span v-if="errors.note" class="danger_text">{{ errors.note[0] }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table_card" style="">
            <input type="button" value="+Add New" class="add_new" @click="addRowSurvey" />
            <table class="" style="">
              <thead class="text text-success" style="width: 100%">
                <tr style="width: 100%">
                  <th style="width: 25%">Scope of Survey</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style="width: 100%">
                <tr v-for="(survey, index) in surveys" :key="index" style="width: 100%">
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
        <div class="row">
          <div class="col-75">
            <label class="container" style="padding-top: 0; color: red"
              >Give access to relevant files.
              <input type="checkbox" name="access_file" value="access_file" v-model="surveyData.access_file" />
              <span class="checkmark"></span>
            </label>
            <span v-if="errors.access_file" class="danger_text">{{ errors.access_file[0] }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <br />
        <input type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddSurvey",

  data() {
    return {
      id: this.$route.params.id,
      surveyData: {
        work_order_id: "",
        category_id: "",
        note: "",
        access_file: false,
      },
      surveys: [{ survey_scope: "" }],
      errors: {},
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
      // single_category: state => state.category.single_category,
      workOrder: (state) => state.w_order.w_orders,
      message: (state) => state.survey.success_message,
    }),
  },

  mounted() {
    this.getAllW_Order();
    this.getAllCategory();
  },

  methods: {
    ...mapActions({
      getAllW_Order: "w_order/get_all_w_order",
      getAllCategory: "category/get_all_category",
    }),
    addRowSurvey: function () {
      this.surveys.push({ survey_scope: "" });
    },
    deleteRowSurvey(index) {
      this.surveys.splice(index, 1);
    },
    addSurvey: async function () {
      try {
        let formData = new FormData();
        var scope = JSON.stringify(this.surveys);

        formData.append("work_order_id", this.$route.params.id);
        formData.append("category_id", this.surveyData.category_id);
        formData.append("note", this.surveyData.note);
        formData.append("access_file", this.surveyData.access_file);
        formData.append("scope", scope);

        await this.$store.dispatch("survey/add_survey", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.surveyData = {};
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
#add_survey {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.distance {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.2rem;
  margin-top: 1%;
  margin-bottom: 2.5rem;
}
th {
  background-color: #9ea2a3e8;
  color: #343333;
}
.dcard {
  width: 100%;
  padding: var(--card-padding);
  background: rgb(234, 234, 234);
  border-radius: 1rem;
  height: fit-content;
  transition: all 300ms ease;
  margin-top: 1%;
}
select {
  width: 85%;
  height: 42px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
input[type="text"] {
  width: 85%;
  height: 42px;
}
.modal-vue .modal[data-v-507a997b] {
  position: absolute;
  width: 50%;
  z-index: 9999;
  margin: -270px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
}

/* Checkbox stylr */
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #cac4c4;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.back-btn {
  padding: 5px 4px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.add_new:hover {
  background-color: #226798;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}
.add_new:hover:after {
  opacity: 0.5;
}

.add_new:active {
  box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0, rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: 0.35s;
}

.add_new:active:after {
  opacity: 1;
}
.add_new {
  width: 18%;
  border-radius: 5px;
  background-color: #01579b;
  margin-right: 0%;
  color: rgb(238 239 240);
  font-weight: 600;
  margin-top: -3%;
  margin-left: 82%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 1px -2px, rgba(0, 0, 0, 0.14) 0 2px 2px 0, rgba(0, 0, 0, 0.12) 0 1px 5px 0;
}
</style>
