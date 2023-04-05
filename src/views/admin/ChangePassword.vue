<template>
  <div id="change_password">
    <div class="card">
      <form class="AddVessels" v-on:submit.prevent="changePassword">
        <h2>Change Password</h2>
        <div class="row">
          <div class="col-25">
            <label>Email</label>
          </div>
          <div class="col-75">
            <input type="email" required v-model="user.email" id="email" name="email" />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>New Password</label>
          </div>
          <div class="col-75">
            <input
              type="password"
              v-model="chnagePasswordData.password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Confirm New Password </label>
          </div>
          <div class="col-75">
            <input
              type="password"
              v-model="chnagePasswordData.password_confirmation"
              name="password_confirmation"
              placeholder="Enter Password Again"
            />
          </div>
        </div>

        <div class="row">
          <input type="submit" value="Save " />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InterPortChangePassword",
  title: "InterPort - Change Password",

  data() {
    return {
      chnagePasswordData: {
        password: "",
        password_confirmation: "",
      },
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
      message: (state) => state.success_message,
    }),
  },

  mounted() {},

  methods: {
    changePassword: async function () {
      try {
        let formData = new FormData();

        formData.append("email", this.user.email);
        formData.append("password", this.chnagePasswordData.password);
        formData.append(
          "password_confirmation",
          this.chnagePasswordData.password_confirmation
        );

        await this.$store
          .dispatch("admin_change_password", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#change_password {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
</style>
