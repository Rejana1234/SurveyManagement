<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Edit Vessels</h2>
        <form v-on:submit.prevent="editVessels">
          <div class="row">
            <div class="col-25">
              <label for="vname">Vessels Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_vessels.name"
                id="vname"
                name="name"
                placeholder="Enter Vessels Name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="vcode">Vessels Code</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_vessels.code"
                id="vcode"
                name="code"
                placeholder="Enter Vessels Code"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/vessels" style="float: right">
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
  name: "AddVessels",
    title: "InterPort - Edit Vessels",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_vessels: state => state.vessels.vessel,
      message: state => state.vessels.success_message
    })
  },

  mounted() {
    this.getEditVessels(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditVessels: "vessels/edit_vessel",
    }),

    editVessels: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_vessels.name);
        formData.append("code", this.edit_vessels.code);
        formData.append("_method", "PUT");

        await this.$store.dispatch("vessels/update_vessel", { id: id, data: formData }).then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(formData)

            this.getEditVessels(id);
            this.$router.go(-1);
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
