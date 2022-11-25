<template>
  <div>

    <div class="w-full max-w-xs mt-5" style="margin:0 auto;">

      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="loginRegister">
        <h2>Register Page</h2>
        <div class="mb-4" id="login">
          <label class="text-gray-700 mb-2" for="username">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            v-model="loginEmail"
            id="loginEmail"
            placeholder="enter email here"
          />
        </div>
        <div class="mb-6">
          <label class="text-gray-700 mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :type="showPassword?'text':'password'"
            v-model="loginPassword"
            id="loginPassword"
            placeholder="******************"
          />
        </div>
        <div class="form-group form-check">
            <input type="checkbox" v-model="showPassword" />
            <label class="form-check-label" for="exampleCheck1">Show Password</label>
        </div>
        <div class="flex items-center justify-between">
          <button class="btn btn-success mb-2 pressDownG" type="submit" >Sign Up</button>
        </div>
        <Googlebutton class="btn btn-danger mb-2 pressDownR" ></Googlebutton>
        
      </form>
      <p class="text-center text-gray-500 text-xs" style="color: grey;">We help your work simpler. Come on in!</p>
        <button @click.prevent="showLogin" class="w-full btn btn-warning mb-2 pressDownAbu" style="color: white;">Back to Login </button>
    </div>

  </div>
</template>


<script>
import axios from "axios";
import Googlebutton from "./Googlebutton.vue";
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  name: "Register",
  components: {
    Googlebutton,
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      showPassword: false
    };
  },
  methods: {
    showLogin() {
      this.$emit("emitShowLogin");
    },
    loginRegister() {
      axios
        .post(`${url}/register`, {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          axios
            .post(`${url}/login`, {
              email: this.loginEmail,
              password: this.loginPassword
            })
            .then(response => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem("email", response.data.email);
              this.$emit("changeLogin", { value: true });
            })
            .catch(err => {
              console.log("Unable login after register:", err.response.data);
            });
          // localStorage.setItem("access_token",response.data.access_token)
          // this.$emit("changeLogin",{value:true})
        })
        .catch(err => {
          console.log("Unable Register Server", err);
        });
    }
  }
};
</script>