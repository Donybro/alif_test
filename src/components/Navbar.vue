<template>
  <nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
      <span class='navbar-toggler-icon'></span>
    </button>
    <div class='collapse navbar-collapse' id='navbarNavAltMarkup'>
      <div class='navbar-nav'>
        <router-link class='nav-item nav-link active' to='/'>
          <span class='sr-only'>(current)</span>
          Главная
        </router-link>
        <router-link class='nav-item nav-link' to='/employees'>Список работников</router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  async created() {

  },
};
</script>

<style scoped>

</style>