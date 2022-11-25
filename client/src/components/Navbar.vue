<template>
  <div>
    <nav
      class="navbar navbar-dark"
      style="position: fixed; width: 100%;top: 0px; color:blue; background-color: #ffffff9c; z-index: 100;"
    >
      <form class="form-inline">
        <div class="add-triggerL">
          <img src="../assets/kanban2.png" class="logo-footer" style="height: 60px;" />
        </div>
        <div class="mr-5 ml-5 pressDown">Kanbanoogle || かんばんグーグル</div>
      </form>
      <form class="form-inline">
        <div class="mr-5 pressDownAbu" style="color: white;">User ⇶ {{who}}</div>
      </form>
      <form class="form-inline">
        <div class="btn btn-danger pressDownR" @click="logout">Exit</div>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      who: localStorage.email,
    };
  },
  methods: {
    navLogOut() {
      this.$emit("emitLogout");
    },
    logout() {
      Swal.fire({
            title: 'Are you sure?',
            text: "You might have to log in again to enter",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, i wanna leave!'
        })
        .then((result) => {
            if (result.value) {
              localStorage.clear();
              // var auth2 = gapi.auth2.getAuthInstance();
              // auth2.signOut().then(function () {
              // console.log('User signed out.');
              // });
              this.$emit("emitLogout");
              Swal.fire('See Ya!', 'app dismissed.', 'success')
            } else if (result.dismiss === Swal.DismissReason.cancel) { }
        }).catch( ()=> {console.log('Swal Failed.')})
    }
  }
};
</script>

<style>
.navbar {
  justify-content: center;
}

.add-triggerL{
  transition: 0.5s;
}
.add-triggerL:hover {
  transform: scale(1.2);
  cursor: pointer;
}
</style>