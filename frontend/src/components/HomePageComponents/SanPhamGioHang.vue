<template>
    <router-link class="linktoCTSP container-fuild" :to="{ name: 'CTSP', params: { id: sanpham.SP_Ma } }">
        <div class="sanpham text-dark border bg-light  w-100">
            <div class="hinhanh"><img style="border-radius:20px" :src="require(`@/images/${sanpham.SP_HinhAnh}`)"
                    class="img-fluid" alt=""> </div>
            <div class="" style="border-radius: 20px; ">
                <div class="row">
                    <div class="col-md-6">
                        <div class="col">
                            <strong class="font-weight-bold text-left">
                                <span class="textThuongHieu">{{ sanpham.TH_Ten }}</span>
                            </strong>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col pe-4">
                            <p class="text-right textGiaBan">
                                {{ formatMoney(sanpham.SP_GiaBanRa) }}đ
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="col d-flex flex-column position-static pb-2">
                            <span class="fw-bold fs-6 textTenSanPham">
                                {{ sanpham.SP_TenSanPham }}
                            </span>
                        </div>
                    </div>

                </div>
                <div class="row ps-4 pb-2">
                    <div class="col-8">
                        <div class="row">
                            <a class="btn btn-outline-success">Chi tiết</a>
                        </div>
                    </div>
                    <div class="col-4">
                        <a href="#" class="btn btn-outline-success"><i class="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>
 
<script>
export default {
    name: "SanPhamGioHang",
    props: ["sanpham"],

    methods: {
        formatMoney(data) {
            let val = (data / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
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