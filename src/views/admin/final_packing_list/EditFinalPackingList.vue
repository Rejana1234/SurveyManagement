<template>
  <div id="edit_final_packing_list">
    <form class="EditFinalPackingList" v-on:submit.prevent="editFinalPacking">
      <h2>Edit Final Packing List</h2>
      <div class="EditFinalPacking">
        <div class="row">
          <div class="col-25">
            <label for="work_order_id">Work Order ID</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="editFinalPackingList.work_order_id"
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
              v-model="editFinalPackingList.purchase"
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
              v-model="editFinalPackingList.item_no"
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
              v-model="editFinalPackingList.supply_no"
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
              v-model="editFinalPackingList.description"
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
              v-model="editFinalPackingList.sellers_drawing_no"
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
              v-model="editFinalPackingList.mhi_drawing_no"
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
            <label for="quantity_id">Quantity ID</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editFinalPackingList.quantity_id"
              id="quantity_id"
              name="quantity_id"
              placeholder="Enter Your quantity_id Number"
            />
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
              v-model="editFinalPackingList.hs_code"
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
              v-model="editFinalPackingList.instruction"
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
              v-model="editFinalPackingList.origin"
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
              v-model="editFinalPackingList.package_no"
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
            <label for="style_id">Style ID</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="editFinalPackingList.style_id"
              id="style_id"
              name="style_id"
              placeholder="Enter Your style_id Number"
            />
            <span v-if="errors.style_id" class="danger_text">{{
              errors.style_id[0]
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
              v-model="editFinalPackingList.net_weight"
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
              v-model="editFinalPackingList.kg"
              id="kg"
              name="kg"
              placeholder="Enter Your kg Number"
            />
            <span v-if="errors.kg" class="danger_text">{{ errors.kg[0] }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="volume_m3">Volume M3</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              v-model="editFinalPackingList.volume_m3"
              id="volume_m3"
              name="volume_m3"
              placeholder="Enter Your volume_m3 Number"
            />
            <span v-if="errors.volume_m3" class="danger_text">{{
              errors.volume_m3[0]
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label for="dimension_id">Dimension ID</label>
          </div>
          <div class="col-75">
            <input
              type="number"
              v-model="editFinalPackingList.dimension_id"
              id="dimension_id"
              name="dimension_id"
              placeholder="Enter Your dimension_id Number"
            />
            <span v-if="errors.dimension_id" class="danger_text">{{
              errors.dimension_id[0]
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
              v-model="editFinalPackingList.frieight_ton"
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
              v-model="editFinalPackingList.remarks"
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
              v-model="editFinalPackingList.deck_option"
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
              v-model="editFinalPackingList.stackability"
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
              v-model="editFinalPackingList.details"
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
        <div class="row">
          <div class="col-25"></div>
          <div class="col-75">
            <input type="submit" value="Update" />
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
  name: "EditFinalPackingList",
  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      editFinalPackingList: (state) =>
        state.final_packing_list.final_packing_list,
      message: (state) => state.final_packing_list.success_message,
    }),
  },

  mounted() {
    this.getEditFinalPackingList(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditFinalPackingList: "final_packing_list/edit_final_packing_list",
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

    editFinalPacking: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("work_order_id",this.editFinalPackingList.work_order_id);
        formData.append("purchase", this.editFinalPackingList.purchase);
        formData.append("item_no", this.editFinalPackingList.item_no);
        formData.append("supply_no", this.editFinalPackingList.supply_no);
        formData.append("description", this.editFinalPackingList.description);
        formData.append( "sellers_drawing_no",this.editFinalPackingList.sellers_drawing_no);
        formData.append("mhi_drawing_no",this.editFinalPackingList.mhi_drawing_no);
        formData.append("quantity", this.finalPackingListData.quantity);
        formData.append("quantity_id", this.editFinalPackingList.quantity_id);
        formData.append("hs_code", this.editFinalPackingList.hs_code);
        formData.append("instruction", this.editFinalPackingList.instruction);
        formData.append("origin", this.editFinalPackingList.origin);
        formData.append("package_no", this.editFinalPackingList.package_no);
        formData.append("style_id", this.editFinalPackingList.style_id);
        formData.append("net_weight", this.editFinalPackingList.net_weight);
        formData.append("kg", this.editFinalPackingList.kg);
        formData.append("volume_m3", this.editFinalPackingList.volume_m3);
        formData.append("dimension_id", this.editFinalPackingList.dimension_id);
        formData.append("frieight_ton", this.editFinalPackingList.frieight_ton);
        formData.append("remarks", this.editFinalPackingList.remarks);
        formData.append("deck_option", this.editFinalPackingList.deck_option);
        formData.append("stackability", this.editFinalPackingList.stackability);
        formData.append("details", this.editFinalPackingList.details);
        formData.append("picture", this.picture);
        
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("final_packing_list/update_final_packing_list", {
            id: id,
            data: formData,
          })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditFinalPackingList(this.$route.params.id);
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
#edit_final_packing_list {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 1%;
}

.EditFinalPacking {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3%;
}
</style>
