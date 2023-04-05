<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Add Dimension Form</h2>
        <form v-on:submit.prevent="addDimension">
          <div class="row">
            <div class="col-25">
              <label for="dname">Dimension Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="dimensionData.name"
                id="dname"
                name="name"
                placeholder="Enter Dimension Name"
              />
              <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
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
export default {
  name: "AddDimension",

  data() {
    return {
      dimensionData: {
        name: "",
      },
      errors: {},
    };
  },

  methods: {
    addDimension: async function () {
      try {
        let formData = new FormData();

        formData.append("name", this.dimensionData.name);

        await this.$store
          .dispatch("dimension/add_dimension", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.dimensionData = {};
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
