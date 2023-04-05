<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Add Style Form</h2>
        <form v-on:submit.prevent="addStyle">
          <div class="row">
            <div class="col-25">
              <label for="dname">Style Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="styleData.style_name"
                id="dname"
                name="style_name"
                placeholder="Enter Style Name"
              />
              <span v-if="errors.style_name" class="danger_text">{{errors.style_name[0]}}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
            <router-link to="/dashboard/style" style="float: right">
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
  name: "AddStyle",

  data() {
    return {
      styleData: {
        style_name: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.style.success_message,
    }),
  },

  methods: {
    addStyle: async function () {
      try {
        let formData = new FormData();

        formData.append("style_name", this.styleData.style_name);

        await this.$store.dispatch("style/add_style", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.styleData = {};
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
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}
* {
  box-sizing: border-box;
  appearance: auto;
}


select
 {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  
}
</style>
