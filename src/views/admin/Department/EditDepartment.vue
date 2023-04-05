<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Edit Department</h2>
        <form v-on:submit.prevent="editDepartment">
          <div class="row">
            <div class="col-25">
              <label for="dname">Department Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_department.name"
                id="dname"
                name="name"
                placeholder="Enter Department Name"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/department" style="float: right">
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
  name: "EditDepartment",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_department: (state) => state.department.department,
      message: (state) => state.department.success_message,
    }),
  },

  mounted() {
    this.getEditDepartment(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditDepartment: "department/edit_department",
    }),

    editDepartment: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_department.name);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("department/update_department", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditDepartment(this.$route.params.id);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#edit_department {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
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
