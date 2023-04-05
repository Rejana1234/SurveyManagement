<template>
  <div id="edit_consign">
    <form class="EditConsign" v-on:submit.prevent="editConsign">
      <h2>Edit Consignee</h2>
      <div class="distance">
      <div class="row">
        <div class="col-25">
          <label for="company_name">Company Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editConsignList.company_name"
            id="company_name"
            name="company_name"
            placeholder="Enter Your company name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="cname">Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editConsignList.c_f_name"
            id="cname"
            name="c_f_name"
            placeholder=" Enter Your CF_name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="lname">Phone</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editConsignList.phone"
            id="mobile"
            name="phone"
            placeholder=" Enter Your phone number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="fname">Address</label>
        </div>
        <div class="col-75">
          <textarea
            id="address"
            v-model="editConsignList.address"
            name="address"
            placeholder="Write your address"
            style="height: 200px;resize: none;"
          ></textarea>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Update" />
          <router-link to="/dashboard/consign">
            <input type="button" value="Back" class="back-btn" />
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "EditConsign",

        data(){
            return{
                errors: {}
            }
        },

        computed: {
            ...mapState({
                editConsignList: state => state.c_f_consign.consign,
                message: (state) => state.c_f_consign.success_message,
            })
        },

        mounted(){
            this.getEditConsign(this.$route.params.id);
        },

        methods: {
            ...mapActions({
                getEditConsign: 'c_f_consign/edit_consign',
            }),



            editConsign: async function(){
                try {
                    let id = this.$route.params.id;
                    let formData = new FormData();

                    formData.append('company_name', this.editConsignList.company_name);
                    formData.append('c_f_name', this.editConsignList.c_f_name);
                    formData.append('phone', this.editConsignList.phone);
                    formData.append('address', this.editConsignList.address);
                    formData.append('_method', 'PUT');

                    await this.$store.dispatch('c_f_consign/update_consign', {id:id, data:formData}).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.getEditConsign(this.$route.params.id);
                        this.$router.go(-1);
                    })
                }catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>
<style scoped>
#edit_consign {
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

