<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class="carouseComponent container-fuild">
        <div class="row container-fuild row1 bg bg-warning">
            <div id="demo" class="carouselQC col-sm-12 col-md-12 carousel slide " data-ride="carousel" data-interval="2000">
                <!-- Indicators -->
                <ol class="carousel-indicators mb-0">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ol>

                <!-- The slideshow -->
                <div class="carousel-inner row" role="listbox">
                    <div class="carousel-item active col-md-12">
                        <img src="../../images/sale2.jpg" alt="Chicago" class="img-fluid anh">
                    </div>
                    <div class="carousel-item col-md-12">
                        <img src="../../images/sale.jpg" alt="New York" class="img-fluid anh">
                    </div>
                    <div class="carousel-item col-md-12">
                        <img src="../../images/saleImage.jpg" alt="Chicago" class="img-fluid anh">
                    </div>
                </div>
                <a class="carousel-control-prev text-warning" href="#demo" data-slide="prev">
                    <span class="fas fa-angle-left"></span>
                </a>
                <a class="carousel-control-next text-warning" href="#demo" data-slide="next">
                    <span class="fas fa-angle-right"></span>
                </a>

            </div>
            
        </div>

    </div>
    </div>
    
</template>

<script>
export default {
    name: `Carousel`,
    props: ["khuyenmai"],
    components: {
    },
};
</script>

<style>
.carouseComponent {
    text-align: center;
    display: block;
    height: 500px;
    border-radius: 6px;
    text-align: center;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 1.5%;
    margin-bottom: 1%;
}

.carouseComponent .row1 {
    border: 1px red;
    border-radius: 6px;
    height: 500px;
    padding-right: 0px;
}

.carouseComponent .row1 .anh {
    border-radius: 3px;
    width: 100%;
    height: 500px;
}

.carouseComponent .row1 .carouselQC {
    height: 500px;
    display: inline;
    padding: 4px;
    float: left;
}

.carouseComponent .row1 .carouselImage {
    display: inline;
    padding: 4px;
    height: 500px;
}

.fas {
    font-size: 50px;
}
</style>