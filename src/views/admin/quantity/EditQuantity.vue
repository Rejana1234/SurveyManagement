<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Update Quantity Name</h2>
        <form v-on:submit.prevent="editQuantity">
          <div class="row">
            <div class="col-25">
              <label for="dname">Quantity Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_quantity.name"
                id="dname"
                name="name"
                placeholder="Enter Quantity Name"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/quantity" style="float: right">
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
  name: "EditQuantity",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_quantity: (state) => state.quantity.quantity,
      message: (state) => state.quantity.success_message,
    }),
  },

  mounted() {
    this.getEditQuantity(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditQuantity: "quantity/edit_quantity",
    }),

    editQuantity: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_quantity.name);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("quantity/update_quantity", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditQuantity(this.$route.params.id);
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
