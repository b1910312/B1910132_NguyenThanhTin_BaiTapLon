<template>
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <div class="container homepage" data-spy="scroll" data-target=".header" data-offset="60">
            <div class="container header">
                <header class="align-items-center">
                    <nav class="navbar navbar-expand-sm navbar-light bg-warning">
                        <div class="container text-white">
                            <div class="col-3 ">
                                <a class="navbar-brand col" style="font-size: 40px;" href="/">KING FOODS</a>
                                <button class="navbar-toggler d-lg-none col t" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>

                            <!-- <div class="col-5 row">
                                   <div class="collapse navbar-collapse col" id="collapsibleNavId">
                                        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                                             <li class="nav-item">
                                                  <a class="nav-link active" href="/" aria-current="page"
                                                       style="font-size: 25px;">Trang chủ <span
                                                            class="visually-hidden">(current)</span></a>
                                             </li>

                                             <li class="nav-item dropdown">
                                                  <a class="nav-link dropdown-toggle" href="#" id="navbardrop"
                                                       data-toggle="dropdown" style="font-size: 25px;">
                                                       Thương hiệu
                                                  </a>
                                                  <div class="dropdown-menu" aria-labelledby="dropdownId">
                                                       <a class="dropdown-item" href="#" v-for="(item, i) in thuonghieu"
                                                            :key="i" @click="timSPTheoThuongHieu(item)">{{
                                                                 item.TH_Ten
                                                            }}</a>
                                                  </div>
                                             </li>
                                        </ul>
                                   </div>
                              </div> -->
                            <div class="row col-5">
                                <form class="d-flex my-2 my-lg-0">
                                    <input class="form-control me-sm-2" type="text" placeholder="Tìm kiếm"
                                        v-model="nameToSearch" @keyup.enter="searchName" style="font-size: 18px;">
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="button"
                                        @click="searchName"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                            <div class="row col-4">


                                <div class="row" v-if="currentUser">
                                    <div class="row col-12"><p class="tenTaiKhoan col" style="font-size: 25px;">{{ currentUser.KH_Ten }}</p></div>
                                    <router-link :to="{ name: 'GioHang' }" class="btn btn-login col ">
                                        <div class="row" style="font-size: 30px;">
                                            <i class="fa fa-shopping-cart col mx-0 ">{{ giohang.GH_TongSoLuong }}
                                            </i>
                                        </div>
                                    </router-link>
                                    <a href="" class="btn btn-login col" @click="logout()"><i class="fa fa-sign-in-alt"
                                            style="font-size: 30px;"></i></a>
                                </div>
                                <div class="row" v-if="!currentUser">
                                    <a href="#" class="btn btn-login col btn-outline-dark mx-3" @click="goToQLDangNhap">Đăng
                                        nhập</a>
                                    <a href="#" class="btn btn-login col btn-outline-dark mx-3" @click="goToDangKy">Đăng
                                        ký</a>
                                    <router-link :to="{ name: 'KHDangNhap' }" class="btn btn-login col"
                                        style="font-size: 30px;">
                                        <i class="fa fa-shopping-cart ">{{ giohang.GH_TongSoLuong }}
                                        </i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
            <!-- <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /> -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <!-- <nav class="navbar navbar-expand-md navbar-light bg-white navbarrow">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                    aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                THƯƠNG HIỆU
                            </a>
                            <ul>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" v-for="(item, i) in thuonghieu" :key="i"
                                        @click="timSPTheoThuongHieu(item)">{{
                                            item.TH_Ten
                                        }}</a>
                                </div>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"/BÁN CHẠY</a>
                        </li>
                        <ul class="navbar-nav" v-for="(danhmucs, i) in danhmuc" :key="i">
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="timSPTheoDanhMuc(danhmucs)">{{ danhmucs.DM_Ten }}</a>
                            </li>
                        </ul>
                        <li class="nav-item" style="text-align: right;">
                            <a class="nav-link" href="#" style="text-align: right;">ƯU ĐÃI</a>
                        </li>
                    </ul>
                </div>
            </nav> -->
            <br>
            <Carousel />
            <!-- <router-link :to="{ name: 'DonHang' }"
                class="btn btn-sm btn-outline-secondary mx-1">
                Đơn hàng
            </router-link> -->
            <div class="row bg bg-warning mt-4">
                <h3 class="text-center bg bg-warnig text-white">DANH SÁCH SẢN PHẨM</h3>
            </div>
            <div class="row" style="height: 550px; overflow-y: auto; overflow-x: hidden;">
                <SanPhamDS :sanphams="this.sanpham" />
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import SanPhamDS from "../components/HomePageComponents/SanPhamDS.vue";
import Footer from "../components/HomePageComponents/Footer.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
import SanPhamService from "../services/sanpham.service";
import GioHangService from "../services/giohang.service";
import CTGHService from '../services/chitietgiohang.service';
import { mapGetters, mapMutations } from "vuex";
import Carousel from "../components/HomePageComponents/Carousel.vue";
export default {
    name: `homepage`,
    components: {
        Carousel,
        SanPhamDS,
        Footer,
    },
    data() {
        return {
            danhmuc: [],
            thuonghieu: [],
            sanpham: [],
            giohang: {},
            chitietgiohang: [],
            nameToSearch: "",
            dssanpham: [],
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },

    mounted() {
        this.initCustomerState();
        this.retrieveDanhMuc();
        this.retrieveThuongHieu();
        this.retrieveSanPhams();
        this.retrieveGioHang();
        this.retrieveCTGH();
    },
    methods: {
        ...mapMutations([
            "initCustomerState"
        ]),

        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },

        async goToQLDangNhap() {
            this.$router.push("/DangNhap");
        },

        async goToDangKy() {
            this.$router.push("/DangKy");
        },

        async retrieveDanhMuc() {
            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                // console.log(response.data);
            }

        },
        async retrieveThuongHieu() {
            const [error, response] = await this.handle(
                ThuongHieuService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.thuonghieu = response.data;
                // console.log(response.data);
            }
        },
        async searchName() {
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                SanPhamService.findByName(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data != null) {
                    this.sanpham = response.data
                    // console.log(this.sanpham)
                }
            }
        },
        async retrieveSanPhams() {
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                let i = 0;
                this.sanpham.forEach(element => {
                    this.findThuongHieu(element, i);
                    i++;
                });
                // console.log(this.sanpham,'reteterterterterter')
                this.dssanpham = this.sanpham.slice();
            }
        },


        async findThuongHieu(sp, i) {
            this.thuonghieu.forEach(element => {
                if (element.TH_Ma == sp.TH_Ma) {
                    this.sanpham[i].TH_Ten = element.TH_Ten;
                }
            });
        },
        async retrieveCTGH() {
            console.log("sq")
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietgiohang = response.data;
                this.chitietgiohang.forEach(element => {
                    this.findSanPham(element);
                });
            }
        },

        async findSanPham(ctgh) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(ctgh.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                ctgh.SP_TenSanPham = response.data.SP_TenSanPham;
                ctgh.SP_GiaBanRa = response.data.SP_GiaBanRa;
                ctgh.SP_HinhAnh = require(`@/images/` + response.data.SP_HinhAnh);
            }
        },

        async retrieveGioHang() {
            const [error, response] = await this.handle(
                GioHangService.getByID(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.giohang = response.data;
                // console.log(response.data);
            }
        },

        async timSPTheoThuongHieu(data) {
            let sanphamcoppy = this.dssanpham;
            this.sanpham.splice(0, this.sanpham.length);
            sanphamcoppy.forEach(element => {
                if (element.TH_Ma == data.TH_Ma) {
                    this.sanpham.push(element);
                }
            });
        },

        async timSPTheoDanhMuc(data) {
            console.log(data)
            let sanphamcoppy = this.dssanpham;
            this.sanpham.splice(0, this.sanpham.length);
            sanphamcoppy.forEach(element => {
                if (element.DMSP_Ma == data.DM_Ma) {
                    this.sanpham.push(element);
                }
            });
        }
    },


};
</script>

<style>
@import '../assets/homepageStyle.css'</style>