<template>
  <div class="content">
    <div class="content_real">
      <div class="id-card-tag"></div>
      <div class="id-card-tag-strip"></div>
      <div class="id-card-hook"></div>
      <div class="id-card-holder">
        <div class="id-card">
          <div class="header">
            <img src="~@/assets/header.jpg" />
          </div>
          <h1 class="name">{{name}}</h1>
          <div class="email">
            {{this.email}}<br />
            {{this.phone}}
          </div>
          <div class="wibmo">
            <img src="~@/assets/wibmo_full_cr.png" alt="logo" />
          </div>
        </div>
      </div>
      <div class="action" @click="logout">Logout</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "User",

  data(){
      return {
        name: null,
        email: null,
        phone: null
      }
  },

  mounted() {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("authenticated", false);
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email")
      this.phone = localStorage.getItem("id")
      console.log('items successfully set to data on mount')
    }
  },

  methods: {
    logout() {
        console.log('logout called')
      localStorage.clear();
      this.$router.replace("/");
    },
  },

  created() {
    if (
      localStorage.getItem("email") == null ||
      localStorage.getItem("authenticated") == false
    ) {
        console.log('authenticated is false, will try again with the saved token')
      this.$router.replace("/login");
    }
    console.log('user is authorised')
  },
};
</script>

<style scoped>
.id-card-holder {
  width: 225px;
  padding: 4px;
  margin: 0 auto;
  background-color: #1f1f1f;
  border-radius: 5px;
  position: relative;
}
.id-card-holder:after {
  content: "";
  width: 7px;
  display: block;
  background-color: #0a0a0a;
  height: 100px;
  position: absolute;
  top: 105px;
  border-radius: 0 5px 5px 0;
}
.id-card-holder:before {
  content: "";
  width: 7px;
  display: block;
  background-color: #0a0a0a;
  height: 100px;
  position: absolute;
  top: 105px;
  left: 222px;
  border-radius: 5px 0 0 5px;
}
.id-card {
  background-color: #fff;
  /* padding: 10px; */
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 0 1.5px 0px #b9b9b9;
  height: 25rem;
}
.id-card img {
  margin: 0 auto;
}
.header img {
  width: 100%;
  height: 10rem;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
}

.name {
  margin-top: 1.5rem;
  color: #222;
  font-size: 1.8rem;
  text-align: center;
}

.email {
  margin-top: 1rem;
  color: #444;
  font-size: 1.2rem;
}

.wibmo img {
  height: 4rem;
  margin-top: 2.5rem;
}

.id-card-hook {
  background-color: #000;
  width: 70px;
  margin: 0 auto;
  height: 15px;
  border-radius: 5px 5px 0 0;
}
.id-card-hook:after {
  content: "";
  background-color: #d7d6d3;
  width: 47px;
  height: 6px;
  display: block;
  margin: 0px auto;
  position: relative;
  top: 6px;
  border-radius: 4px;
}
.id-card-tag-strip {
  width: 45px;
  height: 40px;
  background-color: #0950ef;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  top: 9px;
  z-index: 1;
  border: 1px solid #0041ad;
}
.id-card-tag-strip:after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #c1c1c1;
  position: relative;
  top: 10px;
}
.id-card-tag {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-top: 100px solid #0958db;
  margin: -10px auto -30px auto;
}
</style>