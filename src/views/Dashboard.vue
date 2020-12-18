<template>
  <div class=''>
    <h1 class='' v-if='!countsIsReady'>Loading ...</h1>
    <div class='' v-else>
      <h1>Количество всех сотрудников :{{ allWorkers.length }} </h1>
      <h1>Количество мужчин : {{ maleWorkersCount }} </h1>
      <h1>Количество женщин : {{ allWorkers.length - maleWorkersCount }} </h1>
      <h1>Средний возраст сотрудника в компании: {{ averageAge }} </h1>
      <h1>Количество сотрудников IT : {{ ITWorkersCount }}</h1>
      <h1>Количество сотрудников Маркетинга : {{ MarketingWorkersCount }}</h1>
      <h1>Количество сотрудников Бухгалтерии : {{ BookkipingWorkersCount }}</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      ITWorkersCount: null,
      MarketingWorkersCount: null,
      BookkipingWorkersCount: null,
      countsIsReady: false,
    };
  },
  computed: {
    allWorkers() {
      return this.$store.getters['getAllWorkers'];
    },
    maleWorkersCount() {
      return (this.allWorkers.filter((worker) => worker.gender === 'male')).length;
    },
    averageAge() {
      const thisYear = new Date().getUTCFullYear();
      const summaryAge = this.allWorkers.reduce((accumulator, worker) => {
        return accumulator + thisYear - new Date((JSON.parse(worker.dateOfBirth))).getUTCFullYear();
      }, 0);
      return Math.floor(summaryAge / this.allWorkers.length);
    },
  },
  methods: {
    setDepartmentsWorkersCount() {
      this.allWorkers.forEach((worker) => {
        if (worker.department === 'IT') {
          this.ITWorkersCount++;
        } else if (worker.department === 'Маркетинг') {
          this.MarketingWorkersCount++;
        } else {
          this.BookkipingWorkersCount++;
        }
      });
      this.countsIsReady = true;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchWorkers');
    this.setDepartmentsWorkersCount();
  },

};
</script>
