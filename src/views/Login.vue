<template>
  <div class="content">
    <div class="content__real">
      <h1>Login</h1>
      <div class="errorbox" v-bind:class="{ errorshow1: error1show }">
        Wrong username or password
      </div>
      <div class="errorbox" v-bind:class="{ errorshow: error2show }">
        Please enter all fields
      </div>
      <form class="form" id="login" ref="form">
        <input
          type="email"
          placeholder="Email"
          class="form__text"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          class="form__text"
          name="password"
          required
        />
        <input
          type="submit"
          value="Login"
          class="button button--filled"
          @click="handleSubmit"
        />
      </form>
      <router-link to="/loginOTP" class="action"> &#9919; Login with otp</router-link>
      <router-link to="/" class="action"> &#8606; Back</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import serialize from "form-serialize";
export default {
  name: "Login",
  data() {
    return {
      error1show: false,
      error2show: false,
    };
  },
  methods: {
    handleSubmit() {
      let data = serialize(this.$refs.form, { hash: true });
      let buttonLogin = document.querySelector(".button");
      if (data.email == null || data.password == null) {
        console.log("enter all the fields");
        this.error2show = true;
      } else {
        this.error2show = false;
        data["method"]="USER_PASS"
        // console.log(JSON.stringify(data))
        buttonLogin.classList.toggle("button--loading");
        axios
          .post(`http://127.0.0.1:8090/auth/login/pass`, data)
          .then((res) => {
            buttonLogin.classList.toggle("button--loading");
            if (res.status == 200) {
              console.log("login successful");
              if (typeof Storage !== "undefined") {
                localStorage.setItem("email", String(data.email));
                console.log("setting email successful");
                localStorage.setItem("token", String(res.data.token));
                localStorage.setItem("name", String(res.data.name));
                localStorage.setItem("id", String(res.data.phone));
                console.log("setting token successful");
                localStorage.setItem("authenticated", true);
              }
              this.$router.replace("/user");
            } else if (res.status == 500 || res.status == 401) {
              console.log("wrong username password");
              this.error1show = true;
            }
          })
          .catch((err) => {
            console.log(`Error during login: ${err}`);
            buttonLogin.classList.toggle("button--loading");
            console.log("wrong username password");
              this.error1show = true;
            localStorage.clear();
          });
      }
    },
  },
  mounted() {
    document.querySelector(".form").addEventListener("click", function (event) {
      event.preventDefault();
    });

    //if token is valid user will be redirected to user page
    if (localStorage.getItem("token") !== null) {
      axios
        .get(`http://192.168.38.2:8090/user/testserver`, {
          headers: { "auth": localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.status == 202) {
            console.log("login successful");
            this.$router.replace("/user");
          } else if(res.status == 500){
            console.log("Invalid token")
          }
        })
        .catch((e) => {
          console.log(`couldn't login because ${e}`);
        });
    }
  },
};
</script>

<style scoped>
.errorbox {
  border: rgb(224, 3, 3) solid 1px;
  color: rgb(224, 3, 3);
  background: rgba(255, 0, 0, 0.2);
  border-radius: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
  padding: 1rem;
  display: none;
  visibility: hidden;
  opacity: 0;
}
.errorshow, .errorshow1 {
  display: block;
  visibility:visible;
	opacity:1;
  transition:3s;
  height: min-content;
}
</style>