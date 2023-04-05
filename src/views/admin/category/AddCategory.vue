<template>
  <div id="add-category">
    <div class="card">
      <div class="container">
        <h2>Add Category</h2>
        <form v-on:submit.prevent="addCategory">
          <div class="row">
            <div class="col-25">
              <label for="dname">Category Name</label>
            </div>
            <div class="col-75">
              <input
                required
                type="text"
                v-model="categoryData.name"
                id="dname"
                name="name"
                placeholder="Enter Category Name"
              />
              <span v-if="errors.name" class="danger_text">{{
                errors.name[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="description">Category Description</label>
            </div>
            <div class="col-75">
              <input
                required
                type="text"
                v-model="categoryData.description"
                id="description"
                name="description"
                placeholder="Enter Category description"
              />
              <span v-if="errors.description" class="danger_text">{{
                errors.description[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Submit" />
            <router-link to="/dashboard/category" style="float: right">
              <input type="button" value="Back" class="back-btn" />
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddCategory",
  title: "InterPort - Add Category",

  data() {
    return {
      categoryData: {
        name: "",
        description: "",
      },
      errors: {},
    };
  },

  computed: {
    ...mapState({
      message: (state) => state.category.success_message,
    }),
  },

  methods: {
    addCategory: async function () {
      try {
        let formData = new FormData();

        formData.append("name", this.categoryData.name);
        formData.append("description", this.categoryData.description);

        await this.$store
          .dispatch("category/add_category", formData)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.categoryData = {};
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
              text: "Field Required",
              // title: e.response.data.error,
            });
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#add-category {
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
</style>
