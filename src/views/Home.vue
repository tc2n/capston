<template>
  <div class="content">
    <div class="content__real">
      <img
        src="@/assets/illustration.png"
        alt="home logo"
        class="illustration"
      />
      <div class="auth">
        <router-link :key="login" :to="{ name: 'Login' }">
          <input type="button" value="Login" class="button button--filled" />
        </router-link>
        <router-link :key="signup" :to="{ name: 'Signup' }">
          <input type="button" value="Signup" class="button button--filled" />
        </router-link>
      </div>
      <input
        type="button"
        value="Access as Guest"
        class="button button--empty"
        @click="guestPage()"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Home from "../views/Home.vue";
export default {
  name: "Home",
  methods: {
    guestPage() {
      this.$router.push("/about");
    },
  },
};
</script>
