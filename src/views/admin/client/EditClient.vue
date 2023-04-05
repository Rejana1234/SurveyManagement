<template>
  <div id="edit_client">
    <form class="EditClient" v-on:submit.prevent="editClient">
      <h2>Edit Client</h2>
      <div class="distance">
      <div class="row">
        <div class="col-25">
          <label for="coname">Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editClientList.name"
            id="name"
            name="name"
            placeholder="Enter Your name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="cname">Email</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editClientList.email"
            id="email"
            name="email"
            placeholder=" Enter Your Email"
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
            v-model="editClientList.phone"
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
            v-model="editClientList.address"
            name="address"
            placeholder="Write your address"
            style="height: 200px;resize: none;"
          ></textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="fname">NID</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            v-model="editClientList.nid"
            id="nid"
            name="nid"
            placeholder="Enter Your NID Number"
          />
        </div>
      </div>
      </div>

      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Update" />
          <router-link to="/dashboard/client">
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
        name: "EditClient",
        title: "InterPort - Edit Client",

        data(){
            return{
                errors: {}
            }
        },

        computed: {
            ...mapState({
                editClientList: state => state.client.client,
                message: state => state.client.success_message
            })
        },

        mounted(){
            this.getEditClient(this.$route.params.id);
        },

        methods: {
            ...mapActions({
                getEditClient: 'client/edit_client',
            }),



            editClient: async function(){
                try {
                    let id = this.$route.params.id;
                    let formData = new FormData();

                    formData.append('name', this.editClientList.name);
                    formData.append('email', this.editClientList.email);
                    formData.append('phone', this.editClientList.phone);
                    formData.append('address', this.editClientList.address);
                    formData.append('nid', this.editClientList.nid);
                    formData.append('_method', 'PUT');

                    await this.$store.dispatch('client/update_client', {id:id, data:formData}).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.getEditClient(this.$route.params.id);
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
#edit_client {
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

