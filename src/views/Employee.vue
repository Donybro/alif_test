<template>
  <div class='wrapper'>
    <div class='header p-4 d-flex justify-content-between'>
      <h1>Cтраница просмотра сотрудника</h1>
      <button @click='deleteWorker' :disabled='modifiedMode' class='btn btn-danger'>Удалить работника</button>
      <button @click='modifiedMode=true' :disabled='modifiedMode' class='btn btn-primary'>Редактировать</button>
    </div>
    <div v-if='!modifiedMode' class='d-flex p-5 flex-column align-items-start'>
      <h4>Имя сотрудника : {{ info.name }}</h4>
      <h4>Фамилия сотрудника : {{ info.surname }}</h4>
      <h4>Пол сотрудника : {{ info.gender === 'male' ? 'Мужчина' : 'Женщина' }}</h4>
      <h4>Дата рождения сотрудника : {{ JSON.parse(info.dateOfBirth) }}</h4>
      <h4>Должность сотрудника : {{ info.position }}</h4>
      <h4>Отдел сотрудника : {{ info.department }}</h4>
    </div>
    <div v-else class='d-flex p-5 flex-column align-items-start'>
      <label for='name'>Имя</label>
      <input v-model='name' :placeholder='info.name' class='form-control' id='name' type='text'
             aria-label='default input example'>
      <label for='surname'>Фамилия</label>
      <input v-model='surname' class='form-control' :placeholder='info.surname' id='surname' type='text'
             aria-label='default input example'>
      <label for='position'>Должность</label>
      <input v-model='position' :placeholder='info.position' id='position' class='form-control' type='text'
             aria-label='default input example'>
      <label for='date'>Дата рождения</label>
      <input v-model='dateOfBirth' id='date' class='form-control' type='text'
             :placeholder='JSON.parse(info.dateOfBirth)'
             aria-label='default input example'>
      <div class='btn-group mx-4'>
        <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true'
                aria-expanded='false'>
          Отдел : {{ department || info.department }}
        </button>
        <div class='dropdown-menu'>
          <a @click='department="IT"' class='dropdown-item' :class='{"active":department==="IT"}'>IT</a>
          <div class='dropdown-divider'></div>
          <a @click='department="Маркетинг"' class='dropdown-item'
             :class='{"active":department==="Маркетинг"}'>Маркетинг</a>
          <div class='dropdown-divider'></div>
          <a @click='department="Бухгалтерия"' class='dropdown-item'
             :class='{"active":department==="Бухгалтерия"}'>Бухгалтерия</a>
        </div>
      </div>
      <div class=''>
        <h3>Пол</h3>
        <div class='form-check'>
          <input class='form-check-input' value='female' type='radio' v-model='gender' id='flexRadioDefault1'>
          <label class='form-check-label ml-4 mt-1' for='flexRadioDefault1'>
            Женщина
          </label>
        </div>
        <div class='form-check'>
          <input class='form-check-input' value='male' type='radio' v-model='gender' id='flexRadioDefault2'>
          <label class='form-check-label ml-4  mt-1' for='flexRadioDefault2'>
            Мужчина
          </label>
        </div>
      </div>
      <button @click='setChanges' class='btn btn-success'>Сохранить</button>
      <button @click='modifiedMode=!modifiedMode' class='btn btn-primary'>Отменить</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Employee',
  data() {
    return {
      keyForUpdate: 1,
      modifiedMode: false,
      name: '',
      surname: '',
      department: '',
      gender: '',
      position: '',
      dateOfBirth: '',
    };
  },
  computed: {
    info() {
      return this.$store.getters['getAllWorkers'].find((worker) => {
        return +worker.id === +this.$route.params.id;
      });
    },
  },
  methods: {
    async deleteWorker() {
      await axios.delete(`http://localhost:3000/workers/${this.$route.params.id}`);
      this.$router.push('/employees');
    },
    async setChanges() {
      this.modifiedMode = false;
      await axios.put(`http://localhost:3000/workers/${this.$route.params.id}`, {
        'name': this.name || this.info.name,
        'surname': this.surname || this.info.surname,
        'position': this.position || this.info.position,
        'department': this.department || this.info.department,
        dateOfBirth: this.dateOfBirth ? '"' + this.dateOfBirth + '"' : this.info.dateOfBirth,
        gender: this.gender,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await this.$store.dispatch('fetchWorkers');
      result ? this.$router.push('/employee/' + this.$route.params.id) : null;
    },
  },
  mounted() {
    this.gender = this.info.gender;
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 500px;
}

.active {
  background-color: #6bde78;
}

input, button {
  margin: 10px 0;
}
</style>