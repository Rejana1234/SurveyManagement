<template>
  <div id="edit_invoice">
    <div class="dcard">
      <form class="EditInvoice-form" v-on:submit.prevent="editInvoice">
        <h2>Edit Invoice</h2>
        <div class="EditInvoice">
          <div class="row">
            <div class="col-25">
              <label for="note">Raised By</label>
            </div>
            <div class="col-75">
              <input type="text" name="raised_by" v-model="edit_invoiceData.raised_by" />
              <br />
              <span v-if="errors.raised_by" class="danger_text">{{ errors.raised_by[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Uploaded By</label>
            </div>
            <div class="col-75">
              <input type="text" name="uploaded_by" v-model="edit_invoiceData.uploaded_by" />
              <br />
              <span v-if="errors.uploaded_by" class="danger_text">{{ errors.uploaded_by[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label>Invoice Type</label>
            </div>
            <div class="col-75">
              <select id="invoice_type" name="invoice_type" v-model="edit_invoiceData.invoice_type">
                <option value="">Select Invoice</option>
                <option>Interin</option>
                <option>Final</option>
              </select>
              <span v-if="errors.invoice_type" class="danger_text">{{ errors.invoice_type[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Date of Invoice</label>
            </div>
            <div class="col-75">
              <input type="date" name="invoice_date" v-model="edit_invoiceData.invoice_date" />
              <br />
              <span v-if="errors.invoice_date" class="danger_text">{{ errors.invoice_date[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Invoice No.</label>
            </div>
            <div class="col-75">
              <input type="text" name="invoice_no" v-model="edit_invoiceData.invoice_no" />
              <br />
              <span v-if="errors.invoice_no" class="danger_text">{{ errors.invoice_no[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Amount</label>
            </div>
            <div class="col-75">
              <input type="number" name="amount" v-model="edit_invoiceData.amount" />
              <br />
              <span v-if="errors.amount" class="danger_text">{{ errors.amount[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="date">Payment Recieving Date</label>
            </div>
            <div class="col-75">
              <input type="date" name="payment_receiving_date" v-model="edit_invoiceData.payment_receiving_date" />
              <br />
              <span v-if="errors.payment_receiving_date" class="danger_text">{{
                errors.payment_receiving_date[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="note">Notes</label>
            </div>
            <div class="col-75">
              <input type="text" name="notes" v-model="edit_invoiceData.notes" />
              <br />
              <span v-if="errors.notes" class="danger_text">{{ errors.notes[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="currency">Currency</label>
            </div>
            <div class="col-75">
              <select id="invoice_type" name="invoice_type" v-model="edit_invoiceData.currency">
                <option value="">Select Currency</option>
                <option>USD</option>
                <option>BDT</option>
                <option>Euro</option>
                <option>Sigapure Dollar</option>
              </select>
              <span v-if="errors.currency" class="danger_text">{{ errors.currency[0] }}</span>
            </div>
            <!-- <div class="col-75">
              <input
                type="text"
                name="currency"
                v-model="invoiceData.currency"
              />
              <br />
              <span v-if="errors.currency" class="danger_text">{{
                errors.currency[0]
              }}</span>
            </div> -->
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Attach Invoice File</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewInFFile" name="invoice_file" ref="invoiceFile" />
            </div>
            <div class="invoice_file" v-if="preview_invoice_file">
              <img
                :src="preview_invoice_file"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>

            <div class="invoice_file" v-else>
              <img
                :src="edit_invoiceData.invoice_file"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">Attach Time Log File</label>
            </div>
            <div class="col-75">
              <input type="file" @change="previewTLFFile" name="time_log_file" ref="TLFFile" />
            </div>
            <div class="time_log_file" v-if="preview_time_log_file">
              <img
                :src="preview_time_log_file"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>

            <div class="time_log_file" v-else>
              <img
                :src="edit_invoiceData.time_log_file"
                alt=""
                style="width: 40%; height: 150px; border-radius: 5%; margin-top: 5px"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <br />
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import { state } from "fs";
import { mapActions, mapState } from "vuex";

export default {
  name: "AddSurvey",

  data() {
    return {
      errors: {},
      preview_time_log_file: null,
      preview_invoice_file: null,
    };
  },

  computed: {
    ...mapState({
      edit_invoiceData: (state) => state.invoice.invoice,
      //   invoice: (state) => state.invoice.invoice,
      message: (state) => state.invoice.success_message,
    }),
  },

  mounted() {
    this.getAllW_Order();
    this.getAllCategory();
    this.getEditInvoice(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getAllW_Order: "w_order/get_all_w_order",
      getAllCategory: "category/get_all_category",
      getEditInvoice: "invoice/edit_invoice",
    }),

    previewInFFile: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_invoice_file = e.target.result;
        };
        this.invoice_file = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewTLFFile: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_time_log_file = e.target.result;
        };
        this.time_log_file = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    editInvoice: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();
        formData.append("work_order_id", this.$route.params.id);
        formData.append("invoice_no", this.edit_invoiceData.invoice_no);
        formData.append("invoice_type", this.edit_invoiceData.invoice_type);
        formData.append("raised_by", this.edit_invoiceData.raised_by);
        formData.append("uploaded_by", this.edit_invoiceData.uploaded_by);
        formData.append("invoice_date", this.edit_invoiceData.invoice_date);
        formData.append("invoice_no", this.edit_invoiceData.invoice_no);
        formData.append("amount", this.edit_invoiceData.amount);
        formData.append("currency", this.edit_invoiceData.currency);
        formData.append("payment_receiving_date", this.edit_invoiceData.payment_receiving_date);
        formData.append("notes", this.edit_invoiceData.notes);
        formData.append("invoice_file", this.invoice_file);
        formData.append("time_log_file", this.time_log_file);
        await this.$store.dispatch("invoice/update_invoice", { id: id, data: formData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.edit_invoiceData = {};
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
#edit_invoice {
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
.EditInvoice {
  background: rgb(234, 234, 234);
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(234, 233, 233);
  transition: all 300ms ease;
  margin-top: 1%;
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
input[type="number"] {
  width: 85%;
  height: 40px;
}
.modal-vue .modal[data-v-507a997b] {
  position: absolute;
  width: 50%;
  z-index: 9999;
  margin: -270px auto;
  padding: 20px 30px;
  background-color: #fff;
  left: 0;
  right: 0;
}

/* Checkbox stylr */
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
