<template>
  <div id="add_user">
    <div class="card">
      <div class="container">
        <!-- <h2>Add User</h2> -->
        <form v-on:submit.prevent="addUser">
          <div class="row">
            <div class="col-25">
              <label for="role">Claim Handler</label>
            </div>
            <div class="col-75">
              <select
                name="claim_handler"
                id="claim_handler"
                class="box"
                required
                v-model="claim_handlers.claim_handler"
              >
                <option value="" selected disabled>Select Claim Handler</option>
                <option
                  :value="claim.id"
                  v-for="claim in claim_handlers"
                  :key="claim.id"
                >
                  {{ claim.name }}
                </option>
              </select>
              <!-- <span v-if="errors.surveyFirm" class="danger_text">{{
                errors.surveyFirm[0]
              }}</span> -->
            </div>
          </div>
          <div class="row">
            <input type="submit" value="Assign" />
            <!-- <router-link to="/dashboard/users" style="float: right">
                            <input type="button" value="Back" class="back-btn" />
                        </router-link> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState} from "vuex";
import {http} from "../../service/http_service";
import { httpAuth } from "../../service/login_service";
export default {
  name: "InterPortAddUser",

  data() {
    return {
      claim_handlers: {
        claim_handler: "",
      },
            // claim_handlers: [],
      errors: {},
    };
  },

  mounted() {
    this.getClaimHandlers();
  },

  methods: {
    getClaimHandlers() {
      return httpAuth()
        .get("/access/v1/users/role/claim-handler")
        .then((response) => {
          this.claim_handlers = response.data.users;
          // console.log(this.claim_handlers);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addUser: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();
        formData.append("claim_handler", this.claim_handlers.claim_handler);
        return http()
        .post(
          "v1/work_orders/assigned_claim_handler/" + id ,formData)
       .then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getClaimHandlers = {};
          this.$router.go(0);
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
.box {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
select {
  width: 85%;
  height: 40px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
