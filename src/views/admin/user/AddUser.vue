<template>
  <div id="add_user">
    <div class="card">
      <h2>Add User</h2>
      <form v-on:submit.prevent="addUser">
        <div class="container">
          <div class="row">
            <div class="col-25">
              <label for="name">Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="userData.name"
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
                v-model="userData.email"
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
                v-model="userData.phone"
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
                v-model="userData.password"
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              <span v-if="errors.password" class="danger_text">{{
                errors.password[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="address">Address</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="userData.address"
                id="address"
                name="address"
                placeholder="Enter Address"
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
                v-model="userData.dob"
                id="dob"
                name="dob"
                placeholder="Enter Date of Birth"
              />
              <span v-if="errors.dob" class="danger_text">{{
                errors.dob[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="role">Survey Firm <p style="color:#c70505; font-size: 1em;font-weight: bold;">There is no need to select if you are from "Mother Company"</p></label>
            </div>
            <div class="col-75">
              <select
                name="survey_firm"
                id="survey_firm"
                v-model="userData.survey_firm"
                class="box"
              >
                <option value="" selected disabled>Select Firm</option>
                <option
                  :value="surveyFirm.id"
                  v-for="surveyFirm in survey_firms"
                  :key="surveyFirm.id"
                >
                  {{ surveyFirm.name }}
                </option>
              </select>
              <span v-if="errors.surveyFirm" class="danger_text">{{
                errors.surveyFirm[0]
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
                v-model="userData.role"
                class="box"
                required
              >
                <option value="" selected disabled>Select Role</option>
                <option :value="role.id" v-for="role in roles" :key="role.id">
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
              <label for="name">Profile Image</label>
            </div>
            <div class="col-75">
              <input
                required
                type="file"
                @change="addProfileImage"
                id="image"
                name="image"
              />
              <span v-if="errors.image" class="danger_text">{{
                errors.image[0]
              }}</span>
            </div>
            <div v-if="preview_image">
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
          </div>
          <div class="row">
            <div class="col-25">
              <label for="name">Signature</label>
            </div>
            <div class="col-75">
              <input
                required
                type="file"
                @change="addSignature"
                id="signature"
                name="signature"
              />
              <span v-if="errors.signature" class="danger_text">{{
                errors.signature[0]
              }}</span>
            </div>
            <div v-if="preview_signature">
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
  name: "InterPortAddUser",

  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        phone: "",
        survey_firm: "",
        dob: "",
        role: "",
        image: "",
        signature: "",
        address: "",
      },
      preview_image: null,
      preview_signature: null,

      errors: {},
    };
  },

  computed: {
    ...mapState({
      survey_firms: (state) => state.surveyfirm.firms,
      roles: (state) => state.role.roles,
      message: (state) => state.users.success_message,
    }),
  },

  mounted() {
    this.getRole();
    this.getSurveyFirm();
  },

  methods: {
    ...mapActions({
      getRole: "role/get_role",
      getSurveyFirm: "surveyfirm/get_firm",
    }),

    addSignature: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_signature = e.target.result;
        };
        this.userData.signature = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    addProfileImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_image = e.target.result;
        };
        this.userData.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    addUser: async function () {
      try {
        let formData = new FormData();
        formData.append("name", this.userData.name);
        formData.append("email", this.userData.email);
        formData.append("phone", this.userData.phone);
        formData.append("password", this.userData.password);
        formData.append("address", this.userData.address);
        formData.append("survey_firm", this.userData.survey_firm);
        formData.append("dob", this.userData.dob);
        formData.append("role", this.userData.role);
        formData.append("image", this.userData.image);
        formData.append("signature", this.userData.signature);

        await this.$store.dispatch("users/add_user", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.userData = {};
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
#add_user {
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
