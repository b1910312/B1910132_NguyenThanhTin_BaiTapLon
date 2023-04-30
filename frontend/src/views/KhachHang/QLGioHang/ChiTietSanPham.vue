<template>
     <div class="container chitietsanpham">
          <!---------------------------- Header--------------------------- -->
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
          <div class="card text-dark rounded bg-light p-3">
               <div class="card-header bg-warning text-white">
                    <h3 style="text-align:center;">THÔNG TIN SẢN PHẨM</h3>
               </div>
               <div class="row">
                    <div class="col-4 card border-warning p-3 mt-2 mx-auto">
                        
                              <img :src="sanpham.SP_HinhAnh" class="img-fluid" style="height:100%; width:auto;" alt="">
                     
                    </div>
                    <div class="col-7 border p-3 border border-warning mt-2 mx-auto" >
                         <h2 class="font-weight-bold text-center" style="font-size: 40px;"> {{ sanpham.SP_TenSanPham }}</h2>
                         <div class="table-responsive">
                              <table class="table table-borderless" style="font-size: x-large;">
                                   <thead>
                                        <tr>
                                             <th class="col-3">Thương hiệu: </th>
                                             <td class="col-9">{{ sanphamthem.TH_Ten }}</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr class="">
                                             <th scope="row">Xuất xứ:</th>
                                             <td> {{ sanphamthem.TH_XuatXu }}</td>
                                        </tr>
                                        <tr class="">
                                             <th scope="row">Mô tả:</th>
                                             <td>{{ sanphamthem.SP_ThongTin }}</td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
                         <h2 class="font-weight-bold" id="name" style="font-size: 40px;"> Giá: {{ formatMoney(sanpham.SP_GiaBanRa) }} VND</h2>
                      
                         <div class="col-md-12 p-4 md-3">
                              <div class="input-group mb-3">
                                   <button v-if="SoLuong > 1" class="btn btngiam" @click="giamSL()"><span
                                             class="fa fa-minus"></span></button>
                                   <button v-if="SoLuong == 1" class="btn btngiam"><span
                                             class="fa fa-minus"></span></button>
                                   <p class="text soluong">{{ SoLuong }}</p>
                                   <button class="btn btntang" @click="tangSL()"><span class="fa fa-plus"></span></button>

                                   <button v-if="currentUser" class="btn btn-primary btnThemvaoGioHang"
                                        @click="checkCTGH()" type="button">Thêm vào giỏ hàng</button>
                                   <button v-if="!currentUser" class="btn btn-primary btnThemvaoGioHang"
                                        @click="goToQLDangNhap()" type="button">Thêm vào giỏ hàng</button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <!-- <SanPhamCT :sanpham="sanpham" /> -->
         
          <Footer />
     </div>
</template>

<script>
import CTGHService from "../../../services/chitietgiohang.service";
// import SanPhamCT from '../../../components/HomePageComponents/SanPhamCT.vue';
import SanPhamService from '../../../services/sanpham.service';
import GioHangService from '../../../services/giohang.service';
import Footer from '../../../components/HomePageComponents/Footer.vue'
import ThuongHieuService from "../../../services/thuonghieu.service";
import { mapGetters, mapMutations } from "vuex";
export default {
     name: `ChiTietSanPham`,
     components: {  Footer },

     data() {
          return {
               sanpham: {},
               sanphams: [],
               nameToSearch: "",
               sanphamthem: {},
               chitietgiohang: [],
               chitietgiohangthem: {},
               SoLuong: 1,
               giohang: {},
               thuonghieu: [],
          }
     },

     computed: {
          ...mapGetters({
               currentUser: "loggedInKhachHang",
          }),
     },

     created() {
          this.sanpham.SP_Ma = this.$route.params.id;
          this.getSanPham();
     },

     methods: {

          ...mapMutations([
               "initCustomerState"
          ]),
          async retrieveSanPhams() {
               this.sanphams = this.sanphams.slice()
               const [error, response] = await this.handle(
                    SanPhamService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    let i = 0;
                    const temp = response.data;
                    temp.forEach(element => {
                         if (i <= 11) {
                              this.sanphams.push(element);
                              this.findThuongHieus(element, i)
                              i++;
                         }
                    });
                    console.log(response.data);
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
                    console.log(this.thuonghieu)
               }
          },

          async findThuongHieus(sp, i) {
               this.thuonghieu.forEach(element => {
                    if (element.TH_Ma == sp.TH_Ma) {
                         this.sanphams[i].TH_Ten = element.TH_Ten;
                    }
               });
          },

          async getSanPham() {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(this.sanpham.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_HinhAnh = require(`@/images/` + this.sanpham.SP_HinhAnh)
                    this.sanphamthem = response.data;
                    console.log(response.data);
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
                    console.log(this.giohang)
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
                         this.sanpham = response.data;
                         let i = 0;
                         this.sanpham.forEach(element => {
                              this.findThuongHieus(element, i)
                              i++;
                         });

                    }
               }
          },
          async logout() {
               this.$store.commit("logout");
               this.$router.push("/");
          },

          async goToDangKy() {
               this.$router.push("/DangKy");
          },

          async goToQLDangNhap() {
               this.$router.push("/DangNhap");
          },
          async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
          },
          //    Dinh dang hien thi tien 
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

          async retrieveSanPham() {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(this.sanpham.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanphamthem = response.data;
                    this.findThuongHieu()
                    console.log(response.data);
               }
          },

          async findThuongHieu() {
               this.thuonghieu.forEach(element => {
                    if (element.TH_Ma == this.sanphamthem.TH_Ma) {
                         this.sanphamthem.TH_Ten = element.TH_Ten;
                         this.sanphamthem.TH_XuatXu = element.TH_XuatXu;
                    }
               });


          },

          async checkCTGH() {
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    let check = 0;
                    this.chitietgiohang = response.data;
                    this.chitietgiohang.forEach(element => {
                         if (element.SP_Ma == this.sanphamthem.SP_Ma) {
                              check = 1;
                         }
                    });
                    if (check == 0) {
                         this.themCTGH();
                    }
               }
          },

          async tangSL() {
               console.log(this.sanphamthem.SP_SoLuong)
               if (this.sanphamthem.SP_SoLuong > 0) {
                    this.SoLuong += 1;
               }
          },

          async giamSL() {
               this.SoLuong -= 1;
          },

          async retrieveCTGH() {
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietgiohang = response.data;
                    console.log(this.chitietgiohang)
               }
          },
          async themCTGH() {
               this.chitietgiohangthem.GH_Ma = this.currentUser.GH_Ma;
               this.chitietgiohangthem.SP_Ma = this.sanphamthem.SP_Ma;
               this.chitietgiohangthem.CTGH_SoLuong = this.SoLuong;
               const [error, response] = await this.handle(
                    CTGHService.create(this.chitietgiohangthem)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH()
                    this.updateGioHang();
                    this.$router.push("/");
               }
          },

          async updateGioHang() {
               this.giohang.GH_TongSoLuong = this.giohang.GH_TongSoLuong + this.SoLuong;
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohang)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          async lamMoi() {
               this.sanpham.SP_Ma = this.$route.params.id;
               this.initCustomerState();
               this.retrieveGioHang();
               this.retrieveThuongHieu();
               this.getSanPham();
               this.retrieveSanPham();
          }
     },
     mounted() {
          this.initCustomerState();
          this.retrieveThuongHieu();
          this.retrieveGioHang();
          this.getSanPham();
          this.retrieveSanPhams();
          this.retrieveSanPham();

     }
}
</script>

<style>
@import '../../../assets/chitietsanphamStyle.css';
</style>