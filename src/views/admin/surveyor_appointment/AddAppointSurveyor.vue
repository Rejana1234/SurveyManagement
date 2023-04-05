<template>
  <div id="add_appoint_surveyor">
    <div class="vcard">
      <form class="AddVessels" v-on:submit.prevent="addAppointedSurvey">
        <h2>Appoint  Surveyor</h2>
        <div
          class="flex-container"
          style="justify-content: flex-end; margin-top: 10px"
        >
          <button type="button" class="add_new" @click="openModal()">
            <span class="material-icons-sharp add" style="font-size: 11px"
              >add</span
            >
            Add New Surveyor
          </button>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="surveyor_id">Surveyor Name</label>
          </div>
          <div class="col-75">
            <vueSelect
              name="surveyor_id"
              id="surveyor_id"
              class="box"
              label="name"
              multiple
              placeholder="Select Marine or Staff Surveyor"
              v-model="appointSurveyorData.surveyor_id"
              :options="this.surveyors"
              :reduce="(option) => option.id"
              :searchable="true"
            >
              <template #option="{ name, type_name, phone }">
                <h3 style="margin: 0">
                  {{ name }} ({{ type_name }}) - {{ phone }}
                </h3>
              </template>
              <template #selected-option="{ name, type_name }">
                <div style="display: flex; align-items: baseline">
                  <strong>{{ name }}</strong>
                  <em style="margin-left: 0.5rem">{{ type_name }}</em>
                </div>
              </template>
            </vueSelect>

            <span v-if="errors.surveyor_id" class="danger_text">{{
              errors.surveyor_id[0]
            }}</span>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-25">
            <label for="start_date">Start_date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              name="start_date"
              accept="image/png, image/jpeg"
              v-model="appointSurveyorData.start_date"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="start_date">End_date</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              name="end_date"
              accept="image/png, image/jpeg"
              v-model="appointSurveyorData.end_date"
            />
          </div>
        </div> -->
        <div class="row">
          <input type="submit" value="Save " />
            <input type="button" value="Back" @click="back()" class="back-btn" />
        </div>
      </form>
    </div>
    <div class="overlay" v-if="showModal" @click="closeModal()"></div>

    <div class="modal" v-show="showModal">
      <div id="app" class="modal-vue">
        <!-- button show -->
        <!-- overlay -->
        <div class="overlay"></div>
        <!-- modal -->
        <div class="modal">
          <button class="close" @click="closeModal()">x</button>
          <!--<AddSurveyor />-->
          <AddSurveyor />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddSurveyor from "@/views/admin/surveyor/AddSurveyor.vue";
import { mapActions, mapState } from "vuex";
import vueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "AddAppointSurveyor",
  components: {
    vueSelect,
    AddSurveyor,
  },
  props:["work_order_id"],
  // props: ["work_order_id"],
  data: function () {
    return {
      options: [],
      showModal: false,
      count: 1,
      id: this.$route.params.id,
      appointSurveyorData: {
        surveyor_id: "",
        start_date: "",
        end_date: "",
      },
      surveyorData: {
        // department_id: "",
        department_name: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        position: "",
        fax: "",
        loi: "",
        nid: "",
        dob: "",
        image: "",
        vacine_card: "",
      },
      error: {},
      preview: null,
      preview_vc_image: null,
      errors: {},
      token: "",
    };
  },
  computed: {
    ...mapState({
      surveyors: (state) => state.surveyors.surveyors,
      message: (state) => state.appoint_surveyor.success_message,
    }),
  },

  mounted() {
    this.getAllSurveyor();
  },

  methods: {
    ...mapActions({
      getAllSurveyor: "surveyors/get_all_surveyor",
    }),

    openModal() {
      this.showModal = true;
      const body = document.getElementsByTagName("html")[0];

      body.classList.add("overflow-hidden");
    },
    back() {
      this.$router.go(-1);
    },
    closeModal() {
      this.showModal = false;
      const body = document.getElementsByTagName("html")[0];

      body.classList.remove("overflow-hidden");
    },

    addNewRow: function () {
      this.count++;
    },

    deleteRow: function () {
      this.count--;
    },

    addAppointedSurvey: async function () {
      try {
        let formData = new FormData();
        // let id = this.$route.id;
        formData.append("surveyor_id", this.appointSurveyorData.surveyor_id);
        formData.append("survey_id", this.$route.params.id);
        formData.append("start_date", this.appointSurveyorData.start_date);
        formData.append("end_date", this.appointSurveyorData.end_date);

        await this.$store.dispatch("appoint_surveyor/add_appointed_surveyor", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.appointSurveyorData = {};
            this.$router.go(-1);
          });
      } catch (e) {
        
        console.log(e.response.data.message);

        this.$swal
        .fire({
          title: e.response.data.message,
          showConfirmButton: false,
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
        })
        
      }
    },

    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.surveyorData.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewVcImage: function () {
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

    addSurveyor: async function () {
      try {
        let formData = new FormData();

        // formData.append("department_id", this.surveyorData.department_id);
        formData.append("department_name", this.surveyorData.department_name);
        formData.append("username", this.surveyorData.username);
        formData.append("name", this.surveyorData.name);
        formData.append("email", this.surveyorData.email);
        formData.append("phone", this.surveyorData.phone);
        formData.append("password", this.surveyorData.password);
        formData.append("address", this.surveyorData.address);
        formData.append("position", this.surveyorData.position);
        formData.append("fax", this.surveyorData.fax);
        formData.append("loi", this.surveyorData.loi);
        formData.append("nid", this.surveyorData.nid);
        formData.append("dob", this.surveyorData.dob);
        formData.append("image", this.surveyorData.image);
        formData.append("vacine_card", this.surveyorData.vacine_card);

        await this.$store
          .dispatch("surveyors/add_surveyor", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.surveyorData = {};
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
#add_appoint_surveyor {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
.others {
  margin-left: 0.5%;
  margin-top: 0.5%;
}
.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: absolute;
  width: 50%;
  height: 96%;
  z-index: 9999;
  margin: -200px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
  margin-top: -18%;
  overflow: auto;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
}

.modal {
  margin-right: 10%;
}
</style>
