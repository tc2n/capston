<template>
  <div class="content">
    <div class="content__real">
      <h1>Signup</h1>
      <div class="errorbox" v-bind:class="{ errorshow: error2show }">
        Please enter all fields
      </div>
      <div class="errorbox" v-bind:class="{ errorshow1: error1show }">
        Something went wrong
      </div>
      <form class="form" @submit.prevent="signup" ref="signupform">
        <input type="text" placeholder="username" class="form__text" name="username" required />
        <input type="text" placeholder="Full Name" class="form__text" name="name" required />
        <input type="tel" placeholder="phone" class="form__text" name="phone" required />
        <input type="email" placeholder="Email" class="form__text" name="email" required />
        <input type="password" placeholder="Password" class="form__text" name="password" required />
        <input type="submit" value="Signup" class="button button--filled" />
      </form>
      <router-link to="/" class="action"> &#8606; Back</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import serialize from "form-serialize";
export default {
  name: "Signup",
  data() {
    return {
      error2show: false,
      error1show: false
    }
  },
  methods: {
    signup() {
      console.log('signup clicked')
      let data = serialize(this.$refs.signupform, { hash: true });
      let buttonLogin = document.querySelector(".button");
      console.log(JSON.stringify(data))
      console.log(Object.keys(data).length)
      if (Object.keys(data).length !== 5) {
        console.log("enter all the fields");
        this.error2show = true;
      } else {
        this.error2show = false;
        // console.log(JSON.stringify(data))
        buttonLogin.classList.toggle("button--loading");
        axios.post(`http://127.0.0.1:8090/auth/signup`, data).then((res) => {
          buttonLogin.classList.toggle("button--loading");
          if (res.status == 200) {
            console.log("signup successful");
            this.$router.replace("/signupsuccessful");
          } else if (res.status == 500 || res.status == 401) {
            console.log("error signingup");
            this.error1show = true;
          }
        }).catch((e) => {
          console.log(`couldn't signup because ${e}`);
          console.log("error signingup");
            this.error1show = true;
        });
      }

    }
  }
};
</script>

<style>
.errorbox {
  border: rgb(224, 3, 3) solid 1px;
  color: rgb(224, 3, 3);
  background: rgba(255, 0, 0, 0.2);
  border-radius: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
  padding: 1rem;
  display: none;
}

.errorshow {
  display: block;
}

.errorshow1 {
  display: block;
}
</style>