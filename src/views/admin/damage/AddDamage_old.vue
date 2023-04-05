<template>
  <div>
    <div class="card">
      <div class="container">
        <h2>Add Damage</h2>
        <form v-on:submit.prevent="addDamage">
          <div class="row">
            <div class="col-25">
              <label for="dname">Damage Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="damageData.name"
                id="dname"
                name="damage_type_name"
                placeholder="Enter Damage Name"
              />
              <span v-if="errors.damage_type_name" class="danger_text">{{errors.damage_type_name[0]}}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
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
  import {mapState} from 'vuex';

export default {
  name: "AddDamage",
    title: 'InterPort - Add Damage',

  data() {
    return {
      damageData: {
        name: "",
      },
      errors: {},
    };
  },

    computed:{
        ...mapState({
            message: state => state.damage.success_message
        })
    },

  methods: {
    addDamage: async function () {
      try {
        let formData = new FormData();

        formData.append("damage_type_name", this.damageData.name);

        await this.$store.dispatch("damage/add_damage", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.damageData = {};
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
