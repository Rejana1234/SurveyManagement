<template>
  <div class="dashboard">
    <!--Nav section start-->
    <TopBar @open="sidebarOpen()" />
    <!--Nav section end-->

    <!--Main section start-->
    <main>
      <!--Sidebar section start-->
      <SideBar :isOpen="isOpen" @close="sidebarClose()" />
      <!--Sidebar section end-->

      <!--Middle section start-->
      <section class="middle">
        <div class="header">
          <!-- <h1>Overview</h1> -->
        </div>

        <router-view></router-view>
      </section>
      <!--Middle section end-->
    </main>
    <!--Main section end-->
  </div>
</template>
<script>
import TopBar from "@/components/Admin/TopBar.vue";
import SideBar from "@/components/Admin/SideBar.vue";

export default {
  name: "MyDashboard",
  components: { TopBar, SideBar },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    sidebarOpen() {
      this.isOpen = true;
    },

    sidebarClose() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.middle {
  padding: 0px 3px 0px 3px;
  margin: 0px 5px 0px 5px;
}
</style>
