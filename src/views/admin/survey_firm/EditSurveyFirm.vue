<template>
  <div id="edit-survey-firm">
    <div class="card">
      <div class="container">
        <h2>Edit Survey firm</h2>
        <form v-on:submit.prevent="editSurveyFirm">
          <div class="EditSurveyFirm">
            <div class="row">
              <div class="col-25">
                <label for="name">Survey Firm Name</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.name" id="name" name="name" placeholder="Enter Firm Name" />
                <span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="motto">Survey Firm Motto</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.motto" id="motto" name="motto" placeholder="Enter Firm Motto" />
                <span v-if="errors.motto" class="danger_text">{{ errors.motto[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="about">About</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.about" id="about" name="about" placeholder="About" />
                <span v-if="errors.about" class="danger_text">{{ errors.about[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="address">Survey Firm Address</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.address" id="address" name="address" placeholder="Survey Firm Address" />
                <span v-if="errors.address" class="danger_text">{{ errors.address[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="telephone">Phone Number</label>
              </div>
              <div class="col-75">
                <input type="number" v-model="editSurveyFirmData.telephone" id="telephone" name="telephone" placeholder="Enter your Phone Number" />
                <span v-if="errors.telephone" class="danger_text">{{ errors.telephone[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="fax">FAX</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.fax" id="fax" name="fax" placeholder="FAX" />
                <span v-if="errors.fax" class="danger_text">{{ errors.fax[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="email">Email</label>
              </div>
              <div class="col-75">
                <input type="email" v-model="editSurveyFirmData.email" id="email" name="email" placeholder="Enter Your Email" />
                <span v-if="errors.email" class="danger_text">{{ errors.email[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="website">Website</label>
              </div>
              <div class="col-75">
                <input type="text" v-model="editSurveyFirmData.website" id="website" name="website" placeholder="Enter Website Address" />
                <span v-if="errors.website" class="danger_text">{{ errors.website[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Survey Firm Seal</label>
              </div>
              <div class="col-75">
                <input type="file" @change="attach_Seal" name="seal" ref="sfSeal" />
              </div>
              <div class="survey_firm_seal" v-if="preview_seal">
                <img :src="preview_seal" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
              <div class="survey_firm_seal" v-else>
                <img :src="editSurveyFirmData.files.seal" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px; margin-top: 2%" />
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Survey Firm Logo</label>
              </div>
              <div class="col-75">
                <input type="file" @change="attach_Logo" name="logo" ref="sfImage" />
              </div>
              <div class="survey_firm_logo" v-if="preview_logo">
                <img :src="preview_logo" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
              <div class="survey_firm_logo" v-else>
                <img :src="editSurveyFirmData.files.logo" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Header</label>
              </div>
              <div class="col-75">
                <input type="file" @change="attach_Header" name="header" ref="sfHeader" />
              </div>
              <div class="survey_firm_header" v-if="preview_header">
                <img :src="preview_header" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
              <div class="survey_firm_header" v-else>
                <img :src="editSurveyFirmData.files.header" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px; margin-top: 2%" />
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Footer</label>
              </div>
              <div class="col-75">
                <input type="file" @change="attach_Footer" name="footer" ref="sfFooter" />
              </div>
              <div class="survey_firm_footer" v-if="preview_footer">
                <img :src="preview_footer" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
              <div class="survey_firm_footer" v-else>
                <img :src="editSurveyFirmData.files.footer" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
              </div>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
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
import { mapState, mapActions } from "vuex";

export default {
  name: "EditSurveyFirm",

  data() {
    return {
      show_image: "",
      preview_logo: "",
      preview_seal: "",
      preview_header: "",
      preview_footer: "",
      // logo: "",
      // seal: "",
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editSurveyFirmData: (state) => state.surveyfirm.firm,
      message: (state) => state.surveyfirm.success_message,
    }),
  },

  mounted() {
    this.getEditSurveyFirm(this.$route.params.id);
    // this.imageShow();
  },

  methods: {
    ...mapActions({
      getEditSurveyFirm: "surveyfirm/edit_firm",
    }),

    attach_Logo: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_logo = e.target.result;
        };
        this.logo = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    attach_Seal: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_seal = e.target.result;
        };
        this.seal = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    attach_Header: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_header = e.target.result;
        };
        this.header = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    attach_Footer: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_footer = e.target.result;
        };
        this.footer = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    editSurveyFirm: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();
        if (this.editSurveyFirmData.name != null) {
          formData.append("name", this.editSurveyFirmData.name);
        }
        if (this.editSurveyFirmData.motto != null) {
          formData.append("motto", this.editSurveyFirmData.motto);
        }
        if (this.editSurveyFirmData.about != null) {
          formData.append("about", this.editSurveyFirmData.about);
        }
        if (this.preview_logo || this.preview_seal || this.preview_header || this.preview_footer) {
          formData.append("logo", this.logo);
          formData.append("seal", this.seal);
          formData.append("header", this.header);
          formData.append("footer", this.footer);
        }
        if (this.editSurveyFirmData.address != null) {
          formData.append("address", this.editSurveyFirmData.address);
        }
        if (this.editSurveyFirmData.telephone != null) {
          formData.append("telephone", this.editSurveyFirmData.telephone);
        }
        if (this.editSurveyFirmData.fax != null) {
          formData.append("fax", this.editSurveyFirmData.fax);
        }
        if (this.editSurveyFirmData.email != null) {
          formData.append("email", this.editSurveyFirmData.email);
        }
        if (this.editSurveyFirmData.website != null) {
          formData.append("website", this.editSurveyFirmData.website);
        }
        formData.append("_method", "PUT");

        await this.$store.dispatch("surveyfirm/update_firm", { id: id, data: formData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getEditSurveyFirm();
          this.$router.go(-1);
        });
      } catch (e) {
        console.log(e);
      }
    },

    // imageShow() {
    //   let base_url = this.editSurveyFirmData.image_base;
    //   let image_name = this.editSurveyFirmData.logo;

    //   let image = base_url + "" + image_name;

    //   this.show_image = image;
    // },
  },
};
</script>

<style scoped>
#edit-survey-firm {
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
.EditSurveyFirm {
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
