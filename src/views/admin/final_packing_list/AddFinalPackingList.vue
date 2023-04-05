<template>
  <div id="add_final_packing_list">
    <form class="AddFinalPackingList" v-on:submit.prevent="addFinalPackingList">
      <h2>Add Final Packing List</h2>
      <div class="AddFinalPacking">
        <div class="row">
          <div class="col-25">
            <label for="work_order_id">Work Order ID</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.work_order_id"
              id="work_order_id"
              name="work_order_id"
              placeholder="Enter work_order_id"
            />
            <span v-if="errors.work_order_id" class="danger_text">{{
              errors.work_order_id[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="purchase">Purchase</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.purchase"
              id="purchase"
              name="purchase"
              placeholder=" Enter Your Purchase"
            />
            <span v-if="errors.purchase" class="danger_text">{{
              errors.purchase[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="item_no">Item No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.item_no"
              id="item_no"
              name="item_no"
              placeholder=" Enter Your item_no"
            />
            <span v-if="errors.item_no" class="danger_text">{{
              errors.item_no[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="supply_no">Supply No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.supply_no"
              id="supply_no"
              name="supply_no"
              placeholder=" Enter Your supply_no"
            />
            <span v-if="errors.supply_no" class="danger_text">{{
              errors.supply_no[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="description">Description</label>
          </div>
          <div class="col-75">
            <textarea
              id="description"
              v-model="finalPackingListData.description"
              name="description"
              placeholder="Write your description"
              style="height: 50px; resize: none"
            ></textarea>
            <span v-if="errors.description" class="danger_text">{{
              errors.description[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="sellers_drawing_no">Sellers Drawing No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.sellers_drawing_no"
              id="sellers_drawing_no"
              name="sellers_drawing_no"
              placeholder="Enter Your sellers_drawing_no Number"
            />
            <span v-if="errors.sellers_drawing_no" class="danger_text">{{
              errors.sellers_drawing_no[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="mhi_drawing_no">Mhi Drawing No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.mhi_drawing_no"
              id="mhi_drawing_no"
              name="mhi_drawing_no"
              placeholder="Enter Your mhi_drawing_no Number"
            />
            <span v-if="errors.mhi_drawing_no" class="danger_text">{{
              errors.mhi_drawing_no[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="quantity">Quantity</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.quantity"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity Number"
              style="width: 80.5%"
            />
              <label for="quantity">Unit</label>
            <select
              id="quantity_id"
              name="quantity_id"
              class="box"
              v-model="finalPackingListData.quantity_id"
              style="width: 13%"
            >
              <option value="">select</option>
              <option
                v-for="(quantity, index) in quantities"
                :key="index"
                :value="quantity.id"
              >
                {{ quantity.name }}
              </option>
            </select>
            <span v-if="errors.quantity_id" class="danger_text">{{
              errors.quantity_id[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="hs_code">HS Code</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.hs_code"
              id="hs_code"
              name="hs_code"
              placeholder="Enter Your hs_code Number"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="instruction">Instruction</label>
          </div>
          <div class="col-75">
            <textarea
              id="instruction"
              v-model="finalPackingListData.instruction"
              name="instruction"
              placeholder="Write your instruction"
              style="height: 50px; resize: none"
            ></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="origin">Origin</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.origin"
              id="origin"
              name="origin"
              placeholder="Enter Your origin Number"
            />
            <span v-if="errors.origin" class="danger_text">{{
              errors.origin[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="package_no">Package No</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.package_no"
              id="package_no"
              name="package_no"
              placeholder="Enter Your package_no Number"
            />
            <span v-if="errors.package_no" class="danger_text">{{
              errors.package_no[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="style_id">Style</label>
          </div>
          <div class="col-75">
            <select
              id="style_id"
              name="style_id"
              class="box"
              v-model="finalPackingListData.style_id"
            >
              <option value="">select</option>
              <option
                v-for="(st, index) in styles"
                :key="index"
                :value="st.id"
              >
                {{ st.style_name }}
              </option>
            </select>
            <span v-if="errors.st_id" class="danger_text">{{
              errors.st_id[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="net_weight">Net Weight</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.net_weight"
              id="net_weight"
              name="net_weight"
              placeholder="Enter Your net_weight Number"
            />
            <span v-if="errors.net_weight" class="danger_text">{{
              errors.net_weight[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="kg">Gross Weight</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.kg"
              id="kg"
              name="kg"
              placeholder="Enter Your kg Number"
            />
            <span v-if="errors.kg" class="danger_text">{{ errors.kg[0] }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="height">Height (cm)</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.height"
              id="height"
              name="height"
              placeholder="Enter height "
            />
            <span v-if="errors.height" class="danger_text">{{
              errors.height[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="width">Width (cm)</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.width"
              id="width"
              name="width"
              placeholder="Enter width "
            />
            <span v-if="errors.width" class="danger_text">{{
              errors.width[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="length">Length (cm)</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="finalPackingListData.length"
              id="length"
              name="length"
              placeholder="Enter length"
            />
            <span v-if="errors.length" class="danger_text">{{
              errors.length[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="frieight_ton">Frieight Ton</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.frieight_ton"
              id="frieight_ton"
              name="frieight_ton"
              placeholder="Enter Your frieight_ton Number"
            />
            <span v-if="errors.frieight_ton" class="danger_text">{{
              errors.frieight_ton[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="remarks">Remarks</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.remarks"
              id="remarks"
              name="remarks"
              placeholder="Enter Your remarks Number"
            />
            <span v-if="errors.remarks" class="danger_text">{{
              errors.remarks[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="deck_option">Deck Option</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.deck_option"
              id="deck_option"
              name="deck_option"
              placeholder="Enter Your deck_option Number"
            />
            <span v-if="errors.deck_option" class="danger_text">{{
              errors.deck_option[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="stackability"> Stackability</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.stackability"
              id="stackability"
              name="stackability"
              placeholder="Enter Your stackability Number"
            />
            <span v-if="errors.stackability" class="danger_text">{{
              errors.stackability[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="details">Details</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="finalPackingListData.details"
              id="details"
              name="details"
              placeholder="Enter Your details Number"
            />
            <span v-if="errors.details" class="danger_text">{{
              errors.details[0]
            }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="picture">Picture</label>
          </div>
          <div class="col-75">
            <input
              type="file"
              v-on:change="attachImage"
              name="picture"
              ref="finalPackingListImage"
            />
            <span v-if="errors.attachImage" class="danger_text">{{
              errors.attachImage[0]
            }}</span>
          </div>
        </div>
        <div class="row"></div>
        <div class="row">
          <div class="col-25"></div>
          <div class="col-75">
            <input type="submit" value="Save" />
            <router-link to="/dashboard/final_packing_list">
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
  name: "AddFinalPackingList",

  data() {
    return {
      finalPackingListData: {
        work_order_id: "",
        purchase: "",
        item_no: "",
        supply_no: "",
        description: "",
        sellers_drawing_no: "",
        mhi_drawing_no: "",
        quantity: "",
        quantity_id: "",
        hs_code: "",
        instruction: "",
        origin: "",
        package_no: "",
        style_id: "",
        net_weight: "",
        kg: "",
        height:"",
        width:"",
        length:"",
        frieight_ton: "",
        remarks: "",
        deck_option: "",
        stackability: "",
        picture: "",
        details: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      styles: (state) => state.style.styles,
      quantities: (state) => state.quantity.quantities,
      message: (state) => state.final_packing_list.success_message,
    }),
  },

  mounted() {
    this.getAllQuantity();
    this.getAllStyle();
  },

  methods: {
    ...mapActions({
      getAllQuantity:"quantity/get_all_quantity",
      getAllStyle:"style/get_all_style",
    }),

    attachImage: function () {
      //to use some file todo
      this.picture = this.$refs.finalPackingListImage.files[0];
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

    addFinalPackingList: async function () {
      try {
        let formData = new FormData();

        formData.append("work_order_id",this.finalPackingListData.work_order_id);
        formData.append("purchase", this.finalPackingListData.purchase);
        formData.append("item_no", this.finalPackingListData.item_no);
        formData.append("supply_no", this.finalPackingListData.supply_no);
        formData.append("description", this.finalPackingListData.description);
        formData.append("sellers_drawing_no",this.finalPackingListData.sellers_drawing_no);
        formData.append( "mhi_drawing_no", this.finalPackingListData.mhi_drawing_no);
        formData.append("quantity", this.finalPackingListData.quantity);
        formData.append("quantity_id", this.finalPackingListData.quantity_id);
        formData.append("hs_code", this.finalPackingListData.hs_code);
        formData.append("instruction", this.finalPackingListData.instruction);
        formData.append("origin", this.finalPackingListData.origin);
        formData.append("package_no", this.finalPackingListData.package_no);
        formData.append("style_id", this.finalPackingListData.style_id);
        formData.append("net_weight", this.finalPackingListData.net_weight);
        formData.append("kg", this.finalPackingListData.kg);
        formData.append("height", this.finalPackingListData.height);
        formData.append("width", this.finalPackingListData.width);
        formData.append("length", this.finalPackingListData.length);
        formData.append("frieight_ton", this.finalPackingListData.frieight_ton);
        formData.append("remarks", this.finalPackingListData.remarks);
        formData.append("deck_option", this.finalPackingListData.deck_option);
        formData.append("stackability", this.finalPackingListData.stackability);
        formData.append("picture", this.picture);
        formData.append("details", this.finalPackingListData.details);
        // console.log(this.finalPackingListData.details);
        await this.$store
          .dispatch("final_packing_list/add_final_packing_list", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.finalPackingListData = {};
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
#add_final_packing_list {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}
.AddFinalPacking {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3%;
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
