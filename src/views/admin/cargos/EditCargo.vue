<template>
  <div id="edit_cargo">
    <div class="dcard">
      <h2>Edit Cargo Related Information</h2>
      <form class="AddCountry-form" v-on:submit.prevent="editCargo">
        <div class="edit_cargo">
          <div class="row">
            <div class="col-25">
              <label for="vessel">Cargo Type</label>
            </div>
            <div class="col-75">
              <select
                id="cargo_type"
                name="cargo_type"
                class="box"
                v-model="editCargoList.cargo_type"
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
          <div class="row" v-if="editCargoList.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Cargo Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="editCargoList.cargo_name"
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
            v-if="editCargoList.cargo_type != 'Container'"
            style="width: 100%"
          >
            <div class="col-25">
              <label for="subject">Cargo Quantity</label>
            </div>
            <div class="col-75" style="width: 100%">
              <input
                type="text"
                id="cargo_quantity"
                name="cargo_quantity"
                v-model="editCargoList.cargo_quantity"
                style="width: 60%"
              />
              <input
                type="text"
                id="unit"
                name="unit"
                class="box"
                v-model="editCargoList.unit"
                style="width: 25%"
              />
              <!-- <option value="" selected>Select units</option>
                <option>M.Tons</option>
                <option>Packages</option>
                <option>Barrels</option>
                <option>Bags</option>
                <option>Boxes</option>
                <option>Coils</option> -->
              <!-- <option v-for="(v, index) in vessel" :key="index" :value="v.id">
                  {{ v.name }}
                </option> -->
              <!-- </select> -->
              <!-- <span v-if="errors.file_opening_date" class="danger_text">{{
                errors.file_opening_date[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="fname">Container no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="container_number"
                name="container_number"
                v-model="editCargoList.container_number"
                placeholder="Enter Your container no."
              />
              <!-- <span v-if="errors.iml_reference_no" class="danger_text">{{
                errors.iml_reference_no[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="fname">Container Type</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="container_type"
                name="container_type"
                v-model="editCargoList.container_type"
                placeholder="Enter Your container type"
              />
              <!-- <span v-if="errors.vessel_name" class="danger_text">{{
                errors.vessel_name[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">Laden Cargo Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="laden_cargo_name"
                name="laden_cargo_name"
                v-model="editCargoList.laden_cargo_name"
                placeholder=" Enter POL"
              />
              <!-- <span v-if="errors.voyage_no" class="danger_text">{{
                errors.voyage_no[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">MLO</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="mlo"
                name="mlo"
                v-model="editCargoList.mlo"
                placeholder=" Enter mlo"
              />
              <!-- <span v-if="errors.nature_of_incident" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">Port of Transshipment</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="port_of_transshipment"
                name="port_of_transshipment"
                v-model="editCargoList.port_of_transshipment"
                placeholder=" Enter port_of_transshipment"
              />
              <!-- <span v-if="errors.nature_of_incident" class="danger_text">{{
                errors.pod[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="editCargoList.cargo_type == 'Container'">
            <div class="col-25">
              <label for="lname">G.W</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="gross_weight"
                name="gross_weight"
                v-model="editCargoList.gross_weight"
                placeholder=" Enter gross_weight"
              />
              <select
                id="unit"
                name="unit"
                class="box"
                v-model="editCargoList.unit"
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
                v-model="editCargoList.supplier"
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
                v-model="editCargoList.bl_no"
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
                v-model="editCargoList.bl_date"
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
                v-model="editCargoList.consignee"
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
                v-model="editCargoList.notify_party"
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
                v-model="editCargoList.port_of_loading"
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
                v-model="editCargoList.port_of_discharge"
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
                v-model="editCargoList.marks_nos"
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
                v-model="editCargoList.description"
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
                v-model="editCargoList.commercial_invoice"
                id="commercial_invoice"
                name="commercial_invoice"
                placeholder="Enter Your commercial_invoice_no"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Commercial Invoice date</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                v-model="editCargoList.commercial_invoice_date"
                id="commercial_invoice_date"
                name="commercial_invoice_date"
                placeholder="Enter Your commercial invoice date"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>
          <div class="row" v-if="editCargoList.cargo_type != 'Container'">
            <div class="col-25">
              <label for="fname">Project Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="editCargoList.project_name"
                id="project_name"
                name="project_name"
                placeholder="Enter Your project name"
              />
              <!-- <span v-if="errors.c_f_consigne" class="danger_text">{{
                errors.c_f_consigne[0]
              }}</span> -->
            </div>
          </div>

          <div class="row" v-if="editCargoList.cargo_type != 5">
            <div class="col-25">
              <label for="fname">Shipment no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="editCargoList.shipment_no"
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
        <div class="row">
          <input type="submit" value="Update" />
          <input type="button" @click="goBack" value="Back" class="back-btn" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EditSurvey",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editCargoList: (state) => state.cargos.cargo,
      // workOrder: (state) => state.w_order.w_orders,
      // categories: (state) => state.category.categories,
      message: (state) => state.cargos.success_message,
    }),
  },

  mounted() {
    this.getEditCargo(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditCargo: "cargos/edit_cargo",
    }),

    editCargo: async function () {
      try {
        let formData = new FormData();
        let id = this.$route.params.id;

        formData.append("work_order_id", this.$route.params.id);
        formData.append("cargo_type", this.editCargoList.cargo_type);
        formData.append("cargo_name", this.editCargoList.cargo_name);
        formData.append("cargo_quantity", this.editCargoList.cargo_quantity);
        formData.append(
          "container_number",
          this.editCargoList.container_number
        );
        formData.append("container_type", this.editCargoList.container_type);
        formData.append(
          "laden_cargo_name",
          this.editCargoList.laden_cargo_name
        );
        formData.append("mlo", this.editCargoList.mlo);
        formData.append(
          "port_of_transshipment",
          this.editCargoList.port_of_transshipment
        );
        formData.append("gross_weight", this.editCargoList.gross_weight);
        formData.append("supplier", this.editCargoList.supplier);
        formData.append("bl_no", this.editCargoList.bl_no);
        formData.append("bl_date", this.editCargoList.bl_date);
        formData.append("consignee", this.editCargoList.consignee);
        formData.append("notify_party", this.editCargoList.notify_party);
        formData.append("port_of_loading", this.editCargoList.port_of_loading);
        formData.append(
          "port_of_discharge",
          this.editCargoList.port_of_discharge
        );
        formData.append("marks_nos", this.editCargoList.marks_nos);
        formData.append("description", this.editCargoList.description);
        formData.append(
          "commercial_invoice",
          this.editCargoList.commercial_invoice
        );
        formData.append(
          "commercial_invoice_date",
          this.editCargoList.commercial_invoice_date
        );
        formData.append("project_name", this.editCargoList.project_name);
        formData.append("shipment_no", this.editCargoList.shipment_no);
        formData.append("unit", this.editCargoList.unit);
        formData.append("_method", "PUT");
        await this.$store
          .dispatch("cargos/update_cargo", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditCargo(this.$route.params.id);
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
    goBack: async function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#edit_cargo {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px; 
}
.edit_cargo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.dcard {
   background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}
.col-75 {
}
</style>
