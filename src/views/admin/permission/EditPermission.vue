<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Edit Permission</h2>
        <form v-on:submit.prevent="editStyle">
          <div class="row">
            <div class="col-25">
              <label for="dname">Permission Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_style.name"
                id="dname"
                name="name"
                placeholder="Enter Style Name"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
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
import { mapState, mapActions } from "vuex";

export default {
  name: "EditStyle",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_style: (state) => state.permission.permission,
      message: (state) => state.permission.success_message,
    }),
  },

  mounted() {
    this.getEditStyle(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditStyle: "permission/edit_permission",
    }),

    editStyle: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_style.name);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("permission/update_permission", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditStyle(this.$route.params.id);
          });
      } catch (e) {
        console.log(e);
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
