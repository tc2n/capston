<template>
  <div class="content">
    <div class="content__real">
      <h1>Login</h1>
      <div class="errorbox" v-bind:class="{ errorshow1: some_error_occured }">
        Some error occurred
      </div>
      <div class="errorbox" v-bind:class="{ errorshow4: user_not_found }">
        User doesn't exist, Please <router-link to="/"> Signup</router-link> first
      </div>
      <div class="errorbox" v-bind:class="{ errorshow: enter_all_fields }">
        Please enter all fields
      </div>
      <div class="errorbox" v-bind:class="{ errorshow2: enter_email }">
        Please enter valid email
      </div>
      <div class="errorbox" v-bind:class="{ errorshow3: invalidotp }">
        Please enter valid OTP
      </div>
      <div class="successbox" v-bind:class="{ successshow: otpsent }">
        OTP sent successfully
      </div>
      <form class="form" id="login" ref="form">
        <input type="email" placeholder="Email" class="form__text" name="email" v-model="email" required />
        <input type="number" placeholder="OTP" class="form__text" name="otp" v-model="otp" required />
        <div class="action" @click="getOTP">Get OTP</div>
        <input type="submit" value="Login" class="button button--filled" @click="handleSubmit" />
      </form>
      <router-link to="/login" class="action"> &#9919; Login with password</router-link>
      <router-link to="/" class="action"> &#8606; Back </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginOTP",
  data() {
    return {
      some_error_occured: false,
      enter_all_fields: false,
      user_not_found: false,
      otpsent: false,
      invalidotp: false,
      enter_email: false,
      email: "",
      otp: "",
    };
  },
  methods: {
    getOTP() {
      if (this.email == null || this.email=="") {
        console.log("enter email first");
        this.enter_email = true;
      } else {
        axios.get(`http://127.0.0.1:8090/auth/login/otp/generate?email=${this.email}`).then(res => {
          if(res.status==200){
            console.log("OTP generated "+res.data);
            this.otpsent = true;
            this.enter_email=false
            this.user_not_found=false
          }
        }).catch(err => {
          console.log(`couldn't send otp because of ${err}`)
          this.success1show=false
          this.enter_email=false
          this.user_not_found=true
        })
      }
    },

    handleSubmit() {
      let buttonLogin = document.querySelector(".button");
      if (this.email == null || this.otp == null) {
        console.log("enter all the fields");
        this.enter_all_fields = true;
      } else {
        const data = {'email': this.email, 'method': 'USER_OTP', 'otp': this.otp.toString()}
        this.enter_all_fields=false;
        buttonLogin.classList.toggle("button--loading");
        axios
          .post(`http://localhost:8090/auth/login/otp/verify`, data)
          .then((res) => {
            buttonLogin.classList.toggle("button--loading");
            if (res.status == 200 ) {
              this.invalidotp=false
              this.some_error_occured=false
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
            }
          })
          .catch((err) => {
            console.log(`Error during login: ${err}`);
            buttonLogin.classList.toggle("button--loading");
            // console.log(JSON.stringify(err))
            console.log(`error status ${err.response.status} and isdouble iqual ${err.response.status==401}`)
            if(err.response.status===401){
              this.some_error_occured=false
              this.invalidotp=true 
            } else {
              this.invalidotp=false
              this.some_error_occured=true
            }
            localStorage.clear();
          });
      }
    },
  },
  mounted() {
    document.querySelector(".form").addEventListener("click", function (event) {
      event.preventDefault();
    });
  },
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

.successbox {
  border: rgb(0, 184, 0) solid 1px;
  color: rgb(0, 184, 0);
  background: rgba(0, 255, 0, 0.2);
  border-radius: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
  padding: 1rem;
  display: none;
}

.errorshow,
.successshow,
.errorshow1,
.errorshow2,
.errorshow3,
.errorshow4 {
  display: block !important;
}
</style>