<template>
  <button v-google-signin-button="clientId" class="btn btn-success " >
    Continue with Google
  </button>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";
// const url = 'http://localhost:4000'
const url = 'https://kanbanoogle.herokuapp.com'
export default {
  directives: {
    GoogleSignInButton,
  },
  data: () => ({
    clientId:
      "973708647973-3nbrjai53jtbh3r5hmrtr40djg7pttao.apps.googleusercontent.com",
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      return axios({
        method: "post",
        url: `${url}/google-signin`,
        data: {
          access_token: idToken,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("pict", data.pict);
          this.$parent.$parent.aktifkan();
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "failed Google Login",
          });
        });
    },
    OnGoogleAuthFail(error) {
      console.log('Google error info:', error);
    },
  },
};
</script>

<style scoped>
.google-signin-button {
  color: rgb(57, 130, 220);
  background-color: rgb(249, 238, 236);
  /* height: 50px; */
  /* font-size: 16px;
  border-radius: 10px;
  padding: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
</style>