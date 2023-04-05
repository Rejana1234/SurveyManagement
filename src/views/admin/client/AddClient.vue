<template>
  <div id="add_client">
    <form class="AddClient" v-on:submit.prevent="addClient">
      <h2>Add Client</h2>
      <div class="distance">
      <div class="row">
        <div class="col-25">
          <label for="coname">Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="clientData.name"
            id="name"
            name="name"
            placeholder="Enter Your name"
          />
          <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="cname">Email</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="clientData.email"
            id="email"
            name="email"
            placeholder=" Enter Your Email"
          />
          <span v-if="errors.email" class="danger_text">{{errors.email[0]}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="lname">Phone</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="clientData.phone"
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
            v-model="clientData.address"
            name="address"
            placeholder="Write your address"
            style="height: 200px; resize: none;"

          ></textarea>
          <span v-if="errors.address" class="danger_text">{{errors.address[0]}}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="fname">NID</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="clientData.nid"
            id="nid"
            name="nid"
            placeholder="Enter Your NID Number"
          />
          <span v-if="errors.nid" class="danger_text">{{errors.nid[0]}}</span>
        </div>
      </div>
      </div>

      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Save" />
          <router-link to="/dashboard/client">
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
    name: "AddClient",
    title: "InterPort - Add Client",

    data() {
      return {
        clientData: {
          company_name: "",
          c_f_name: "",
          phone: "",
          address: "",
          nid:"",
        },
        errors: {},
      };
    },

    computed: {
      ...mapState({
        message: (state) => state.client.success_message,
      }),
    },

    mounted() {

    },

    methods: {
    
    addClient: async function () {
      try {
        let formData = new FormData();

        formData.append("name", this.clientData.name);
        formData.append("email", this.clientData.email);
        formData.append("phone", this.clientData.phone);
        formData.append("address", this.clientData.address);
        formData.append("nid", this.clientData.nid);
        await this.$store
          .dispatch("client/add_client", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.clientData = {};
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
#add_client {
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
