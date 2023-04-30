<template>
    <div>
        <router-link class="linktoCTSP container-fuild" :to="{ name: 'CTSP', params: { id: this.sanpham.SP_Ma } }">
            <div class="sanpham text-dark border border-warning bg-light ">
                <div class="hinhanh" style="height: 200px; ">
                    <img style="height: 100%; width:100%; border-radius:20px;" :src="require(`@/images/${this.sanpham.SP_HinhAnh}`)"
                        class="img-fluid" alt="">
                </div>
                <div class="border border-warning" style="border-radius: 20px; ">


                    <div class="row">
                        <div class="col text-center d-flex flex-column position-static ">
                            <p class="" style="font-size: 20px">
                                {{ this.sanpham.SP_TenSanPham }}
                            </p>
                        </div>
                        <div class="col-12">
                            <p class="text-center textGiaBan" style="font-size: 20px">
                                Giá: {{ this.sanpham.SP_GiaBanRa }}VNĐ
                            </p>
                        </div>

                    </div>
                    <div class=" container mb-3">
                        <div class="row">
                            <button type="button" class="btn btn-warning">Chi tiết</button>

                        </div>

                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
 
<script>
export default {
    name: "SanPham",
    props: ["sanpham"],

    methods: {
        formatMoney(data) {
            let val = (data / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    },
    mounted() {
        // console.log(this.sanpham,'kkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    }
};
</script>
 
<style>
#name {
    font-family: "Playfair Display";
    color: #756262;
}

.body-sp {
    background-color: #d0cfcf;
    padding: 1px;
}

.body-sp:hover {
    color: white;
    background-color: #515151;
    border-color: #515151;
}

.sanpham {
    padding: 2px 2px 3px;
    margin: 0 auto 2px;
    margin-top: 5%;
    margin-bottom: 20%;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: 100%;
}

.add-btn:hover {
    color: #515151;
    /* background-color: #515151; */
    border-color: #413e3e;
}

.linktoCTSP {
    text-decoration: none;
}

.linktoCTSP:hover {
    text-decoration: none;
}

.sanpham .textThuongHieu {
    font-family: Inter;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
}

.sanpham .textGiaBan {
    font-family: Inter;
    font-size: 15px;
}

.sanpham .textTenSanPham {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Inter;
    font-size: 18px;
}
</style>