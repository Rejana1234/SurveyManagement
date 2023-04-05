<template>
  <div id="edit_user">
    <div class="card">
      <h2>Edit User</h2>
      <form v-on:submit.prevent="editUser">
        <div class="container">
          <div class="row">
            <div class="col-25">
              <label for="name">Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="editUserData.name"
                id="name"
                name="name"
                placeholder="Enter Name"
              />
              <span v-if="errors.name" class="danger_text">{{
                errors.name[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="email">Email</label>
            </div>
            <div class="col-75">
              <input
                type="email"
                v-model="editUserData.email"
                id="email"
                name="email"
                placeholder="Enter Email"
              />
              <span v-if="errors.email" class="danger_text">{{
                errors.email[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="phone">Phone Number</label>
            </div>
            <div class="col-75">
              <input
                type="number"
                v-model="editUserData.phone"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
              />
              <span v-if="errors.phone" class="danger_text">{{
                errors.phone[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="password">Password</label>
            </div>
            <div class="col-75">
              <input
                type="password"
                v-model="password"
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              <span v-if="errors.password" class="danger_text">{{
                errors.password[0]
              }}</span>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-25">
              <label for="address">Address</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="editUserData.address"
                id="address"
                name="address"
                placeholder="Enter Your Address"
              />
              <span v-if="errors.address" class="danger_text">{{
                errors.address[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="dob">Date of Birth</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                v-model="editUserData.dob"
                id="dob"
                name="dob"
                placeholder="Enter Your Date of Birth"
              />
              <span v-if="errors.dob" class="danger_text">{{
                errors.dob[0]
              }}</span>
            </div>
          </div> -->
          <div class="row">
            <div class="col-25">
              <label for="role">Survey Firm</label>
            </div>
            <div class="col-75">
              <select
                name="survey_firm"
                id="survey_firm"
                v-model="editUserData.survey_firm"
                class="box"
                required
              >
                <option value="" selected disabled>Select Firm</option>
                <option
                  v-for="surveyFirm in survey_firms"
                  :key="surveyFirm.id"
                  :value="surveyFirm.id"
                >
                  {{ surveyFirm.name }}
                </option>
              </select>
              <span v-if="errors.survey_firm" class="danger_text">{{
                errors.survey_firm[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="role">Role</label>
            </div>
            <div class="col-75">
              <select
                name="role"
                id="role"
                v-model="editUserData.role"
                class="box"
                required
              >
                <option value="" selected disabled>Select Role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
              <span v-if="errors.role" class="danger_text">{{
                errors.role[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Profile Image</label>
            </div>
            <div class="col-75">
              <input
                type="file"
                @change="attachImage"
                name="image"
                ref="userImage"
              />
            </div>
            <div class="user_image" v-if="preview_image">
              <img
                :src="preview_image"
                alt=""
                style="
                  width: 40%;
                  height: 150px;
                  border-radius: 5%;
                  margin-top: 5px;
                "
              />
            </div>

            <div class="user_image" v-else>
              <img
                :src="editUserData.image"
                alt=""
                style="
                  width: 40%;
                  height: 150px;
                  border-radius: 5%;
                  margin-top: 5px;
                "
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Signature</label>
            </div>
            <div class="col-75">
              <input
                type="file"
                @change="attachSignature"
                name="signature"
                ref="userSignature"
              />
            </div>
            <div class="user_signature" v-if="preview_signature">
              <img
                :src="preview_signature"
                alt=""
                style="
                  width: 40%;
                  height: 150px;
                  border-radius: 5%;
                  margin-top: 5px;
                "
              />
            </div>

            <div class="user_signature" v-else>
              <img
                :src="editUserData.signature"
                alt=""
                style="
                  width: 40%;
                  height: 150px;
                  border-radius: 5%;
                  margin-top: 5px;
                "
              />
            </div>
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Submit" />
          <router-link to="/dashboard/users" style="float: right">
            <input type="button" value="Back" class="back-btn" />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "InterPortEditUser",

  data() {
    return {
      password: "",
      errors: {},
      preview_signature: null,
      signature: null,
      preview_image: null,
      image: null,
    };
  },

  computed: {
    ...mapState({
      editUserData: (state) => state.users.user,
      survey_firms: (state) => state.surveyfirm.firms,
      roles: (state) => state.role.roles,
      message: (state) => state.users.success_message,
    }),
  },

  mounted() {
    this.getRole();
    this.getSurveyFirm();
    this.getEditUser(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getRole: "role/get_role",
      getSurveyFirm: "surveyfirm/get_firm",
      getEditUser: "users/edit_user",
    }),

    attachImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_image = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    attachSignature: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_signature = e.target.result;
        };
        this.signature = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    editUser: async function () {
      try {
        let id = this.$route.params.id;

        let formData = new FormData();
        formData.append("name", this.editUserData.name);
        formData.append("email", this.editUserData.email);
        formData.append("phone", this.editUserData.phone);
        formData.append("password", this.password);
        formData.append("survey_firm", this.editUserData.survey_firm);
        formData.append("address", this.editUserData.address);
        formData.append("dob", this.editUserData.dob);
        formData.append("role", this.editUserData.role);
        formData.append("image", this.image);
        formData.append("signature", this.signature);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("users/update_user", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditUser(id);
            this.$router.go(-1);
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
#edit_user {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.box {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
select {
  width: 100%;
  height: 40px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
input[type="date"],
input[type="text"],
input[type="number"],
input[type="password"],
input[type="time"],
input[type="email"] {
  width: 100%;
  height: 40px;
}
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1%;
  margin-bottom: 2.5rem;
}
</style>
