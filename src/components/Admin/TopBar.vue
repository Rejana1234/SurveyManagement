<template>
  <div>
    <nav>
      <div class="container">
        <router-link active-class="active" to="/dashboard" exact>
        <img src="../../assets/Logo/1.svg" class="logo" />
        </router-link>
        <!-- <div class="search-bar">
          <span class="material-icons-sharp">search</span>
          <input type="search" placeholder="Search" />
        </div> -->
        <div class="profile-area">
          <!-- <div class="theme-btn">
            <span class="material-icons-sharp active">light_mode</span>
            <span class="material-icons-sharp">dark_mode</span>
          </div> -->
          <div class="profile" @click="visible = !visible">
            <p v-if="user_Info.image">
              <img :src="user_Info.image" />
            </p>
            <img v-else src="../../assets/profile-1.jpg" alt="" />
            <h5 v-if="user_Info.name">{{ user_Info.name }}</h5>
            <span class="material-icons-sharp" @click="profileDropdown()"
              >expand_more</span
            >
            <ul class="profile-link" v-bind:class="{ show: isshow }">
              <li>
                <router-link to="/dashboard/profile">
                  <span class="material-icons-sharp">account_circle</span>
                  Profile</router-link
                >
              </li>
              <li v-if="(this.user_role_id == 1)">
                <router-link to="/dashboard/change_password">
                  <span class="material-icons-sharp">lock</span>
                  Settings</router-link
                >
              </li>
              <li>
                <a v-on:click="logout">
                  <span class="material-icons-sharp">logout</span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <button id="menu-btn">
            <span class="material-icons-sharp" @click="$emit('open')"
              >menu</span
            >
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TopBar",
  props: ["isShow"],

  data() {
    return {
      user_Info: JSON.parse(localStorage.getItem("user")),
      isshow: false,
      visible: false,
      user_role: JSON.parse(localStorage.getItem("user_role")),
      user_role_id: JSON.parse(localStorage.getItem("user_role_id")),
    };
  },

  computed: {
    ...mapState({
      user_info: (state) => state.edit_user_info,
    }),
  },

  mounted() {
    this.user_edit(this.user_Info.id);
    console.log("user_role: " + this.user_role);
    console.log("user_role_id: " + this.user_role_id);
  },

  methods: {
    ...mapActions({
      user_edit: "edit_user",
    }),

    profileDropdown() {
      this.isshow = !this.isshow;
    },
    logout: async function () {
      try {
        await this.$store.dispatch("logout").then(() => {
          this.$router.push({ path: "/" });
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    document.addEventListener("click", this.documentClick);
  },
  destroyed() {
    // important to clean up!!
    document.removeEventListener("click", this.documentClick);
  },
};
</script>

<style scoped></style>
