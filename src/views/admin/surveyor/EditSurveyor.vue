<template>
  <div id="edit_surveyor">
    <div class="card">
      <h2>Edit Surveyor</h2>

      <form v-on:submit.prevent="editSurveyor">
        <div class="EditSurveyor">
          <div class="row">
            <div class="col-25">
              <label for="fname">Surveyor Type</label>
            </div>

            <div class="col-75">
              <select required id="surveyor_type" name="surveyor_type" class="box" v-model="editSurveyorList.type_code">
                <option value="" selected disabled>Select Type</option>
                <option value="1" v-if="(type_code = 1)" selected>Marine Surveyor</option>
                <option value="2" v-if="(type_code = 2)" selected>Staff Surveyor</option>
              </select>
              <span v-if="errors.surveyor_type" class="danger_text">{{ errors.surveyor_type[0] }}</span>
              <!-- <select
                type="text"
                name="type_name"
                id="type_name"
                v-model="editSurveyorList.type_name"
                class="box"
                required
              >
              <option value="" selected disabled>Select Firm</option>
                <option
                  :value="surveyor.id"
                  v-for="surveyor in surveyors"
                  :key="surveyor.id"
                >
                  {{ surveyor.type_name }}
                </option>
              </select> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Full Name</label>
            </div>
            <div class="col-75">
              <input
                required
                type="text"
                v-model="editSurveyorList.name"
                id="fname"
                name="name"
                placeholder="Enter Your name"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="email">Email</label>
            </div>
            <div class="col-75">
              <input
                required
                type="email"
                v-model="other_info_surveyor.email"
                id="email"
                name="email"
                placeholder=" Enter Your Email Address"
              />
              <br /><span v-if="errors.email" class="danger_text">{{ errors.email[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="mobile">Phone Number</label>
            </div>
            <div class="col-75">
              <input
                required
                type="text"
                v-model="other_info_surveyor.phone"
                id="mobile"
                name="mobile"
                placeholder=" Enter Your mobile number"
              />
              <br /><span v-if="errors.phone" class="danger_text">{{ errors.phone[0] }}</span>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-25">
              <label for="password">Password</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
              />
            </div>
          </div> -->

          <div class="row">
            <div class="col-25">
              <label for="address">Address</label>
            </div>
            <div class="col-75">
              <textarea
                required
                id="address"
                v-model="editSurveyorList.address"
                name="address"
                placeholder="Write your address"
                style="height: 50px; resize: none"
              ></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="dob">DOB</label>
            </div>
            <div class="col-75">
              <input
                required
                type="date"
                id="dob"
                name="dob"
                v-model="editSurveyorList.dob"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25"><label for="subject">Attached NID</label></div>
            <div class="col-75">
              <input type="file" @change="attachNIDImage" name="nid" ref="surveyorNID" />
            </div>
            <div class="surveyor_nid" v-if="preview_nid">
              <img :src="preview_nid" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
            </div>

            <div class="surveyor_nid" v-else>
              <img
                :src="editSurveyorList.nid"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">Attached Profile Image</label>
            </div>
            <div class="col-75">
              <input type="file" @change="attachImage" name="image" ref="surveyorImage" />
              <span v-if="errors.image" class="danger_text">{{ errors.image[0] }}</span>
            </div>

            <div class="surveyor_image" v-if="preview_image">
              <img :src="preview_image" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
            </div>

            <div class="surveyor_image" v-else>
              <img
                :src="editSurveyorList.image"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Attached Others Documents</label>
            </div>
            <div class="col-75">
              <div class="col-75">
                <input
                  type="file"
                  name="others_doc"
                  @change="attachOthersFile"
                  ref="workOrderOthersFile"
                />
                <iframe :src="editSurveyorList.others_doc" title="description"></iframe>
                <span v-if="errors.others_doc" class="danger_text">{{ errors.others_doc[0] }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-25">
              <label for="subject">Attached Others Documents</label>
            </div>
            <div class="col-75">
              <input type="file" @change="attachDocImage" name="others_doc" ref="surveyorOthers" />
            </div>
            <div class="surveyor_others_doc" v-if="preview_others_doc">
              <img
                :src="preview_others_doc"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>

            <div class="surveyor_others_doc" v-else>
              <img
                :src="editSurveyorList.others_doc"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div> -->

          <div class="row">
            <div class="col-25">
              <label for="subject">Attached VC Image</label>
            </div>
            <div class="col-75">
              <input type="file" @change="attachVC_Image" name="vacine_card" ref="vcImage" />
            </div>
            <div class="surveyor_vacine_card" v-if="preview_vacine_card">
              <img
                :src="preview_vacine_card"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>

            <div class="surveyor_vacine_card" v-else>
              <img
                :src="editSurveyorList.vacine_card"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Attached Signature</label>
            </div>
            <div class="col-75">
              <input type="file" @change="attachSignature" name="signature" ref="surveyorSignature" />
            </div>
            <div class="surveyor_signature" v-if="preview_signature">
              <img
                :src="preview_signature"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
            <div class="surveyor_signature" v-else>
              <img
                :src="other_info_surveyor.signature"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-75">
            <input type="submit" class="Update" value="Update" />
            <router-link to="/dashboard/surveyor">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EditSurveyor",

  data() {
    return {
      // files: "",
      password: "",
      errors: {},
      preview_image: null,
      preview_nid: null,
      preview_vacine_card: null,
      preview_others_doc: null,
      preview_signature: null,
      // others_doc: null,
      // image: null,
      // nid: null,
      // vacine_card: null,
      // signature: null,
    };
  },

  computed: {
    ...mapState({
      editSurveyorList: (state) => state.surveyors.surveyor,
      other_info_surveyor: (state) => state.surveyors.other_info,
      surveyors: (state) => state.surveyors.surveyor,
      // departments: (state) => state.department.departments,
      message: (state) => state.surveyors.success_message,
    }),
  },

  mounted() {
    this.getEditSurveyor(this.$route.params.id);
    this.getAllSurveyor();
    this.others_doc = this.editSurveyorList.others_doc;
    this.image = this.editSurveyorList.image;
    this.nid = this.editSurveyorList.nid;
    this.vacine_card = this.editSurveyorList.vacine_card;
    this.signature = this.other_info_surveyor.signature;

    // this.getAllDepartment();
  },

  methods: {
    ...mapActions({
      getEditSurveyor: "surveyors/edit_surveyor",
      getAllSurveyor: "surveyors/get_all_surveyor",
      // getAllDepartment: "department/get_all_department",
    }),
    // showImage(img) {
    //   let server_Path = this.$store.state.serverPath;
    //   return server_Path + "/storage/uploads/surveyors/image/" + img;
    // },
    // showVCImage(img) {
    //   let server_Path = this.$store.state.serverPath;
    //   return server_Path + "/storage/uploads/surveyors/vaccine/" + img;
    // },
    // showNID(img) {
    //   let server_Path = this.$store.state.serverPath;
    //   return server_Path + "/storage/uploads/surveyors/nid/" + img;
    // },
    // showOtherDoc(img) {
    //   let server_Path = this.$store.state.serverPath;
    //   return server_Path + "/storage/uploads/surveyors/others_doc/" + img;
    // },

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

    attachVC_Image: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_vacine_card = e.target.result;
        };
        this.vacine_card = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    attachNIDImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_nid = e.target.result;
        };
        this.nid = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    attachOthersFile: function (event) {
     
      this.others_doc = event.target.files;
      console.log(this.others_doc)
    },
    // attachOthersFile: function (event) {
    //   let input = event.target;
    //   if (input.files) {
    //     let reader = new FileReader();
    //     // reader.onload = (e) => {
    //     //   this.preview_others_doc = e.target.result;
    //     // };
    //     this.others_doc = input.files[0];
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },

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

    editSurveyor: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("surveyor_type", this.editSurveyorList.type_code);
        formData.append("name", this.editSurveyorList.name);
        formData.append("email", this.other_info_surveyor.email);
        formData.append("phone", this.other_info_surveyor.phone);
        formData.append("password", this.password);
        formData.append("address", this.editSurveyorList.address);
        formData.append("dob", this.editSurveyorList.dob);
        if (
          this.preview_image ||
          this.preview_nid ||
          this.preview_vacine_card ||
          this.preview_others_doc ||
          this.preview_signature
        ) {
          formData.append("nid", this.nid);
          formData.append("image", this.image);
          formData.append("vacine_card", this.vacine_card);
          formData.append("others_doc", this.others_doc);
          formData.append("signature", this.signature);
        }
        formData.append("_method", "PUT");

        await this.$store.dispatch("surveyors/update_surveyor", { id: id, data: formData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getEditSurveyor(this.$route.params.id);
          this.$router.go(-1);
        });
      } catch (e) {
        // console.log(e);
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
#edit_surveyor {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.EditSurveyor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

select {
  width: 70%;
  padding: 8px;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
}
</style>
