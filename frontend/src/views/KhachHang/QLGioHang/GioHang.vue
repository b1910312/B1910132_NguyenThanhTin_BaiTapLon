<template>
     <div class="container homepage" data-spy="scroll" data-target=".header" data-offset="100">
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

          <!------------------------------------------- Header --------------------------------->
          <!-- <div class="row" style="float:right">
               <div class="col-md-12" style="margin-top: 150px; overflow: hidden;">
                    <button class="btnDonHang" @click="goToDonHang()">
                         Đơn Hàng
                    </button>
               </div>
          </div> -->

          <div class="giohangtrong row" v-if="SLSPTrongGioHang">
               <div class="col-md-12 text-center mb-5 mt-5">
                    <p class="textGioHangTrong" style="font-size: 40px; color: rgba(0, 0, 0, 0.2);">Giỏ hàng của bạn còn
                         trống</p>

               </div>
          </div>
          <div class="mb-5">
               <div class="giohang row pt-5p" v-if="(!isOpenDatHang && !SLSPTrongGioHang)">

                    <div class="row mt-3 bg bg-warning w-50 mx-auto mb-3" style="border-radius: 30px;">
                         <h3 style="text-align:center; margin-top: 3%; margin-bottom: 1%; " class="text-white">THÔNG TIN GIỎ
                              HÀNG</h3>
                    </div>
                    <div class="row thongTinDatHang m-4     ">
                         <div class="col-md-2 column">
                              <input class="form-check-input chonTatCa" style="position: relative;" type="checkbox" value=""
                                   id="flexCheckDefault2" @click="chonTatCa = !chonTatCa, chonTatcaSP(), tinhThanhTien()" />
                              <label class="lableTatCa">Chọn tất cả</label>
                         </div>

                         <div class="col-md-3 column">
                              <h4 class="text-center">Tổng sản phẩm:
                                   {{ sanphamChon.length }} </h4>
                         </div>
                         <div class="col-md-5 column">
                              <h4 class="text-center">Tổng tiền:
                                   {{ formatMoney(thanhTien) }}VNĐ</h4>
                         </div>

                         <div class="col-md-2 column">
                              <button class="btn btn-warning text-white" style="font-size:20px"
                                   @click="isOpenDatHang = !isOpenDatHang">Đặt hàng</button>
                         </div>
                    </div>

                    <div style="height: 600px; overflow-y: auto; overflow-x: hidden;" class="card p-3 border-warning">
                         <div class="card px-3 pt-2 mb-3 border border-warning" style="border-radius: 30px;"
                              v-for="(ctgh, i) in chitietgiohang" :key="i">
                              <div class="row">
                                   <div class="col-1"> <input class="form-check-input checkbox" type="checkbox" value=""
                                             id="flexCheckDefault"
                                             @click="chonTatCa = false, chonSP(ctgh), checkSLSPdaChon(), tinhThanhTien()" />
                                   </div>

                                   <div class="col-2"><img :src="ctgh.SP_HinhAnh" class="img-fluid w-50" alt=""></div>
                                   <div class="col-4">
                                        <h4 class="tenSP mt-4">{{ ctgh.SP_TenSanPham }}</h4>
                                   </div>

                                   <div class="col-3 mt-4">
                                        <h4>Giá: {{ formatMoney(ctgh.SP_GiaBanRa) }}VND</h4>
                                   </div>
                                   <div class="col-2">
                                        <button v-if="ctgh.CTGH_SoLuong > 1" class="btn btngiam" @click="giamSL(ctgh)"><span
                                                  class="fa fa-minus"></span></button>
                                        <button v-else class="btn btngiam"><span class="fa fa-minus"></span></button>
                                        <p class="text soluong">{{ ctgh.CTGH_SoLuong }}</p>
                                        <button class="btn btntang" @click="tangSL(ctgh)"><span
                                                  class="fa fa-plus"></span></button>
                                   </div>
                              </div>

                         </div>
                    </div>


               </div>

               <div class="dathang container m-5 ">
                    <div v-if="isOpenDatHang" class="card p-3 border border-warning">
                         <h3 class="bg bg-warning text-white" style="text-align:center">ĐƠN HÀNG</h3>
                         <div class="card p-3 border border-warning">
                              <div class=" table-responsive">
                                   <div class="card-head text-center"><h3>Thông tin người nhận</h3></div>

                                   <table class="table table-borderless">
                                        <thead>
                                             <tr>
                                                  <th scope="col-3">Họ tên</th>
                                                  <td scope="col-9">{{ currentUser.KH_Ten }}</td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr class="">
                                                  <th class="col-3">Số điện thoại</th>
                                                  <td class="col-9">{{ currentUser.KH_SDT }}</td>
                                             </tr>
                                             <tr class="">
                                                  <th class="col-3">Địa chỉ nhận hàng</th>
                                                  <td class="col-9"><input type="text" name="diachi" id="diachi" class=" col-md-6" required
                                   v-model="dondathang.DH_DiaChiGiaoHang" placeholder="Nhập địa chỉ giao hàng...." style="border: 0px solid;"></td>
                                             </tr>
                                             <tr class="">
                                                  <th class="col-3">Ghi chú</th>
                                                  <td class="col-9"> <input type="text" name="ghichu" id="ghichu" class=" col-md-6" v-model="dondathang.DH_GhiChu"
                                   placeholder="Nhập ghi chú..." style="border: 0px solid"></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                              
                         </div>
                         <div class="row chitietDonHang card border border-warning p-3 ">
                              <div class="col-md-12">
                                   <h4 style="text-align:center">CHI TIẾT ĐƠN HÀNG</h4>
                              </div>
                              <div class="col-md-12 ">

                                   <div class="table-responsive">
                                        <table class="table ">
                                             <thead>
                                                  <tr>
                                                       <th scope="col">Sản phẩm</th>
                                                       <th scope="col">Đơn giá</th>
                                                       <th scope="col">Số lượng</th>
                                                       <th scope="col">Thành tiền</th>

                                                  </tr>
                                             </thead>
                                             <tbody v-for="(ctgh, i) in sanphamChon" :key="i">
                                                  <tr class="">
                                                       <td>{{ ctgh.SP_TenSanPham }}</td>
                                                       <td>{{ formatMoney(ctgh.SP_GiaBanRa) }} VNĐ</td>
                                                       <td>{{ ctgh.CTGH_SoLuong }}</td>
                                                       <td>{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }} VNĐ</td>
                                                  </tr>

                                             </tbody>
                                        </table>
                                   </div>

                              </div>

                              <!-- <div class="row rowDatHang ">
                                   <div class="col-md-4">
                                   </div>
                                   <div class="col-md-6 column">
                                        <p class="tongThanhToan">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                                             {{ formatMoney(thanhTien) }}đ</p>
                                   </div>

                                   <div class="col-md-2 column">
                                        <button class="btn btnDatHang" @click="datHang()">Đặt hàng</button>
                                   </div>
                              </div> -->
                         </div>
                         <hr>
                         <div class="row ">
                              <div class="col-md-10 column">
                                   <p class="">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                                        {{ formatMoney(thanhTien) }}đ</p>
                              </div>

                              <div class="col-md-2 column mt-2">
                                   <button class="btn btn-warning text-white " style="font-size: 20px;"
                                        @click="datHang()">Đặt hàng</button>
                              </div>
                         </div>
                         <div class="dialogThongBao" v-if="isOpenThongBao">
                              <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"
                                   class="labelThongBao">
                                   <span class="fas fa-check-circle" style="color:#00BA13; text-align: center;"></span>
                                   Đặt đơn hàng thành công
                              </p>
                              <button class="btnOK btn btn-sm btn-outline-secondary"
                                   @click="(isOpenThongBao = !isOpenThongBao, isOpenDatHang = !isOpenDatHang)">OK</button>
                         </div>
                    </div>
               </div>
          </div>
          <!-- ----------------------------------------ds mot so san pham -->

          <div class="row">
               <Footer />
          </div>

     </div>

     <!-- ----------------------------------------------------------- -->
</template>
     
<script type=”text/javascript”>
import SanPhamService from "../../../services/sanpham.service";
import CTGHService from "../../../services/chitietgiohang.service";
import GioHangService from "../../../services/giohang.service";
import DonHangService from "../../../services/donhang.service";
import CTDHService from "../../../services/chitietdonhang.service";
import ThuongHieuService from "../../../services/thuonghieu.service";
import { mapGetters, mapMutations } from "vuex";
// import Header from '../../../components/HomePageComponents/Header.vue';
import Footer from '../../../components/HomePageComponents/Footer.vue'


export default {
     name: `GioHang`,
     components: { Footer },
     data() {
          return {
               sanpham: {},
               ctghActive: {},
               giohangActive: {},
               sanphamChon: [],
               chitietgiohang: [],
               chonTatCa: false,
               thanhTien: 0,
               isOpenDatHang: false,
               dondathang: {},
               chitietdonhang: [],
               isOpenThongBao: false,
               SLSPTrongGioHang: false,
               sanphams: [],
               tongsoluongSP: 0,
               giohang: {},
               nameToSearch: "",
               soluongxoa: 0,
               sothanhcong: false,
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
               this.$router.push("/");
          },

          async goToDangKy() {
               this.$router.push("/DangKy");
          },

          async goToQLDangNhap() {
               this.$router.push("/DangNhap");
          },

          async goToDonHang() {
               this.$router.push("/DonHang");
          },

          //    Dinh dang hien thi tien 
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

          async retrieveCTGH() {
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    let tong = 0;
                    this.chitietgiohang = response.data;
                    this.chitietgiohang.forEach(element => {
                         tong += element.CTGH_SoLuong;
                         this.findSanPham(element);
                    });
                    this.giohang.GH_TongSoLuong = tong;
               }
               this.checkSLSP();
          },

          async retrieveSanPham() {
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
                              this.findThuongHieu(element, i)
                              i++;
                         }
                    });

                    console.log(response.data);
               }
          },

          async findThuongHieu(sp, i) {
               const [error, response] = await this.handle(
                    ThuongHieuService.get(sp.TH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanphams[i].TH_Ten = response.data.TH_Ten;
               }
          },


          // Tim kiem san pham theo ma san pham
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

          // Tim kiem thong tin gio hang
          async findGioHang(ma) {
               const [error, response] = await this.handle(
                    GioHangService.getByID(ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.giohangActive = response.data;
                    console.log(this.giohangActive)
               }
          },

          // Tang so luong san pham
          async tangSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    if (response.data.SP_SoLuong >= 1) {
                         ctgh.CTGH_SoLuong += 1;
                         this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong - 1;
                         this.giohangActive.GH_TongSoLuong = this.giohangActive.GH_TongSoLuong + 1;
                         this.updateSanPham(ctgh);
                         this.updateCTGH(ctgh);
                         this.updateGioHang();
                         this.tinhThanhTien();
                         this.retrieveGioHang();
                    }
               }
          },

          // Giam so luong san pham
          async giamSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    ctgh.CTGH_SoLuong -= 1;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + 1;
                    this.giohangActive.GH_TongSoLuong = this.giohangActive.GH_TongSoLuong - 1;
                    this.updateSanPham(ctgh);
                    this.updateCTGH(ctgh)
                    this.updateGioHang();
                    this.tinhThanhTien();
                    this.retrieveGioHang();
               }
          },

          // Cap nhat so luong san pham trong csdl
          async updateSanPham(ctgh) {
               const [error, response] = await this.handle(
                    SanPhamService.update(ctgh.SP_Ma, this.sanpham)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          // Cap nhat so luong san pham trong chi tiet gio hang
          async updateCTGH(ctgh) {
               const [error, response] = await this.handle(
                    CTGHService.update(this.currentUser.GH_Ma, ctgh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },
          async updateGioHang() {
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },
          // Cap nhat tong so luong san pham trong gio hang
          async updateGioHangKhiXoaSP() {
               this.findGioHang(this.currentUser.GH_Ma)
               this.giohangActive.GH_TongSoLuong = this.giohang.GH_TongSoLuong - this.soluongxoa;
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
                    this.retrieveGioHang();
               }
          },

          // Tim kiem san pham de tra so luong san pham khi xoa san pham khoi gio hang
          async deleteSanPham(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + ctgh.CTGH_SoLuong;
                    this.soluongxoa = ctgh.CTGH_SoLuong;
                    this.updateSanPham(ctgh);
                    this.deleteCTGHTrenGioHang(ctgh.id);
               }

          },
          // Xoa chi tiet gio hang có ma san pham da chon xoa khoi gio hang
          async deleteCTGHTrenGioHang(id) {
               const [error, response] = await this.handle(
                    CTGHService.delete(id)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH();
                    console.log(this.chitietgiohang)
                    this.updateGioHangKhiXoaSP();
               }

          },
          // Xoa chi tiet gio hang có ma san pham da chon xoa khoi gio hang
          async deleteCTGH(id) {
               const [error, response] = await this.handle(
                    CTGHService.delete(id)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH();
                    console.log(this.chitietgiohang)
                    this.retrieveGioHang();
               }

          },

          // Cap nhat tong so luong san pham trong gio hang
          async updateGioHangXoa() {
               this.findGioHang(this.currentUser.GH_Ma);
               console.log(this.giohangActive.GH_TongSoLuong + " " + this.dondathang.DH_TongSoLuong);
               this.giohangActive.GH_TongSoLuong = this.giohang.GH_TongSoLuong - this.dondathang.DH_TongSoLuong;

               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
                    this.retrieveGioHang()
               }
          },

          //Click chon san pham tren checkbox
          async chonSP(ctgh) {
               const t = this.sanphamChon.length;
               if (t == 0) {
                    this.sanphamChon.push(ctgh);
               }
               else {
                    let check = 0;
                    let i = 0;
                    this.sanphamChon.forEach(element => {
                         if (element.SP_Ma == ctgh.SP_Ma) {
                              check = 1;
                              this.sanphamChon.splice(i, 1);
                              document.getElementById('flexCheckDefault2').checked = false
                         }
                         i++;
                    });
                    if (check == 0) {
                         this.sanphamChon.push(ctgh);
                    }
               }
          },

          // Click checkbox chon tat ca san pham
          async chonTatcaSP() {
               if (this.chonTatCa) {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    let temp = this.chitietgiohang.slice();
                    this.sanphamChon = temp;
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = true;
                    }

               }
               else {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = false;
                    }
               }
          },

          async checkInSanPhamDaChon(sanpham) {
               console.log("chbk" + sanpham)
               this.sanphamChon.forEach(element => {
                    if (element.SP_Ma == sanpham) {
                         return true;
                    }
               });
               return false;
          },

          // Kiem tra so luong san pham da chon co bang so luong chi tiet gio hang khong
          async checkSLSPdaChon() {
               console.log("njvda" + this.chitietgiohang.length + " " + this.sanphamChon.length)
               if (this.chitietgiohang.length == this.sanphamChon.length) {
                    this.chonTatCa = true;
                    document.getElementById('flexCheckDefault2').checked = true;
               }
               else {
                    this.chonTatCa = false;
                    document.getElementById('flexCheckDefault2').checked = false;
               }
          },

          // Tinh thanh tien cho cac san pham da chon
          async tinhThanhTien() {
               this.thanhTien = 0;
               this.sanphamChon.forEach(element => {
                    this.thanhTien += element.SP_GiaBanRa * element.CTGH_SoLuong;
               });
          },

          // Dat hang
          async datHang() {
               console.log(this.dondathang.DH_DiaChiGiaoHang + "ncka")
               if (this.dondathang.DH_DiaChiGiaoHang != null) {
                    let tongsoluong = 0;
                    this.sanphamChon.forEach(element => {
                         tongsoluong += element.CTGH_SoLuong;
                    });

                    this.dondathang.DH_TongSoLuong = tongsoluong;
                    this.dondathang.KH_Ma = this.currentUser.KH_Ma;
                    this.dondathang.DH_TongTien = this.thanhTien;
                    this.dondathang.DH_TrangThai = "Mới";
                    this.dondathang.DH_NgayDat = new Date().toLocaleDateString();
                    console.log(this.dondathang);
                    const [error, response] = await this.handle(
                         DonHangService.create(this.dondathang)
                    );
                    if (error) {
                         console.log(error);
                    } else {
                         console.log(response.data)
                         this.createCTDH(response.data.id);
                         this.updateGioHangXoa();
                         this.thanhTien = 0;
                    }
               }
          },

          //tao chi tiet don hang

          async createCTDH(maDH) {
               this.sanphamChon.forEach(element => {
                    let temp = {};
                    temp.DH_Ma = maDH;
                    temp.CTDH_SoLuong = element.CTGH_SoLuong;
                    temp.SP_Ma = element.SP_Ma;
                    temp.CTDH_Gia = element.SP_GiaBanRa
                    console.log(this.temp);
                    this.saveCTDH(temp, element.id);
               })

          },

          async saveCTDH(ctdh, id) {
               const [error, response] = await this.handle(
                    CTDHService.create(ctdh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.chonSP(ctdh);
                    this.deleteCTGH(id);
                    this.isOpenThongBao = true;
                    this.retrieveGioHang();
               }
          },

          async checkSLSP() {
               if (this.chitietgiohang == 0) {
                    this.SLSPTrongGioHang = true;
               }
               else {
                    this.SLSPTrongGioHang = false;
               }
          },

          async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
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
                         console.log(this.sanpham)
                    }
               }
          },
     },

     mounted() {
          this.initCustomerState();
          if (this.currentUser) {
               this.retrieveGioHang();
               this.retrieveCTGH();
          }
          this.retrieveSanPham();

     }

}
</script>
     
<style>
@import '../../../assets/GioHangStyle.css';
</style>