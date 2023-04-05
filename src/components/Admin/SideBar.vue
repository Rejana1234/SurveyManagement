<template>
  <div id="sidebar">
    <aside v-bind:style="[this.isOpen === true ? { display: 'block' } : '']">
      <button id="close-btn">
        <span class="material-icons-sharp" @click="$emit('close')">close</span>
      </button>

      <div class="sidebar">
        <li>
          <div class="icon-link">
            <router-link active-class="active" to="/dashboard" exact>
              <span class="material-icons-sharp">dashboard</span>
              <h4>Dashboard</h4>
            </router-link>
          </div>
        </li>

        <li>
          <div class="icon-link">
            <router-link to="/dashboard/workorders">
              <span class="material-icons-sharp">work</span>
              <h4 class="link_name">Files</h4>
            </router-link>
          </div>
        </li>
        <li>
          <div class="icon-link">
            <router-link to="/dashboard/attendance">
              <span class="material-icons-sharp">present_to_all</span>
              <h4 class="link_name">Attendance</h4>
            </router-link>
          </div>
        </li>
        <!-- <li>
          <div class="icon-link">
            <router-link to="/dashboard/all_reports">
              <span class="material-icons-sharp">summarize</span>
              <h4 class="link_name">Reports</h4>
            </router-link>
          </div>
        </li> -->

        <li
          v-bind:class="{ showMenu: isdisplay1 }"
          v-if="
            this.user_role_id == 1
          "
        >
          <div class="icon-link">
            <a style="cursor: pointer">
              <span class="material-icons-sharp">manage_accounts</span>
              <h4 class="link_name">User</h4>
              <span class="material-icons-sharp arrow" @click="menuDropdown1()"
                >expand_more</span
              >
            </a>
          </div>
          <ul class="sub-menu">
            <li>
              <router-link to="/dashboard/users">
                <span class="material-icons-sharp">add</span>
                Users
              </router-link>
            </li>

            <li>
              <router-link to="/dashboard/role">
                <span class="material-icons-sharp">add</span>
                Roles
              </router-link>
            </li>

            <!-- <li>
              <router-link to="/dashboard/permission">
                <span class="material-icons-sharp">add</span>
                Permission
              </router-link>
            </li> -->
          </ul>
        </li>
        <li v-else></li>
        <li
          v-bind:class="{ showMenu: isdisplay }"
          v-if="this.user_role_id != 5"
        >
          <div class="icon-link">
            <a style="cursor: pointer">
              <span class="material-icons-sharp">settings</span>
              <h4 class="link_name">Settings</h4>
              <span class="material-icons-sharp arrow" @click="menuDropdown()"
                >expand_more</span
              >
            </a>
          </div>
          <ul class="sub-menu">
            <li>
              <router-link to="/dashboard/category">
                <span class="material-icons-sharp">add</span>
                Category
              </router-link>
            </li>

            <!-- <li>
              <router-link to="/dashboard/damage">
                <span class="material-icons-sharp">add</span>
                Damage
              </router-link>
            </li> -->

            <li>
              <router-link to="/dashboard/surveyor">
                <span class="material-icons-sharp">add</span>
                Surveyor
              </router-link>
            </li>
            <li v-if="this.user_role_id == 1 || this.user_role_id == 2">
              <router-link to="/dashboard/surveyFirm">
                <span class="material-icons-sharp">add</span>
                Survey Firm
              </router-link>
            </li>
          </ul>
        </li>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  props: ["isOpen"],
  data() {
    return {
      isdisplay: false,
      isdisplay1: false,
      isdisplay2: false,
      isdisplay3: false,
      isdisplay4: false,
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
    };
  },
  mounted() {
    console.log("user_role: " + this.user_role);
    console.log("user_role_id: " + this.user_role_id);
  },
  methods: {
    menuDropdown() {
      this.isdisplay = !this.isdisplay;
    },

    menuDropdown1() {
      this.isdisplay1 = !this.isdisplay1;
    },
  },
};
</script>
<style scoped>
#sidebar{
  background-color: rgb(31, 59, 72);
  margin-right: 2%;
  /* border-radius: 2%; */
}
</style>
