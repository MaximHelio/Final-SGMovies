<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/man.jpg" class="d-block w-100 image" alt="...">
          <div class="img-content">
            <h1>Hi, there</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br>
                Fugiat sunt in expedita unde beatae hic recusandae sequi fugit minima? <br>
                Tempore distinctio assumenda labore laudantium dignissimos ad facilis, ipsam repellat nostrum?</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/cafe.jpg" class="d-block w-100 image" alt="...">
          <div class="img-content">
            <h1>Hi, there</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br>
                Fugiat sunt in expedita unde beatae hic recusandae sequi fugit minima? <br>
                Tempore distinctio assumenda labore laudantium dignissimos ad facilis, ipsam repellat nostrum?</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/rome.jpg" class="d-block w-100 image" alt="...">
          <div class="img-content">
            <h1>Hi, there</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br>
                Fugiat sunt in expedita unde beatae hic recusandae sequi fugit minima? <br>
                Tempore distinctio assumenda labore laudantium dignissimos ad facilis, ipsam repellat nostrum?</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCarousel',
}

</script>

<style>
  .image {
    width: 100% !important;
    height: 700px !important;
    display: flex !important;
    position: relative;
    opacity: 0.6;
    
  }
  
  .img-content {
    color: white;
    position: absolute;
    top: 68%;
    left: 10%;
    text-align: left;
    text-shadow: 2px 4px 1px rgba(0,0,0,1);
  }
</style>