<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Add Permission</h2>
        <form v-on:submit.prevent="addPermission">
          <div class="row">
            <div class="col-25">
              <label for="dname">Permission Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="styleData.name"
                id="dname"
                name="name"
                placeholder="Enter Permission Name"
              />
              <span v-if="errors.name" class="danger_text">{{
                errors.name[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
            <router-link to="/dashboard/permission" style="float: right">
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
  name: "AddPermission",

  data() {
    return {
      styleData: {
        name: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.permission.success_message,
    }),
  },

  methods: {
    addPermission: async function () {
      try {
        let formData = new FormData();

        formData.append("name", this.styleData.name);

        console.log("formData");
        console.log(this.styleData.name);
        await this.$store
          .dispatch("permission/add_permission", formData)
          .then(() => {
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

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
