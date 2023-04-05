<template>
  <div id="add_surveyor">
    <loader :object="styling.objectcolor"
            :color1="styling.animationcolor"
            :color2="styling.animationcolor2"
            :size="styling.size"
            :speed="styling.speed"
            :bg="styling.bgcolor"
            :objectbg="styling.objectbg"
            :opacity="styling.opacity"
            :name="selected"
            :disableScrolling="styling.disableScrolling"></loader>
    <div class="card">
      <h2>Add Surveyor</h2>

      <form v-on:submit.prevent="addSurveyor">
        <div class="AddSurveyor">
          <div class="row">
            <div class="col-25">
              <label for="fname">Surveyor Type</label>
            </div>
            <div class="col-75">
              <select id="surveyor_type" name="surveyor_type" class="box" v-model="surveyorData.surveyor_type">
                <option value="" selected disabled>Select Type</option>
                <option value="1">Marine Surveyor</option>
                <option value="2">Staff Surveyor</option>
              </select>
              <br /><span v-if="errors.surveyor_type" class="danger_text">{{ errors.surveyor_type[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Full Name</label>
            </div>
            <div class="col-75">
              <input type="text" v-model="surveyorData.name" id="name" name="name" placeholder="Enter your Name" />
              <br /><span v-if="errors.name" class="danger_text">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Email</label>
            </div>
            <div class="col-75">
              <input
                type="email"
                v-model="surveyorData.email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
              />
              <br /><span v-if="errors.email" class="danger_text">{{ errors.email[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Phone Number</label>
            </div>
            <div class="col-75">
              <input
                type="number"
                v-model="surveyorData.phone"
                id="mobile"
                name="mobile"
                placeholder="Enter Your mobile number"
              />
              <br /><span v-if="errors.phone" class="danger_text">{{ errors.phone[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Password</label>
            </div>
            <div class="col-75">
              <input
                type="password"
                v-model="surveyorData.password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
              />
              <br /><span v-if="errors.password" class="danger_text">{{ errors.password[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Address</label>
            </div>
            <div class="col-75">
              <textarea
                id="address"
                v-model="surveyorData.address"
                name="address"
                placeholder="Write your address"
                style="height: 50px; resize: none"
              ></textarea>
              <span v-if="errors.address" class="danger_text">{{ errors.address[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>DOB</label>
            </div>
            <div class="col-75">
              <input type="date" id="dob" name="dob" v-model="surveyorData.dob" accept="image/png, image/jpeg" />
              <span v-if="errors.dob" class="danger_text">{{ errors.dob[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Attach NID</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewNIDImage" name="nid" />
              <span v-if="errors.image" class="danger_text">{{ errors.nid[0] }}</span>
            </div>
            <div v-if="preview_nid">
              <img :src="preview_nid" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Attach Profile Image</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewImage" name="image" />
              <span v-if="errors.image" class="danger_text">{{ errors.image[0] }}</span>
            </div>
            <div v-if="preview_image">
              <img :src="preview_image" alt="" style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px" />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Attach vaccine card</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewVcImage" name="vacine_card" ref="vcImage" />
              <span v-if="errors.vacine_card" class="danger_text">{{ errors.vacine_card[0] }}</span>
            </div>
            <div v-if="preview_vc_image">
              <img
                :src="preview_vc_image"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Attach Others Documents</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewDocImage" name="others_doc" ref="vcImage" />
              <span v-if="errors.others_doc" class="danger_text">{{ errors.others_doc[0] }}</span>
            </div>
            <div v-if="preview_others_doc">
              <img
                :src="preview_others_doc"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label>Attach Signature</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewSignature" name="signature" ref="signature" />
              <span v-if="errors.signature" class="danger_text">{{ errors.signature[0] }}</span>
            </div>
            <div v-if="preview_signature">
              <img
                :src="preview_signature"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="button-group">
            <input type="submit" value="Save" />
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
import { mapState } from "vuex";

export default {
  name: "AddSurveyor",

  data() {
    return {
      surveyorData: {
        // department_id: "",
        // department_name: "",
        surveyor_type: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        // position: "",
        // fax: "",
        // loi: "",
        nid: "",
        dob: "",
        image: "",
        vacine_card: "",
        others_doc: "",
        signature: "",
      },
      errors: {},
      preview: null,
      preview_image: null,
      preview_vc_image: null,
      preview_nid: null,
      preview_others_doc: null,
      preview_signature: null,
      selected: '',
      value: 2,
      styling: {
        objectcolor: '#ff9633',
        animationcolor: '#ffffff',
        animationcolor2: '#17fd3d',
        objectbg: '#999793',
        opacity: 80,
        bgcolor: '#343a40',
        size: 5,
        speed: 2,
        disableScrolling: true,
      },
      code: ``,
      flag: false
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.surveyors.success_message,
    }),
  },

  mounted() {
    this.flag=true;
  },

  methods: {
    loader(loader) {
      this.selected=loader;
      this.code=`<loader object="${this.styling.objectcolor}" color1="${this.styling.animationcolor}" color2="${this.styling.animationcolor2}" size="${this.styling.size}" speed="${this.styling.speed}" bg="${this.styling.bgcolor}" objectbg="${this.styling.objectbg}" opacity="${this.styling.opacity}" disableScrolling="${this.styling.disableScrolling}" name="${this.selected}"></loader>`
      const body = document.getElementsByTagName("html")[0];
      body.classList.add("overflow-hidden");
      setTimeout(() => {
        this.selected='';
        const body = document.getElementsByTagName("html")[0];
        body.classList.remove("overflow-hidden");
      }, this.value*1000);
    },

    previewNIDImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_nid = e.target.result;
        };
        this.surveyorData.nid = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewDocImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_others_doc = e.target.result;
        };
        this.surveyorData.others_doc = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_image = e.target.result;
        };
        this.surveyorData.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewVcImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_vc_image = e.target.result;
        };
        this.surveyorData.vacine_card = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewSignature: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_signature = e.target.result;
        };
        this.surveyorData.signature = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    addSurveyor: async function () {
      try {
        let formData = new FormData();
        formData.append("surveyor_type", this.surveyorData.surveyor_type);
        formData.append("username", this.surveyorData.username);
        formData.append("name", this.surveyorData.name);
        formData.append("email", this.surveyorData.email);
        formData.append("phone", this.surveyorData.phone);
        formData.append("password", this.surveyorData.password);
        formData.append("address", this.surveyorData.address);
        formData.append("nid", this.surveyorData.nid);
        formData.append("dob", this.surveyorData.dob);
        formData.append("image", this.surveyorData.image);
        formData.append("vacine_card", this.surveyorData.vacine_card);
        formData.append("others_doc", this.surveyorData.others_doc);
        formData.append("signature", this.surveyorData.signature);

        await this.$store.dispatch("surveyors/add_surveyor", formData).then(() => {
          this.loader('circular');
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.surveyorData = {};
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
#add_surveyor {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.row {
  margin-bottom: 0%;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

.AddSurveyor {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1%;
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
.button-group {
  margin-left: 10%;
  margin-top: 2%;
}
</style>
