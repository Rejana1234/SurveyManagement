<template>
  <div class="card">
    <h1>Category Description</h1>
    <div class="rows">
      <div class="col-75">
        {{ edit_category.description }}
      </div>
    </div>
    <div class="row">
      <router-link to="/dashboard/category">
        <input type="button" value="Back" class="back-btn" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import { http } from "../../../service/http_service";
export default {
  name: "InterportCategory",

  components: {},

  data() {
    let sortOrders = {};
    return {
      category: [],
      response: [],
      sortKey: "id",
      sortOrders: sortOrders,
      perPage: ["10", "20", "30", "25", "50", "100"],
      tableData: {
        draw: 0,
        length: 10,
        search: "",
        column: 0,
        dir: "desc",
      },
      pagination: {
        last_page: "",
        current_page: 1,
        total: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
        from: "",
        to: "",
      },
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
    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

.rows {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
  margin-left: 3%;
}
/* .row .back-btn {
    margin-left: 0%;
} */

/* button {
  padding: 5px 5px;
  border-radius: 5px;
  color: rgb(189, 42, 42);
  outline: none;
  border: none;
  cursor: pointer;
} */
.search {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  margin-right: 0;
}
.col-75 {
  font-size: initial;
  margin-left: 11px;
}
/* .back-btn {
  margin-right: -207.7%;
} */
</style>
