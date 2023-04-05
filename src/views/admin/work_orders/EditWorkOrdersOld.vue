<template>
  <div id="edit_w_order">
    <form v-on:submit.prevent="editW_order">
      <h2>Edit File</h2>
      <br />
      <div class="Editw_order">
        <div class="row">
          <div class="col-25">
            <label for="fname">Client</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.client_name"
              id="client_name"
              name="client_name"
              placeholder="Enter Your client_name"
            />
            <span v-if="errors.client_name" class="danger_text">{{
              errors.client_name[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="subject">WOD</label>
          </div>
          <div class="col-75">
            <input
              type="date"
              id="work_order_date"
              name="work_order_date"
              v-model="editW_orderList.work_order_date"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="fname">Project Name</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.project_name"
              id="project_name"
              name="project_name"
              placeholder="Enter Your project_name"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="lname">POL</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.pol"
              id="pol"
              name="pol"
              placeholder=" Enter POL"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="lname">POD</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.pod"
              id="pod"
              name="pod"
              placeholder=" Enter POD"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="fname">Cargo volume</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.cargo_volume"
              id="cargo_volume"
              name="cargo_volume"
              placeholder="Enter Cargo Volume"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Vessel</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.vessel"
              id="vessel"
              name="vessel"
              placeholder="Enter Your vessel"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">C_F_Consignee</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.c_f_consigne"
              id="c_f_consigne"
              name="c_f_consigne"
              placeholder="Enter Your c_f_consigne"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Carrier Agent</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.carrier_agent"
              id="carrier_agent"
              name="carrier_agent"
              placeholder="Enter Your carrier_agent"
            />
            <span v-if="errors.carrier_agent" class="danger_text">{{
              errors.carrier_agent[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Cargo</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.cargo"
              id="cargo"
              name="cargo"
              placeholder="Enter Your cargo"
            />
            <span v-if="errors.cargo" class="danger_text">{{
              errors.cargo[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="fname">Club Name</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.club"
              id="club"
              name="club"
              placeholder="Enter Your club"
            />
            <span v-if="errors.club" class="danger_text">{{
              errors.club[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Member</label>
          </div>
          <div class="col-75">
            <select v-model="editW_orderList.member">
              <option value="">Select Member</option>
              <option
                v-for="option in options"
                v-bind:value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <span v-if="errors.member" class="danger_text">{{
              errors.member[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="fname">Legal Section</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editW_orderList.legal_section"
              id="legal_section"
              name="legal_section"
              placeholder="Enter Your legal_section"
            />
            <span v-if="errors.legal_section" class="danger_text">{{
              errors.legal_section[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="subject">Attached File</label>
            <input
              type="file"
              v-on:change="attachImage"
              name="image"
              ref="workOrderImage"
            />
            <span v-if="errors.attachImage" class="danger_text">{{
              errors.attachImage[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25"></div>
          <div class="col-75">
            <input type="submit" value="Update" />
            <router-link to="/dashboard/workorders">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EditW_order",

  data() {
    return {
      options: [
        { text: "Owner", value: "owner" },
        { text: "Time Charters", value: "time_charters" },
        { text: "Sub Charters", value: "sub_charters" },
        { text: "Receivers Charters", value: "voice_charters" },
        { text: "Sub Charters", value: "receivers_charters" },
        { text: "Others", value: "others" },
      ],
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editW_orderList: (state) => state.w_order.w_order,
      clients: (state) => state.client.clients,
      vessel: (state) => state.vessels.vessels,
      cfconsigne: (state) => state.c_f_consign.consigns,
      message: (state) => state.w_order.success_message,
    }),
  },

  mounted() {
    this.getEditW_order(this.$route.params.id);
    this.getAllClient();
    this.getAllVessel();
    this.getAllConsign();
  },

  methods: {
    ...mapActions({
      getEditW_order: "w_order/edit_w_order",
      getAllClient: "client/get_all_client",
      getAllVessel: "vessels/get_all_vessel",
      getAllConsign: "c_f_consign/get_all_consign",
    }),

    attachImage: function () {
      //to use some file todo
      this.image = this.$refs.workOrderImage.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.$refs.newCategoryImageDisplay.src = reader.result;
        }.bind(this),
        false
      );
      reader.readAsDataURL(this.file);
    },

    editW_order: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        // formData.append("client_id", this.editW_orderList.client_id);
        formData.append("client_name", this.editW_orderList.client_name);
        formData.append(
          "work_order_date",
          this.editW_orderList.work_order_date
        );
        formData.append("project_name", this.editW_orderList.project_name);
        formData.append("pol", this.editW_orderList.pol);
        formData.append("pod", this.editW_orderList.pod);
        formData.append("cargo", this.editW_orderList.cargo);
        formData.append("cargo_volume", this.editW_orderList.cargo_volume);
        formData.append("vessel", this.editW_orderList.vessel);
        // formData.append("eta_port_name", this.editW_orderList.eta_port_name);
        formData.append("eta_date", this.editW_orderList.eta_date);
        formData.append("eta_time", this.editW_orderList.eta_time);
        // formData.append("c_f_consigne_id", this.editW_orderList.c_f_consigne_id);
        // formData.append("carrier_agent_id", this.editW_orderList.carrier_agent_id);
        formData.append("c_f_consigne", this.editW_orderList.c_f_consigne);
        formData.append("carrier_agent", this.editW_orderList.carrier_agent);
        formData.append("member", this.editW_orderList.member);
        formData.append("club", this.editW_orderList.club);
        formData.append("legal_section", this.editW_orderList.legal_section);
        formData.append("image", this.image);
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("w_order/update_w_order", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditW_order(this.$route.params.id);
            this.$router.go(-1);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#edit_w_order {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}
.Editw_order {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
