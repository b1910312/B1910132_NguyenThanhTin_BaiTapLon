<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <div class="container-fluid frameQLSanPham bg bg-light">
        <div class="row list ">
            <div class="col-md-2 bg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="card border border-warning">
                    <div class="row mt-3 bottomHeader bg bg-warning ">
                        <div class="col-md-12 " style="width:100%;">
                            <p class="lableName text-white">DANH SÁCH SẢN PHẨM <button class="btn btn-primary"
                                    @click="goToThemSanPham"><i class="fa fa-add"></i></button> </p>

                        </div>
                    </div>
                    <div class="timkiem mt-3" style="width:94%; margin-left: 3%;">

                        <div class="row">

                            <input type="text" class="form-control col-10 inputSearch" placeholder="Tìm theo tên"
                                v-model="nameToSearch" @keyup.enter="searchName" />
                            <button class="btn btn-warning  col-2" type="button" style="border:none" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>

                    <div class="row" style="max-height:600px;">
                        <table id="secondTable" class="table table-warning bg bg-warning " style="width: 94%;">
                            <thead class="">
                                <tr>
                                    <th>STT</th>
                                    <th>Mã</th>
                                    <th>Tên</th>
                                    <th>Danh Mục</th>
                                    <th>Thương hiệu</th>
                                    <th>Giá bán</th>
                                    <th>Số lượng còn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, i ) in get_rows()" :key="i">
                                    <td v-if="currentPage > 1">{{ i + ((currentPage - 1) * 9) }}</td>
                                    <td v-else>{{ i }}</td>
                                    <td>{{ row.SP_Ma }}</td>
                                    <td style="width: 400px;  position: relative;">
                                        <p class="tenSP">{{ row.SP_TenSanPham }}</p>
                                    </td>
                                    <td>{{ row.DMSP_Ten }}</td>
                                    <td>{{ row.TH_Ten }}</td>
                                    <td>{{ formatMoney(row.SP_GiaBanRa) }}</td>
                                    <td>{{ row.SP_SoLuong }}</td>
                                    <!-- <td>
                                    <img :src="require(`@/images/${row.SP_HinhAnh}`)" >
                                </td> -->
                                    <td class="tdChucNang nav-item dropdown" @click="setActiveSanPham(row.SP_Ma)">

                                       <div class="row">
                                       
                                        <a class="dropdown- btn btn-success col m-1" href="#" @click="goToSuaSanPham"><span
                                                class="fas fa-edit"></span> Sửa</a>
                                        <a class="dropdown- btn btn-danger col m-1" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span
                                                class="fas fa-trash-alt"></span> Xóa</a>

                                       </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- danh sach so trang hien thi -->
                <div class="row" style="width: 100%;" v-if="!isOpenChoosePage">
                    <div class="btnChonTrang">
                        <p style="display: inline-block; padding-top: 4px;text-align: right;"></p>
                        <div class="numberPage">
                            <div class="dropup">
                                <button class="dropbtn">{{ currentPage }} &nbsp;
                                    <span class="fas fa-chevron-up"></span></button>
                                <div class="dropup-content">
                                    <a class="dropdown-item" v-for="(i, j) in num_pages() " :key="j"
                                        v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                        aria-controls="my-table"> {{ i }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ------------------------------Bang xac nhan xoa danh muc ----------------------------- -->
    <div class="dialogXacNhan bg bg-danger" v-if="isOpenXacNhan">
        <p style="color:white; text-align:center; margin-top: 50px; font-size: 18px;">
            <span class="fas fa-trash-alt" style="color:white"></span> Bạn chắc chắn muốn xóa?
        </p>
        <button class="  m-1 btn btn-danger border border-light"
            @click="findSanPhamTheoCTDH(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Xóa</button>
        <button class="  m-1 btn  btn-dark border border-light" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
    </div>
    <div class="dialogThongBao" v-if="isOpenThongBao">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;">
            <span v-if="message == 'Đã xóa danh mục đã chọn'" class="fas fa-check-circle"
                style="color:#00BA13; text-align: center;"></span>
            <span v-else class="fas fa-exclamation-circle" style="color:red; text-align: center;"></span>
            {{ message }}
        </p>
        <button class="btnOK btn btn-sm btn-outline-secondary" @click="isOpenThongBao = !isOpenThongBao">OK</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import SanPhamService from '../../../services/sanpham.service';
import ImageService from '../../../services/image';
import DanhMucService from '../../../services/danhmuc.service';
import ChiTietDonHangService from '../../../services/chitietdonhang.service';
import ThuongHieuService from '../../../services/thuonghieu.service';

export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            sanpham: [],
            localNhanVien: {},
            image: [],
            nameToSearch: "",
            sanphamActive: "",
            message: "",
            isOpenXacNhan: false,
            isOpenThongBao: false,
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            isOpenChoosePage: false,
            thuonghieu: [],
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },

    computed: {
        "columns": function columns() {
            if (this.sanpham.length == 0) {
                return [];
            }
            return Object.keys(this.sanpham[0])
        }
    },

    methods: {

        async retrieveSanPham() {
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                this.sanpham.forEach(element => {
                    this.findDanhMuc(element);
                    this.thuonghieu.forEach(th => {
                        if (element.TH_Ma == th.TH_Ma) {
                            element.TH_Ten = th.TH_Ten;
                        }
                    });
                });
            }
        },

        async findThuongHieu() {

            const [error, response] = await this.handle(
                ThuongHieuService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data)
                this.thuonghieu = response.data;
            }
        },

        async retrieveImage() {
            const [error, response] = await this.handle(
                ImageService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.image = response.data;
            }
        },

        async setActiveSanPham(data) {
            this.sanphamActive = data;
            console.log(this.sanphamActive)
        },

        async findDanhMuc(sanpham) {
            const [error, response] = await this.handle(
                DanhMucService.get(sanpham.DMSP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                sanpham.DMSP_Ten = response.data.DM_Ten;
            }
        },

        async findSanPhamTheoCTDH() {
            this.message = "";
            const [error, response] = await this.handle(
                ChiTietDonHangService.get(this.sanphamActive)
            );
            console.log(response.data)
            if (response.data.length == 0) {
                this.deleteSanPham();

                console.log(error);
            } else {
                this.message = "Không thể xóa sản phẩm";
                console.log(response)
            }
        },

        async deleteSanPham() {
            console.log("jffnewg");
            const [error, response] = await this.handle(
                SanPhamService.delete(this.sanphamActive)
            );
            if (error) {
                console.log(error);
                this.message = "Xóa sản phẩm không thành công"
            } else {
                this.retrieveSanPham()
                this.message = "Xóa sản phẩm thành công"
                console.log(response.data)
            }
        },

        async goToThemSanPham() {
            this.$router.push({ name: 'QLSanPhamThem', params: { id: this.localNhanVien.NV_Ma } });
        },

        async goToSuaSanPham() {
            this.$router.push({ name: 'QLSanPhamSua', params: { id: this.localNhanVien.NV_Ma, sanpham: this.sanphamActive } });
        },

        //Tìm kiếm theo tên
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
                    console.log(response.data)
                }
            }
        },

        //  so hang của danh sach danh muc
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.sanpham.slice(start, end);
        },

        // So trang cua danh sach danh muc
        num_pages() {
            return Math.ceil(this.sanpham.length / this.elementsPerPage);

        },

        async change_page(page) {
            this.currentPage = page;
        },

        formatMoney(data) {
            let val = (data / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    },

    mounted() {
        this.findThuongHieu();
        this.retrieveSanPham();
        this.retrieveImage();
    }
};
</script>

<style>
@import '../../../assets/QLSanPhamStyle.css';

.frameQLSanPham .icon {
    font-size: 18px;
}

.dschucNang .navigationBar .moreInformation {
    margin-top: 40px;
}
</style>