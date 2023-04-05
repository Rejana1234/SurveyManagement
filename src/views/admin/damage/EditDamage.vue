<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Edit Damage</h2>
        <form v-on:submit.prevent="editDamage">
          <div class="row">
            <div class="col-25">
              <label for="dname">Damage Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="edit_damage.damage_type_name"
                id="dname"
                name="damage_type_name"
                placeholder="Enter Damage Name"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/damage" style="float: right">
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
  name: "AddDamage",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_damage: (state) => state.damage.damage,
      message: (state) => state.damage.success_message,
    }),
  },

  mounted() {
    this.getEditDamage(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditDamage: "damage/edit_damage",
    }),

    editDamage: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("damage_type_name", this.edit_damage.damage_type_name);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("damage/update_damage", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditDamage(this.$route.params.id);
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
