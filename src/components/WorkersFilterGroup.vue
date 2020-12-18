<template>
  <div class='d-flex mx-4 p-2 wrapper_btn_group'>
    <div class='btn-group mx-4'>
      <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true'
              aria-expanded='false'>
        Фильтр по отделу
      </button>
      <div class='dropdown-menu'>
        <a @click='emitSelectedItem({type:"department",label:"IT"})' class='dropdown-item'>IT</a>
        <div class='dropdown-divider'></div>
        <a @click='emitSelectedItem({type:"department",label:"Маркетинг"})' class='dropdown-item'>Маркетинг</a>
        <div class='dropdown-divider'></div>
        <a @click='emitSelectedItem({type:"department",label:"Бухгалтер"})' class='dropdown-item'>Бухгалтер</a>
      </div>
    </div>
    <div class='btn-group'>
      <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true'
              aria-expanded='false'>
        Фильтр по полу
      </button>
      <div class='dropdown-menu'>
        <a @click='emitSelectedItem({type:"gender",label:"male"})' class='dropdown-item'>Мужской</a>
        <div class='dropdown-divider'></div>
        <a @click='emitSelectedItem({type:"gender",label:"female"})' class='dropdown-item'>Женский</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterWorkersGroup',
  methods: {
    emitSelectedItem(payload) {
      this.$emit('filter', payload);
    },
  },
};
</script>

<style scoped>
.wrapper_btn_group {
  background-color: #ebf1ee;
}

.dropdown-menu {
  cursor: pointer;
}
</style>