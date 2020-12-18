<template>
  <div class=''>
    <ul class=''>
      <li v-for='(worker ,i) in workersList[currentPage-1]' :key='worker.id'>
        <router-link :to='`/employee/${worker.id}`'>
          {{ i + 1 }}. {{ worker.name }}
        </router-link>
      </li>
    </ul>
    <nav>
      <div class='pagination'>
        <button @click='paginateHandler(--currentPage)' class='page-item' :disabled='currentPage<=1'>
          <a class='page-link'>Назад</a></button>
        <div @click='paginateHandler(item)' v-for='item in workersList.length' class='page-item' :key='item'>
          <a class='page-link' :class='{"active":currentPage===item}'>{{ item }}</a>
        </div>
        <button :disabled='currentPage>=workersList.length' @click='paginateHandler(++currentPage)' class='page-item'
        ><a class='page-link'>Вперед</a>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import chunk from 'lodash.chunk';

export default {
  name: 'WorkersList',
  props: ['workers'],
  data() {
    return {
      paginateListLength: null,
      pageSize: 6,
      currentPage: 1,
    };
  },
  computed: {
    workersList() {
      return chunk(this.workers, this.pageSize);
    },
  },
  mounted() {
    if (this.$route.query.page) {
      this.currentPage = +this.$route.query.page;
    }
  },
  methods: {
    paginateHandler(num) {
      if (num >= 1 && num <= this.workersList.length) {
        this.currentPage = +num;
        this.$router.push(`${this.$route.path}?page=${this.currentPage}`);
      }
    },
  },

};
</script>

<style scoped>
ul {
  min-height: 200px;
}

a {
  text-decoration: none;
  color: #000;
}

button {
  border: none;
  outline: none;
}

.active {
  background-color: #8cdcf3;
}
</style>