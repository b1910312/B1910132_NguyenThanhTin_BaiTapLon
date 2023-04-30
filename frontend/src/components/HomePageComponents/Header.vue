<template>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <div class="container-fuild homepage" data-spy="scroll" data-target=".header" data-offset="60">
      <div class="container-fuild header">
        <header class="align-items-center">
          <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container">
              <div class="col-3">
                <a class="navbar-brand col" style="font-size: 40px;" href="#">KING FOODS</a>
                <button class="navbar-toggler d-lg-none col" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>

              <div class="col-5 row">

                <div class="collapse navbar-collapse col" id="collapsibleNavId">
                  <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" href="#" aria-current="page" style="font-size: 25px;">Trang chủ <span
                          class="visually-hidden">(current)</span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#" style="font-size: 25px;">Cửa hàng</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"
                        style="font-size: 25px;">
                        Thương hiệu
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownId">
                        <a class="dropdown-item" href="#" v-for="(item, i) in thuonghieu" :key="i"
                          @click="timSPTheoThuongHieu(item)">{{
                            item.TH_Ten
                          }}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="row">
                  <form class="d-flex my-2 my-lg-0">
                    <input class="form-control me-sm-2" type="text" placeholder="Tìm kiếm" v-model="nameToSearch"
                      @keyup.enter="searchName" style="font-size: 18px;">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="searchName"><i
                        class="fa fa-search"></i></button>
                  </form>
                </div>

                <div class="row p-3" v-if="currentUser">
                  <p class="tenTaiKhoan col" style="font-size: 25px;">{{ currentUser.KH_Ten }}</p>

                  <router-link :to="{ name: 'GioHang' }" class="btn btn-login col ">
                    <div class="row">
                      <i class="fas fa-shopping-cart col mx-0 ">{{ giohang.GH_TongSoLuong }}
                      </i>
                    </div>
                  </router-link>
                  <a href="" class="btn btn-login col" @click="logout()"><i class="fa fa-sign-in-alt"
                      style="font-size: 30px;"></i></a>
                </div>
                <div class="row p-3" v-if="!currentUser">
                  <a href="#" class="btn btn-login col" @click="goToQLDangNhap()">Đăng nhập</a>
                  <a href="#" class="btn btn-login col" @click="goToDangKy()">Đăng ký</a>
                  <router-link :to="{ name: 'KHDangNhap' }" class="btn btn-login col">
                    <div class="row">

                      <i class="fas fa-shopping-cart ">{{ giohang.GH_TongSoLuong }}
                      </i>
                    </div>

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
                            <a class="nav-link" href="#">BÁN CHẠY</a>
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
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: `Header`,
  props: ["giohang"],
  data() {
    return {

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

  },
  mounted() {
    this.initCustomerState();
  }
}
</script>
<style>
.header {
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}

.header .search {
  text-align: center;
  background-color: #E9E8E8;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 1%;
}

.header .btnDangKy {
  border: none;
  color: white;
  background-color: #929292;
  border-radius: 5px;
  font-size: 18px;
  margin-top: -5%;

}

.header .btnGioHang {
  border: none;
  background-color: none;
  color: #929292;
  margin-top: -5%;
}

.header .btnGioHang:hover {
  border: none;
  color: #929292;
}

.header .iconGioHang {
  border: none;
  background-color: none;
  font-size: 32px;
  color: #929292;
}

.header .iconGioHang:hover {
  border: none;
  background-color: none;
  color: #515151;
}

.header .btnTaiKhoan {
  background-color: #E9E8E8;
  border: none;
  margin-top: 3%;
  color: #929292;
  /* position: relative;
  top:-40% */
}

.header .iconTaiKhoan {
  font-size: 38px;
  color: #929292;
}

.header .navbar-expand-lg {
  color: #515151;
  font-size: 20px;

}

.headerKhachHang .nav-item {
  color: #515151;
  font-size: 20px;
}

.headerKhachHang .soluongsanpham {
  position: absolute;
  top: 40%;
  left: 65%;
  font-size: 17px;
  border-radius: 50%;
  border: 0.1px solid #929292;
  background-color: #929292;
  height: 30px;
  width: 30px;
  color: #FFFFFF;
}

.header .nav-link .dropdown-menu {
  background-color: #FFFFFF;
  width: max-content;
  border-radius: 0px 0px 10px 10px;
  display: none;
  text-align: left;
}

.header .nav-item .nav-link:hover .dropdown-menu {
  position: absolute;
  background-color: #FFFFFF;
  top: calc(97%);
  transform: translateX(-70%);
  left: 10%;
  width: max-content;
  border-radius: 0px 0px 10px 10px;
  display: block;
  text-align: left;
}
</style>