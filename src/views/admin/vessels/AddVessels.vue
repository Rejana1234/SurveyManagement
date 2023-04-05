<template>
  <div id="add_vessels">
    <div class="vcard">
      <form class="AddVessels" v-on:submit.prevent="addVessels" >
        <h2>Add Vessels</h2>
          <div class="row">
            <div class="col-25">
              <label for="dname">Vessels Name</label>
            </div>
            <div class="col-75">
              <input type="text" v-model="vesselsData.name" id="vname" name="name" placeholder="Enter Vessels Name"/>
              <span v-if="errors.name" class="danger_text">{{errors.name[0]}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="dname">Vessels Code</label>
            </div>
            <div class="col-75">
              <input type="text" v-model="vesselsData.code" id="vcode" name="code" placeholder="Enter Vessels Code"/>
              <span v-if="errors.code" class="danger_text">{{errors.code[0]}}</span>
            </div>
          </div>
          <div class="row">
            <input type="submit"  value="Save "> 
            <router-link to="/dashboard/vessels"> <input type="button" value="Back" class="back-btn" /> </router-link>
          </div>
        
      </form>
    </div>
  </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: "AddVessels",
        title: "InterPort - Add Vessels",

        data(){
            return{
                vesselsData: {
                    name: '',
                    code: '',
                },
                errors:{}
            }
        },

        computed: {
            ...mapState({
                message: state => state.vessels.success_message
            })
        },

        methods: {
            addVessels: async function(){
                try {
                    let formData = new FormData();

                    formData.append('name', this.vesselsData.name);
                    formData.append('code', this.vesselsData.code);

                    await this.$store.dispatch('vessels/add_vessel', formData).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.vesselsData = {};
                       
                    })
                }catch (e) {
                    switch (e.response.status)
               {
                   case 422:
                       this.errors = e.response.data.errors;
                       break;
                   default:
                       this.$swal.fire({
                           icon: 'error',
                           text: 'Oops',
                           title: e.response.data.error,
                       });
                       break;
               }
                }
            },
        }
    }
</script>

<style scoped>
#add_vessels {
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
