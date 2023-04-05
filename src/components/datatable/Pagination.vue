<!-- <template>
    <div>
        <nav aria-label="..." style="cursor: pointer;background: #fff !important;">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: pagination.current_page <= 1 }">
                    <a class="page-link" @click.prevent="changePage(1)"  >First page</a>
                </li>
                <li class="page-item" :class="{ disabled: pagination.current_page <= 1 }">
                    <a class="page-link" @click.prevent="changePage(pagination.current_page - 1)">Previous</a>
                </li>

                <li class="page-item" v-for="page in pages"  :key="page" :class="isCurrentPage(page) ? 'active' : ''">
                    <a class="page-link" @click.prevent="changePage(page)">{{ page }}
                        <span v-if="isCurrentPage(page)" class="sr-only">(current)</span>
                    </a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page >= pagination.last_page }">
                    <a class="page-link" @click.prevent="changePage(pagination.current_page + 1)">Next</a>
                </li>
                <li class="page-item" :class="{ disabled: pagination.current_page >= pagination.last_page }">
                    <a class="page-link" @click.prevent="changePage(pagination.last_page)">Last page</a>
                </li>
            </ul>
        </nav>
    </div>
</template> -->

<template>
  <div>
    <nav aria-label="..." style="cursor: pointer; background: #fff !important">
      <ul class="pagination justify-content-center" style="display: flex">
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page <= 1 }"
        >
          <a
            class="page-link flex-item-pagination"
            @click.prevent="changePage(1)"
            >First page</a
          >
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page <= 1 }"
        >
          <a
            class="page-link flex-item-pagination"
            @click.prevent="changePage(pagination.current_page - 1)"
            >Previous</a
          >
        </li>

        <li
          class="page-item"
          v-for="page in pages"
          :key="page"
          :class="isCurrentPage(page) ? 'active' : ''"
        >
          <a
            class="page-link flex-item-pagination"
            @click.prevent="changePage(page)"
            >{{ page }}
            <span v-if="isCurrentPage(page)" class="sr-only"></span>
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: pagination.current_page >= pagination.last_page }"
        >
          <a
            class="page-link flex-item-pagination"
            @click.prevent="changePage(pagination.current_page + 1)"
            >Next</a
          >
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page >= pagination.last_page }"
        >
          <a
            class="page-link flex-item-pagination"
            @click.prevent="changePage(pagination.last_page)"
            >Last page</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "InterPortPagination",
  props: ["pagination", "offset"],

  data() {
    return {
      pag: "",
    };
  },

  watch: {
    pagination(newVal) {
      this.pag = newVal;
    },
  },

  methods: {
    isCurrentPage(page) {
      return this.pag.current_page === page;
    },
    changePage(page) {
      if (page > this.pagination.last_page) {
        page = this.pagination.last_page;
      }
      this.pag.current_page = page;
      this.$emit("paginate", this.pag.current_page);
    },
  },

  computed: {
    pages() {
      let pages = [];
      let from = this.pagination.current_page - Math.floor(this.offset / 2);
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset - 1;
      if (to > this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      while (from <= to) {
        pages.push(from);
        from++;
      }
      return pages;
    },
  },
};
</script>

<style scoped>
  .flex-item-pagination {
    /* margin: 5px 2px; */
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 7px 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .flex-item-pagination:hover {
    background-color: #ddd;
  }

  .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }

  .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
