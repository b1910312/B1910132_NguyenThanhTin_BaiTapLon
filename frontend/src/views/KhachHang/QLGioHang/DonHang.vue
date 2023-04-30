<template>
     <div class="container-fuild dondathang">
          <div class="container-fuild header">
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
                                        <a href="#" class="btn btn-login col btn-outline-dark mx-3"
                                             @click="goToQLDangNhap">Đăng nhập</a>
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

          <!------------------------------------------- Header --------------------------------->
          <div class="row title">
               <h4 class="col-md-12" style="margin-top: 160px; overflow: hidden;">ĐƠN HÀNG CỦA BẠN</h4>
          </div>
          <div class="dsDonDatHang" v-if="!isOpenCTDH">
               <div class="row titleRow" style="width:100%">
                    <div class="col-md-3 title">Mã đơn hàng</div>
                    <div class="col-md-2 title">Ngày đặt</div>
                    <div class="col-md-2 title">Số lượng</div>
                    <div class="col-md-3 title">Số tiền</div>
                    <div class="col-md-2 title">Trạng thái</div>
               </div>
               <div v-for="(donhang, i) in dsDonHang" :key="i" class="row thongtinDonHang"
                    @click="(setActiveDonHang(donhang), isOpenCTDH = !isOpenCTDH)">
                    <div class="col-md-3 column">
                         <p class="text"> {{ donhang.id }} </p>
                    </div>
                    <div class="col-md-2 column">
                         <p class="text"> {{ donhang.DH_Ngay }}</p>
                    </div>
                    <div class="col-md-2 column">
                         <p class="text"> {{ donhang.DH_TongSoLuong }}</p>
                    </div>
                    <div class="col-md-3 column">
                         <p class="text"> {{ formatMoney(donhang.DH_TongTien) }}đ </p>
                    </div>
                    <div class="col-md-2 column">
                         <button class="btn btnTrangThai">{{ donhang.DH_TrangThai }}</button>

                    </div>
               </div>
          </div>
          <CTDH v-if="isOpenCTDH" :chitietdonhang="chitietdonhang" :activeDonHang="donhangActive" :khachhang="currentUser"
               :nhanvien="nhanvien" />
          <div class=" row" v-if="isOpenCTDH">
               <div class="col-md-12">
                    <button class="btn btnTroVe" @click="isOpenCTDH = !isOpenCTDH">
                         Trở về
                    </button>
               </div>
          </div>
          <Footer />
     </div>
</template>

<script>
import DonHangService from '../../../services/donhang.service';
import SanPhamService from '../../../services/sanpham.service';
import CTDHService from '../../../services/chitietdonhang.service';
import NhanVienService from '../../../services/nhanvien.service';
import moment from 'moment';
import GioHangService from "../../../services/giohang.service";
import { mapGetters, mapMutations } from "vuex";
import Footer from '../../../components/HomePageComponents/Footer.vue';
import CTDH from '../../../components/HomePageComponents/ChiTietDonHang.vue';
export default {
     name: `DonHang`,
     components: { Footer, CTDH },
     data() {
          return {
               dsDonHang: [],
               tongsoluongSP: 0,
               giohang: {},
               nameToSearch: "",
               isOpenCTDH: false,
               nhanvien: {},
               donhangActive: {},
               chitietdonhang: [],
          }
     },
     computed: {
          ...mapGetters({
               currentUser: "loggedInKhachHang",
          }),
     },
     methods: {
          ...mapMutations([
               "initCustomerState"
          ]),

          async logout() {
               this.$store.commit("logout");

          },

          async goToDangKy() {
               this.$router.push("/DangKy");
          },

          async goToQLDangNhap() {
               this.$router.push("/DangNhap");
          },
          async goToGioHang() {
               this.$router.push("/Giohang");
          },
          async goToDonHang() {
               this.$router.push("/DonHang");
          },
          async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
          },
          async retrieveGioHang() {
               const [error, response] = await this.handle(
                    GioHangService.getByID(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.giohang = response.data;
                    console.log(this.giohang)
               }
          },
          async retrieveDonHang() {
               this.donhangActive.NV_Ma = "";
               this.donhangActive.HD_SoHD = "";
               let DH_TrangThai = this.currentUser.KH_Ma;
               console.log(this.currentUser)
               const [error, response] = await this.handle(
                    DonHangService.findByStatus(DH_TrangThai)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.dsDonHang = response.data;
                    if (this.dsDonHang.length > 0) {
                         this.dsDonHang.forEach(element => {
                              element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                         });
                    }
               }
          },
          async retrieveChiTietDonHang() {
               const [error, response] = await this.handle(
                    CTDHService.findByMaDH(this.donhangActive.id)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietdonhang = response.data;
                    let i = 0;
                    this.chitietdonhang.forEach(element => {
                         this.findSanPham(element, i);
                         i++;
                    });

                    console.log(this.chitietdonhang)
               }
          },
          async findSanPham(ctdh, index) {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctdh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietdonhang[index].SP_TenSanPham = response.data.SP_TenSanPham
               }
          },
          // Tim nhan vien lap don hang
          async findNVByMaNV(MaNV) {
               const [error, response] = await this.handle(
                    NhanVienService.getByID(MaNV)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.nhanvienXNDH = response.data;
               }
          },
          async setActiveDonHang(DHActive) {
               this.donhangActive = DHActive;
               this.retrieveChiTietDonHang(this.donhangActive.id);
               if (this.donhangActive.NV_Ma != "") {
                    this.findNVByMaNV(this.donhangActive.NV_Ma);
               }
               else {
                    this.nhanvien.NV_Ma = "";
                    this.nhanvien.NV_Ten = "";
                    this.nhanvien.NV_Ho = "";
               }

          },

          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

     },

     mounted() {
          this.initCustomerState();
          this.retrieveDonHang();
          this.retrieveGioHang();
     }
}
</script>

<style>
@import '../../../assets/QLDonDatHangStyle.css'
</style>