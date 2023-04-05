<template>
  <div id="add-survey-firm">
    <div class="card">
      <div class="container">
        <h2>Add Survey Firm</h2>

        <form v-on:submit.prevent="addSurveyFirm">
          <div class="AddSurveyFirm">
            <div class="row">
              <div class="col-25">
                <label for="dname">Survey Firm Name</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.name"
                  id="dname"
                  name="name"
                  placeholder="Enter Firm Name"
                />
                <span v-if="errors.name" class="danger_text">{{
                  errors.name[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="dmotto">Survey Firm Motto</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.motto"
                  id="dmotto"
                  name="motto"
                  placeholder="Enter Firm Motto"
                />
                <span v-if="errors.motto" class="danger_text">{{
                  errors.motto[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="about">About</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.about"
                  id="about"
                  name="about"
                  placeholder="About"
                />
                <span v-if="errors.about" class="danger_text">{{
                  errors.about[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="address">Survey Firm Location</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.address"
                  id="address"
                  name="address"
                  placeholder="Survey Firm Location"
                />
                <span v-if="errors.address" class="danger_text">{{
                  errors.address[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="telephone">Phone Number</label>
              </div>
              <div class="col-75">
                <input
                  type="number"
                  v-model="firmData.telephone"
                  id="telephone"
                  name="telephone"
                  placeholder="Enter your Phone Numbe"
                />
                <span v-if="errors.telephone" class="danger_text">{{
                  errors.telephone[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="fax">FAX</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.fax"
                  id="fax"
                  name="fax"
                  placeholder="FAX"
                />
                <span v-if="errors.fax" class="danger_text">{{
                  errors.fax[0]
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
                  v-model="firmData.email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
                <span v-if="errors.email" class="danger_text">{{
                  errors.email[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="website">Website</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="firmData.website"
                  id="website"
                  name="website"
                  placeholder="Enter Website Address"
                />
                <span v-if="errors.website" class="danger_text">{{
                  errors.website[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Survey Firm Seal</label>
              </div>
              <div class="col-75">
                <div class="col-75">
                  <input
                    required
                    type="file"
                    @change="previewSeal"
                    name="seal"
                    ref="sfSeal"
                  />
                  <span v-if="errors.seal" class="danger_text">{{
                    errors.seal[0]
                  }}</span>
                </div>
                <div v-if="preview_seal">
                  <img
                    :src="preview_seal"
                    alt=""
                    style="
                      width: 40%;
                      height: 150px;
                      border-radius: 5%;
                      margin-top: 2%;
                    "
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Survey Firm Logo</label>
              </div>
              <div class="col-75">
                <div class="col-75">
                  <input
                    required
                    type="file"
                    @change="previewLogo"
                    name="logo"
                    ref="sfImage"
                  />
                  <span v-if="errors.logo" class="danger_text">{{
                    errors.logo[0]
                  }}</span>
                </div>
                <div v-if="preview_logo">
                  <img
                    :src="preview_logo"
                    alt=""
                    style="
                      width: 40%;
                      height: 150px;
                      border-radius: 5%;
                      margin-top: 2%;
                    "
                  />
                </div>
                <span v-if="errors.logo" class="danger_text">{{
                  errors.logo[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Header</label>
              </div>
              <div class="col-75">
                <div class="col-75">
                  <input
                    required
                    type="file"
                    @change="previewHeader"
                    name="header"
                    ref="sfHeader"
                  />
                  <span v-if="errors.header" class="danger_text">{{
                    errors.header[0]
                  }}</span>
                </div>
                <div v-if="preview_header">
                  <img
                    :src="preview_header"
                    alt=""
                    style="
                      width: 40%;
                      height: 150px;
                      border-radius: 5%;
                      margin-top: 2%;
                    "
                  />
                </div>
                <span v-if="errors.header" class="danger_text">{{
                  errors.header[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Footer</label>
              </div>
              <div class="col-75">
                <div class="col-75">
                  <input
                    required
                    type="file"
                    @change="previewFooter"
                    name="footer"
                    ref="sfFooter"
                  />
                  <span v-if="errors.footer" class="danger_text">{{
                    errors.footer[0]
                  }}</span>
                </div>
                <div v-if="preview_footer">
                  <img
                    :src="preview_footer"
                    alt=""
                    style="
                      width: 40%;
                      height: 150px;
                      border-radius: 5%;
                      margin-top: 2%;
                    "
                  />
                </div>
                <span v-if="errors.footer" class="danger_text">{{
                  errors.footer[0]
                }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <input type="submit" value="Submit" />
            <router-link to="/dashboard/surveyFirm" style="float: right">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddSurveyFirm",
  title: "InterPort - Add Survey Firm",

  data() {
    return {
      firmData: {
        name: "",
        motto: "",
        about: "",
        logo: "",
        seal: "",
        address: "",
        telephone: "",
        fax: "",
        email: "",
        website: "",
      },
      preview_logo: null,
      preview_seal: null,
      preview_header: null,
      preview_footer: null,
      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.surveyfirm.success_message,
    }),
  },

  methods: {
    previewLogo: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_logo = e.target.result;
        };
        this.firmData.logo = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewSeal: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_seal = e.target.result;
        };
        this.firmData.seal = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewHeader: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_header = e.target.result;
        };
        this.firmData.header = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewFooter: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_footer = e.target.result;
        };
        this.firmData.footer = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    addSurveyFirm: async function () {
      try {
        let formData = new FormData();

        formData.append("name", this.firmData.name);
        formData.append("motto", this.firmData.motto);
        formData.append("about", this.firmData.about);
        formData.append("logo", this.firmData.logo);
        formData.append("seal", this.firmData.seal);
        formData.append("header", this.firmData.header);
        formData.append("footer", this.firmData.footer);
        formData.append("address", this.firmData.address);
        formData.append("telephone", this.firmData.telephone);
        formData.append("fax", this.firmData.fax);
        formData.append("email", this.firmData.email);
        formData.append("website", this.firmData.website);

        await this.$store.dispatch("surveyfirm/add_firm", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.firmData = {};
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
#add-survey-firm {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}
.row {
  margin-top: 2%;
}
.AddSurveyFirm {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
  /* margin-left: ; */
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
