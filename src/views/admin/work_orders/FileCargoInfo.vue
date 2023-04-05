<template>
  <div id="add_w_order">
    <form class="elements" v-on:submit.prevent="fileCargoInfo">
      <h2>Cargo Related Information</h2>
      <div class="basic_w_order">
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="vessel">Cargo Type</label>
            </div>
            <div class="col-75">
              <select
                id="cargo_type"
                name="cargo_type"
                class="box"
                v-model="w_orderData.cargo_type"
                required
              >
                <option value="" selected>Select Type</option>
                <option value="Dry Bulk Cargo">Dry Bulk Cargo</option>
                <option value="Bagged Cargo">Bagged Cargo</option>
                <option value="Liquid Bulk Cargo">Liquid Bulk Cargo</option>
                <option value="Project Cargo">Project Cargo</option>
                <option value="Container">Container</option>

                <!-- <option v-for="(v, index) in vessel" :key="index" :value="v.id">
                  {{ v.name }}
                </option> -->
              </select>
              <!-- <span v-if="errors.vessel_id" class="danger_text">{{
                errors.vessel_id[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="w_orderData.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Cargo Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.cargo_name"
                id="cargo_name"
                name="cargo_name"
                placeholder="Enter Your cargo_name"
              />
              <!-- <span v-if="errors.client_name" class="danger_text">{{
                errors.client_name[0]
              }}</span> -->
            </div>
          </div>
          <div
            class="row"
            v-if="w_orderData.cargo_type != 'Container'"
            style="width: 100%"
          >
            <div class="col-25">
              <label for="subject">Cargo Quantity</label>
            </div>
            <div class="col-75">
              <input
                style="width: 50%"
                type="text"
                id="cargo_quantity"
                name="cargo_quantity"
                v-model="w_orderData.cargo_quantity"
              />
              <select
                style="width: 35%"
                id="unit"
                name="unit"
                class="box"
                v-model="w_orderData.unit"
              >
                <option value="" selected>Select units</option>
                <option>M.Tons</option>
                <option>Packages</option>
                <option>Barrels</option>
                <option>Bags</option>
                <option>Boxes</option>
                <option>Coils</option>
                <!-- <option v-for="(v, index) in vessel" :key="index" :value="v.id">
                  {{ v.name }}
                </option> -->
              </select>
              <!-- <span v-if="errors.file_opening_date" class="danger_text">{{
                errors.file_opening_date[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="fname">Container no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="container_number"
                name="container_number"
                v-model="w_orderData.container_number"
                placeholder="Enter Your container no."
              />
              <!-- <span v-if="errors.iml_reference_no" class="danger_text">{{
                errors.iml_reference_no[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="fname">Container Type</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="container_type"
                name="container_type"
                v-model="w_orderData.container_type"
                placeholder="Enter Your container type"
              />
              <!-- <span v-if="errors.vessel_name" class="danger_text">{{
                errors.vessel_name[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">Laden Cargo Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="laden_cargo_name"
                name="laden_cargo_name"
                v-model="w_orderData.laden_cargo_name"
                placeholder=" Enter POL"
              />
              <!-- <span v-if="errors.voyage_no" class="danger_text">{{
                errors.voyage_no[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">MLO</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="mlo"
                name="mlo"
                v-model="w_orderData.mlo"
                placeholder=" Enter mlo"
              />
              <!-- <span v-if="errors.nature_of_incident" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">Port of Transshipment</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="port_of_transshipment"
                name="port_of_transshipment"
                v-model="w_orderData.port_of_transshipment"
                placeholder=" Enter port_of_transshipment"
              />
              <!-- <span v-if="errors.nature_of_incident" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="w_orderData.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">G.W</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="gross_weight"
                name="gross_weight"
                v-model="w_orderData.gross_weight"
                placeholder=" Enter gross_weight"
              />
              <select
                id="unit"
                name="unit"
                class="box"
                v-model="w_orderData.unit"
              >
                <option value="" selected>Select units</option>
                <option>M.Tons</option>
                <option>KGs</option>
                <!-- <option v-for="(v, index) in vessel" :key="index" :value="v.id">
                  {{ v.name }}
                </option> -->
              </select>
              <!-- <span v-if="errors.nature_of_incident" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Supplier/Shipper</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.supplier"
                id="supplier"
                name="supplier"
                placeholder="Enter supplier"
              />
              <!-- <span v-if="errors.cargo_volume" class="danger_text">{{
                errors.cargo_volume[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">BL no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.bl_no"
                id="bl_no"
                name="bl_no"
                placeholder="Enter Your bl_no"
              />
              <!-- <span v-if="errors.vessel_name" class="danger_text">{{
                errors.vessel_name[0]
              }}</span> -->
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">BL Date</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                id="bl_date"
                name="bl_date"
                v-model="w_orderData.bl_date"
                accept="image/png, image/jpeg, pdf/file"
              />
              <!-- <span v-if="errors.bl_date" class="danger_text">{{
                errors.eta_date_time_pod[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">Consignee</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="consignee"
                name="consignee"
                v-model="w_orderData.consignee"
                accept="image/png, image/jpeg"
              />
              <!-- <span v-if="errors.ata_date_time_pod" class="danger_text">{{
                errors.ata_date_time_pod[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">Notify Party</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="notify_party"
                name="notify_party"
                v-model="w_orderData.notify_party"
                accept="image/png, image/jpeg"
              />
              <!-- <span v-if="errors.notify_party" class="danger_text">{{
                errors.notify_party[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">POL</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="port_of_loading"
                name="port_of_loading"
                v-model="w_orderData.port_of_loading"
                accept="image/png, image/jpeg"
              />
              <!-- <span v-if="errors.atb_date_time_pod" class="danger_text">{{
                errors.atb_date_time_pod[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">POD</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="port_of_discharge"
                name="port_of_discharge"
                v-model="w_orderData.port_of_discharge"
                accept="image/png, image/jpeg"
              />
              <!-- <span v-if="errors.pod" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="lname">Marks and Nos</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="marks_nos"
                name="marks_nos"
                v-model="w_orderData.marks_nos"
                placeholder=" Enter marks_nos"
              />
              <!-- <span v-if="errors.atd_date_time_pol" class="danger_text">{{
                errors.atd_date_time_pol[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Description</label>
            </div>
            <div class="col-75">
              <textarea
                type="textarea"
                v-model="w_orderData.description"
                id="description"
                name="description"
                placeholder="Enter Your description"
              ></textarea>
              <!-- <span v-if="errors.description" class="danger_text">{{
                errors.description[0]
              }}</span> -->
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Commercial Invoice no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.commercial_invoice"
                id="commercial_invoice"
                name="commercial_invoice"
                placeholder="Enter Your commercial_invoice_no"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Commercial Invoice date</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                v-model="w_orderData.commercial_invoice_date"
                id="commercial_invoice_date"
                name="commercial_invoice_date"
                placeholder="Enter Your commercial invoice date"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="w_orderData.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Project Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.project_name"
                id="project_name"
                name="project_name"
                placeholder="Enter Your project name"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="w_orderData.cargo_type != 5">
            <div class="col-25">
              <label for="fname">Shipment no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.shipment_no"
                id="shipment_no"
                name="shipment_no"
                placeholder="Enter Your shipment no"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Save" />
          <!-- <router-link to="/dashboard/workorders">
            <input type="button" value="Back" class="back-btn" />
          </router-link> -->
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddW_Order",

  data() {
    return {
      selected: "",
      w_orderData: {
        cargo_type: "",
        cargo_name: "",
        cargo_quantity: "",
        container_number: "",
        container_type: "",
        laden_cargo_name: "",
        mlo: "",
        port_of_transshipment: "",
        gross_weight: "",
        supplier: "",
        bl_no: "",
        bl_date: "",
        consignee: "",
        notify_party: "",
        port_of_loading: "",
        port_of_discharge: "",
        marks_nos: "",
        description: "",
        commercial_invoice: "",
        commercial_invoice_date: "",
        project_name: "",
        shipment_no: "",
        unit: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      // clients: (state) => state.client.clients,
      // vessel: (state) => state.vessels.vessels,
      // cfconsigne: (state) => state.c_f_consign.consigns,
      // carrier_agents: (state) => state.carrier_agent.carrier_agents,
      message: (state) => state.cargos.success_message,
    }),
  },

  mounted() {
    // this.getAllClient();
    // this.getAllVessel();
    // this.getAllConsign();
    // this.getAllCarriersAgent();
  },

  methods: {
    activeIfCoororMan() {
      if (
        this.newLeader.role === "manager" ||
        this.newLeader.role === "coordinator"
      ) {
        console.log("remove-disabled");
      } else {
        console.log("stay-disabled");
      }
    },
    ...mapActions({
      // getAllClient: "client/get_all_client",
      // getAllVessel: "vessels/get_all_vessel",
      // getAllConsign: "c_f_consign/get_all_consign",
      // getAllCarriersAgent: "carrier_agent/get_all_carrier_agent",
    }),

    fileCargoInfo: async function () {
      //   console.log('ATB: '+this.w_orderData.atb_date_time_pod);
      try {
        let formData = new FormData();
        formData.append("work_order_id", this.$route.params.id);
        formData.append("cargo_type", this.w_orderData.cargo_type);
        formData.append("cargo_name", this.w_orderData.cargo_name);
        formData.append("cargo_quantity", this.w_orderData.cargo_quantity);
        formData.append("container_number", this.w_orderData.container_number);
        formData.append("container_type", this.w_orderData.container_type);
        formData.append("laden_cargo_name", this.w_orderData.laden_cargo_name);
        formData.append("mlo", this.w_orderData.mlo);
        formData.append(
          "port_of_transshipment",
          this.w_orderData.port_of_transshipment
        );
        formData.append("gross_weight", this.w_orderData.gross_weight);
        formData.append("supplier", this.w_orderData.supplier);
        formData.append("bl_no", this.w_orderData.bl_no);
        formData.append("bl_date", this.w_orderData.bl_date);
        formData.append("consignee", this.w_orderData.consignee);
        formData.append("notify_party", this.w_orderData.notify_party);
        formData.append("port_of_loading", this.w_orderData.port_of_loading);
        formData.append(
          "port_of_discharge",
          this.w_orderData.port_of_discharge
        );
        formData.append("marks_nos", this.w_orderData.marks_nos);
        formData.append("description", this.w_orderData.description);
        formData.append(
          "commercial_invoice",
          this.w_orderData.commercial_invoice
        );
        formData.append(
          "commercial_invoice_date",
          this.w_orderData.commercial_invoice_date
        );
        formData.append("project_name", this.w_orderData.project_name);
        formData.append("shipment_no", this.w_orderData.shipment_no);
        formData.append("unit", this.w_orderData.unit);

        await this.$store.dispatch("cargos/add_cargo", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.w_orderData = {};
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
#add_w_order {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
  /* background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%; */
}
.basic_w_order {
  background: rgb(234, 233, 233);
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(234, 233, 233);
  transition: all 300ms ease;
  margin-top: 1%;
}
.basic_w_order1 {
  background: rgb(234, 233, 233);
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(234, 233, 233);
  transition: all 300ms ease;
  margin-top: 1%;
}
.col-cargo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
/* .col-75 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
} */
.Addw_order {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
}
.Addw_order1 {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  gap: 1.5rem;
  margin-top: 1%;
}
#add_surveyor {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 0%;
}

.AddSurveyor {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
}
select {
  width: 85%;
  height: 40px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
input[type="date"],
input[type="text"],
input[type="number"],textarea{
  width: 85%;
  height: 40px;
}
input[type="submit"] {
  margin-left: 500px;
  width: 15%;
}
</style>
