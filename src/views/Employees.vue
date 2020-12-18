<template>
  <div class=''>
    <WorkersFilterGroup @filter='setFilteredWorkers' />
    <WorkersList :workers='workers' />
  </div>
</template>
<script>


import WorkersFilterGroup from '../components/WorkersFilterGroup';
import WorkersList from '../components/WorkersList';

export default {
  components: { WorkersList, WorkersFilterGroup },
  data() {
    return {
      workers: [],
    };
  },
  computed: {
    allWorkers() {
      return this.$store.getters['getAllWorkers'];
    },
  },
  watch: {
    allWorkers: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.workers = val;
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchWorkers');
  },
  methods: {
    setFilteredWorkers(payload) {
      this.workers = this.allWorkers.filter((worker) => worker[payload.type] === payload.label);
    },
  },
};
</script>