<template>
  <div id="add_invoice">
    <div class="dcard">
      <form class="AddCountry-form" v-on:submit.prevent="addInvoice">
        <h2>Add Invoice</h2>
        <div class="distance">

            <div class="row">
            <div class="col-25">
              <label for="note">Create_by</label>
            </div>
            <div class="col-75">
              <input type="text" name="note"  />
              <span v-if="errors.note" class="danger_text">{{
                errors.note[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="start_date">Date_of_Invoice</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                name="start_date"
                accept="image/png, image/jpeg"
                
              />
              <span v-if="errors.start_date" class="danger_text">{{
                errors.start_date[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="scope">Invoice_no.</label>
            </div>
            <div class="col-75">
              <input type="text" name="scope" />
              <span v-if="errors.scope" class="danger_text">{{
                errors.scope[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Ammount</label>
            </div>
            <div class="col-75">
              <input type="text" name="note"  />
              <span v-if="errors.note" class="danger_text">{{
                errors.note[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Ammount_no.</label>
            </div>
            <div class="col-75">
              <input type="text" name="note"  />
              <span v-if="errors.note" class="danger_text">{{
                errors.note[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="start_date">Ammount_Recieve_Date</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                name="start_date"
                accept="image/png, image/jpeg"
              />
              <span v-if="errors.start_date" class="danger_text">{{
                errors.start_date[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label>Invoice_Type</label>
            </div>
            <div class="col-75">
              <select id="category_id" name="category_id">
                <option value="">Select Category</option>
                <option>op_1</option>
                <option>op_2</option>
                <option>op_3</option>
              </select>
              <span v-if="errors.category_id" class="danger_text">{{
                errors.category_id[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Note</label>
            </div>
            <div class="col-75">
              <textarea type="textarea" name="note">
                </textarea>
              <span v-if="errors.note" class="danger_text">{{
                errors.note[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Invoice_file</label>
            </div>
            <div class="col-75">
              <input type="file" name="image" ref="workOrderImage" />
              <span v-if="errors.attachImage" class="danger_text">{{
                errors.attachImage[0]
              }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
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
        start_date: "",
        end_date: "",
        category_id: "",
        scope: "",
        note: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
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

    addSurvey: async function () {
      try {
        let formData = new FormData();

        formData.append("work_order_id", this.$route.params.id);
        formData.append("start_date", this.surveyData.start_date);
        formData.append("end_date", this.surveyData.end_date);
        formData.append("category_id", this.surveyData.category_id);
        formData.append("scope", this.surveyData.scope);
        formData.append("note", this.surveyData.note);

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
#add_invoice {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
  overflow: auto;
}
body{
    overflow: hidden;
  }
.dcard {
    overflow: auto;
}
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

</style>
