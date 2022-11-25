<template>
  <div class="mt-2 " style="width: 500px; height: auto; justify-content: center; margin: 0 auto; ">
        <b-carousel
          id="carousel-1"
          :interval="5000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 3px 3px 9px #333; "
        >
          <b-carousel-slide img-src="https://cdn6.aptoide.com/imgs/c/b/5/cb5e3daa42ba722026b643873727dfca_screen.png?h=500">
            <img src="../assets/caro4.svg" alt="" style="height:200px;margin:0 auto;">
          </b-carousel-slide>
          <b-carousel-slide img-src="https://cdn6.aptoide.com/imgs/c/b/5/cb5e3daa42ba722026b643873727dfca_screen.png?h=500">
            <img src="../assets/caro2.svg" alt="" style="height:200px;margin:0 auto;">
          </b-carousel-slide>
          <b-carousel-slide img-src="https://cdn6.aptoide.com/imgs/c/b/5/cb5e3daa42ba722026b643873727dfca_screen.png?h=500">
            <img src="../assets/caro3.svg" alt="" style="height:200px;margin:0 auto;">
          </b-carousel-slide>
          <b-carousel-slide img-src="https://cdn6.aptoide.com/imgs/c/b/5/cb5e3daa42ba722026b643873727dfca_screen.png?h=500">
            <img src="../assets/caro5.svg" alt="" style="height:200px;margin:0 auto;">
          </b-carousel-slide>
          <b-carousel-slide img-src="https://cdn6.aptoide.com/imgs/c/b/5/cb5e3daa42ba722026b643873727dfca_screen.png?h=500">
            <img src="../assets/caro6.svg" alt="" style="height:200px;margin:0 auto;">
          </b-carousel-slide>
        </b-carousel>
      </div>
</template>

<script>
export default {
    data() {
        return{
            
        }
    }
}
</script>

<style>

</style>