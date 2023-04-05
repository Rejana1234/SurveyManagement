<template>
  <div id="edit-category">
    <div class="card">
      <div class="container">
        <h2>Edit Category</h2>
        <form v-on:submit.prevent="editCategory">
          <div class="row">
            <div class="col-25">
              <label for="ddescription">Category Name</label>
            </div>
            <div class="col-75">
              <input
                required
                type="text"
                v-model="edit_category.name"
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
                v-model="edit_category.description"
                id="ddescription"
                name="description"
                placeholder="Enter Category description"
              />
            </div>
          </div>

          <div class="row">
            <input type="submit" value="Update" />
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
import { mapState, mapActions } from "vuex";

export default {
  name: "AddCategory",

  data() {
    return {
      errors: {},
    };
  },

  computed: {
    ...mapState({
      edit_category: (state) => state.category.category,
      message: (state) => state.category.success_message,
    }),
  },

  mounted() {
    this.getEditCategory(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getEditCategory: "category/edit_category",
    }),

    editCategory: async function () {
      try {
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("name", this.edit_category.name);
        formData.append("description", this.edit_category.description);

        formData.append("_method", "PUT");

        await this.$store
          .dispatch("category/update_category", { id: id, data: formData })
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.getEditCategory(this.$route.params.id);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#edit-category {
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
