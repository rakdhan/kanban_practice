<template>
  <div>
    
    <Navbar v-if="isLogin" @emitLogout="allLogout"></Navbar>

    <div class="container" style="margin:0 auto;">
      <Login @changeLogin="changeLogin" @aktifkan="aktifkan" v-if="openLogin"></Login>
      
      <button v-if="openRegisterBtn" @click="showRegister" class="btn btn-warning mb-2 pressDownAbu" style="color: white; width: 320px; margin-left:395px;">Go To Register</button>

      <Register v-if="openRegister" @emitShowLogin="showLogin" @changeLogin="changeLogin"></Register>

      <Caro v-if="isLogin"></Caro>

      <KanbanList v-if="isLogin"></KanbanList>

      <!-- KANBAN TASK -->
      <!-- <div class="max-w-sm w-full sm:max-w-full lg:flex">
        <div
          class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">
              <svg
                class="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                />
              </svg>
              Members only
            </p>
            <div
              class="text-gray-900 font-bold text-xl mb-2"
            >Can coffee make you a better developer?</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="https://images.unsplash.com/photo-1577202214328-c04b77cefb5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">Jonathan Reinink</p>
              <p class="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div> -->

    </div>

  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Caro from "./components/Carousel";
import KanbanList from "./components/KanbanList";

export default {
  components: {
    Navbar,
    Login,
    Register,
    Caro,
    KanbanList
  },
  created(){
    // this.getKanban()
    if (localStorage.access_token) {
      this.changeLogin();
    }
  },
  data() {
    return {
      openLogin: true,
      openRegisterBtn: true,
      openRegister: false,
      openKanban: false,
      updateKanban: false,
      currentEditTask: {},
      isLogin: false,
    };
  },
  methods: {
    showRegister() {
      this.openLogin = !this.openLogin;
      this.openRegisterBtn = !this.openRegisterBtn;
      this.openRegister = !this.openRegister;
    },
    showLogin() {
      this.openRegister = !this.openRegister;
      this.openRegisterBtn = !this.openRegisterBtn;
      this.openLogin = !this.openLogin;
    },
    changeLogin() {
      this.openRegister = false;
      this.openLogin = false;
      this.openKanban = true;
      this.openRegisterBtn = false;
      this.isLogin = true;
    },
    taskUpdated(){
      console.log('zzzz')
      this.updateKanban = false
      this.openKanban = true
    },
    allLogout(){
      this.isLogin = false
      this.openLogin = true
      this.openRegisterBtn = true
    },
    aktifkan() {
      this.isLogin = true;
      this.openRegister = false;
      this.openLogin = false;
      this.openKanban = true;
      this.openRegisterBtn = false;
    }
  }
};
</script>

<style scoped>
</style>