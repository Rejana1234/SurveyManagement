<template>
  <div id="add_role">
    <div class="card">
      <div class="container">
        <h2>Add Role</h2>
        <form v-on:submit.prevent="addRole">
          <div class="row">
            <div class="col-25">
              <label for="name">Role Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="roleData.name"
                id="name"
                name="name"
                placeholder="Enter Role Name"
              />
              <span v-if="errors.name" class="danger_text">{{
                errors.name[0]
              }}</span>
            </div>
          </div>
          <br><br>
          <!-- <strong>Permissions:</strong>

          <div class="row">
            <ul class="grid">
              <li v-for="permission in permissions" :key="permission.id">
                <div class="permission_data" >
                  <label for="permission">
                    <input type="checkbox" id="permission" name="permission"  v-model="roleData.permission" :value="permission.id">
                    {{permission.name}}
                    <label :for="permission.id">{{ permission.name }}</label>
                  </label>
                </div>
              </li>
            </ul>
          </div> -->

          <div class="row">
            <input type="submit" value="Submit" />
            <router-link to="/dashboard/role" style="float: right">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AddPermission",

  data() {
    return {
      roleData: {
        name: "",
        permission: []
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
        permissions: state => state.permission.permissions,
        message: (state) => state.role.success_message,
    }),
  },

  mounted(){
    this.getAllPermission();
  },

  methods: {

      ...mapActions({
          getAllPermission: 'permission/get_all_permission'
      }),

      addRole: async function () {
        try {
          let formData = new FormData();

          formData.append("name", this.roleData.name);
          this.roleData.permission.forEach((item) => formData.append("permission[]", item));

          await this.$store
            .dispatch("role/add_role", formData)
            .then(() => {
              this.$swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: this.message,
                showConfirmButton: false,
                timer: 1500,
              });

              this.roleData = {};
              this.roleData.permission = '';
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
#add_role {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}
* {
  box-sizing: border-box;
  appearance: auto;
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, auto);
    /*gap: 3rem 0.75rem;*/
    background-color: #f0f0f0;
    list-style-type: none;
    margin-bottom: 10px;
    padding: 10px;
  }

</style>
