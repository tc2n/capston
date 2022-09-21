<template>
  <div class="content">
    <div class="loader"></div>
    <h1>
      This is a page visible to all.
      <router-link to="/" class="action"> &#8606; Back</router-link>
    </h1>
  </div>
</template>


<style scoped>
.content {
  background-color: #222;
  display: flex;
  place-content: center;
  align-items: center;
  overflow: hidden;
}

h1, .action {
  z-index: 5;
}
</style>