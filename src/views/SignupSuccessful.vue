<template>
  <div class="content">
    <div class="loader"></div>
    <h1>
      Signup Successful, Please Login now
      <router-link to="/login" class="action"> &#9919; Login</router-link>
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

h1{
  color: rgb(165, 243, 207);
}
</style>