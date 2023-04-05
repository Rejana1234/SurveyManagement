<template>
  <div id="add_consign">
    <form class="AddConsign" v-on:submit.prevent="addConsign">
      <h2>Add Consignee</h2>
      <div class="distance">
      <div class="row">
        <div class="col-25">
          <label for="coname">Company Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="consignData.company_name"
            id="coname"
            name="company_name"
            placeholder="Enter Your Company Name"
          />
          <span v-if="errors.company_name" class="danger_text">{{errors.company_name[0]}}</span>

        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="cname">Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="consignData.c_f_name"
            id="cname"
            name="c_f_name"
            placeholder=" Enter Your CF_name"
          />
          <span v-if="errors.c_f_name" class="danger_text">{{errors.c_f_name[0]}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="lname">Phone</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="consignData.phone"
            id="mobile"
            name="phone"
            placeholder=" Enter Your phone number"
          />
          <span v-if="errors.phone" class="danger_text">{{errors.phone[0]}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="fname">Address</label>
        </div>
        <div class="col-75">
          <textarea
            id="address"
            v-model="consignData.address"
            name="address"
            placeholder="Write your address"
            style="height: 200px; resize: none;"
          ></textarea>
          <span v-if="errors.address" class="danger_text">{{errors.address[0]}}</span>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Save" />
          <router-link to="/dashboard/consign">
            <input type="button" value="Back" class="back-btn" />
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddConsign",

  data() {
    return {
      consignData: {
        company_name: "",
        c_f_name: "",
        phone: "",
        address: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.c_f_consign.success_message,
    }),
  },

  mounted() {
    
  },

  methods: {
    
    addConsign: async function () {
      try {
        let formData = new FormData();

        formData.append("company_name", this.consignData.company_name);
        formData.append("c_f_name", this.consignData.c_f_name);
        formData.append("phone", this.consignData.phone);
        formData.append("address", this.consignData.address);
        await this.$store
          .dispatch("c_f_consign/add_consign", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.consignData = {};
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
#add_consign {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
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
