<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Update Dimension Name</h2>
        <form v-on:submit.prevent="editDimension">
          <div class="row">
            <div class="col-25">
              <label for="dname">Dimension Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_dimension.name"
                id="dname"
                name="name"
                placeholder="Enter Dimension Name"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/dimension" style="float: right">
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
  name: "EditDimension",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_dimension: (state) => state.dimension.dimension,
      message: (state) => state.dimension.success_message,
    }),
  },

  mounted() {
    this.getEditDimension(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditDimension: "dimension/edit_dimension",
    }),

    editDimension: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_dimension.name);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("dimension/update_dimension", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditDimension(this.$route.params.id);
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

select
 {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  
}
</style>
