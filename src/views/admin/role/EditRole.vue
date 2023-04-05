<template>
  <div id="edit_role">
    <div class="card">
      <div class="container">
        <h2>Edit Role</h2>
        <form v-on:submit.prevent="editRole">
          <div class="row">
            <div class="col-25">
              <label for="name">Role Name</label>
            </div>
            <div class="col-75">
              <input
                      type="text"
                      v-model="editRoleData.name"
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
                <div class="permission_data">
                  <label for="permission">
                    <input type="checkbox" v-model="rolePermissions" id="permission" name="permission" :value="permission.id">
                    {{permission.name}}
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "EditStyle",

  data() {
    return {
      errors: {},
      permission: [],
    };
  },

  computed: {
    ...mapState({
      editRoleData: state => state.role.role,
      permissions: state => state.permission.permissions,
      message: (state) => state.role.success_message,
    }),

    ...mapGetters({
        editRolePermissionData: 'role/rolePermissions'
    }),
    rolePermissions: {
        get(){
            return this.editRolePermissionData
        },
        set(value){
            this.$store.commit('role/updateValue', value)
        }
    }
  },

  mounted() {
    this.getAllPermission();
    this.getEditRole(this.$route.params.id);
  },

  methods: {
    ...mapActions({
        getEditRole: "role/edit_role",
        getAllPermission: 'permission/get_all_permission'
    }),

    editRole: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.editRoleData.name);
        this.rolePermissions.forEach((item) => formData.append("permission[]", item));
        formData.append("_method", "PUT");

        await this.$store
          .dispatch("role/update_role", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditRole(id);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#edit_role {
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
