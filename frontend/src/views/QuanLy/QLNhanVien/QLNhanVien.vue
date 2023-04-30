<template>
    <div class="container-fluid frameQLNhanVien">
        <div class="row list">
            <div class="col-md-2 bg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader bg bg-warning">
                    <div class="col-md-12" style="width:96%; margin-left: 2%;">
                        <p class="lableName text-white">DANH SÁCH NHÂN VIÊN<button class="btn btn-primary"
                                @click="gotoThemNhanVien"><i class="fa fa-add"></i></button></p>
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
                <!-- <Danh sach danh muc san pham-->
                <div class="row" style="max-height:700px;" v-if="!isOpenXemChiTiet">
                    <table class="table table-warning bg bg-warning" style="width: 94%">
                        <thead>
                            <tr>
                                <th style="font-size: 25px">STT</th>
                                <th style="font-size: 25px">Mã nhân viên</th>
                                <th style="font-size: 25px">Họ và Tên</th>
                                <th style="font-size: 25px">Chức vụ</th>
                                <th style="font-size: 25px">Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i ) in get_rows()" :key="i">
                                <td v-if="currentPage > 1">{{ i + ((currentPage - 1) * 9) }}</td>
                                <td v-else>{{ i }}</td>
                                <td>{{ row.NV_Ma }}</td>
                                <td>{{ row.NV_Ho + " " + row.NV_Ten }}</td>
                                <td v-if="row.NV_LoaiNV == '1'">Quản Lý</td>
                                <td v-else>Nhân Viên</td>
                                <td>{{ row.NV_SDT }}</td>
                                <td class="tdChucNang nav-item dropdown" @click="setNhanVienActive(row)">
                                    <div class="row mx-3">
                                        <a class="m-1 suaNV col btn btn-success" href="#" @click="goToSuaNhanVien"><span
                                                class="fas fa-edit"></span> Sửa</a>
                                        <a class="m-1 xoaNV col btn btn-danger" href="#"
                                            @click="isOpenXacNhan = !isOpenXacNhan"><span class="fas fa-trash-alt"
                                                style="color:white"></span> Xóa</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- danh sach so trang hien thi -->
                <div class="row" style="width: 100%;" v-if="!isOpenChoosePage">
                    <div class="btnChonTrang">
                        <p style="display: inline-block; padding-top: 4px;text-align: right;" class="soTrang">Trang &nbsp;
                        </p>
                        <div class="numberPage">
                            <div class="dropup">
                                <button class="dropbtn">{{ currentPage }}
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
    <!-- ------------------------------Bang xac nhan xoa nhan vien ----------------------------- -->
    <div class="dialogXacNhan bg bg-danger" v-if="isOpenXacNhan">
        <p style="color:white; text-align:center; margin-top: 50px; font-size: 18px;" class="labelXacNhan">
            <span class="fa fa-trash-alt" style="color:white"></span> Bạn chắc chắn muốn xóa?
        </p>
        <button class="border m-1 border-light btn btn-sm btn-danger"
            @click="findNVDonHang(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Xóa</button>
        <button class="border m-1 border-light btn btn-sm btn-dark" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
    </div>
    <div class="dialogThongBao bg bg-success" v-if="isOpenThongBao">
        <p style="color:white; text-align:center; margin-top: 50px; font-size: 18px;" class="labelThongBao">
            <span class="fa fa-check-circle" style="color:white; text-align: center;"></span> {{ message }}
        </p>
        <button class="mx-auto m-1 btn btn-sm btn-light" @click="isOpenThongBao = !isOpenThongBao">OK</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import NhanVienService from '../../../services/nhanvien.service';
import DonHangService from '../../../services/donhang.service';


export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            nhanvien: [],
            message: "",
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            nhanvienActive: {},
            isOpenXacNhan: false,
            isOpenThongBao: false,
            isOpenXemChiTiet: false,
            localNhanVien: {},
            nameToSearch: "",
            isOpenChoosePage: false,
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },
    methods: {
        // Lay danh sach danh muc
        async retrieveNhanVien() {
            const [error, response] = await this.handle(
                NhanVienService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.nhanvien = response.data;
                console.log(response.data);
            }
        },

        //  so hang của danh sach danh muc
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.nhanvien.slice(start, end);
        },

        // So trang cua danh sach danh muc
        num_pages() {
            return Math.ceil(this.nhanvien.length / this.elementsPerPage);

        },
        async gotoThemNhanVien() {
            this.$router.push({ name: 'ThemNhanVien', params: { id: this.localNhanVien.NV_Ma } });
        },
        async change_page(page) {
            this.currentPage = page;
        },

        // Set danh muc duoc chon
        async setNhanVienActive(nhanvienActive) {
            this.nhanvienActive = nhanvienActive;
        },

        //Tim nhan vien theo don hang

        async findNVDonHang() {

            const [error, response] = await this.handle(
                DonHangService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                const donhang = response.data;
                let check = 0;
                donhang.forEach(element => {
                    if (element.NV_Ma == this.nhanvienActive.NV_Ma) {
                        this.message = "Không thể xóa nhân viên!"
                        check = 1;
                    }
                });
                if (check == 0) {
                    this.deleteNhanVien();
                }

            }
        },
        //Xoa danh muc duoc chon
        async deleteNhanVien() {
            const [error, response] = await this.handle(
                NhanVienService.delete(this.nhanvienActive.NV_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.refreshList();
                console.log(response.data);
                this.message = "Xóa nhân viên thành công"
            }
        },

        //den trang sua thong tin nhan vien
        async goToSuaNhanVien() {
            this.$router.push({ name: 'SuaNhanVien', params: { id: this.localNhanVien.NV_Ma, user: this.nhanvienActive.NV_Ma } });
        },



        //Tai lai danh sach danh
        async refreshList() {
            this.retrieveNhanVien();
            this.nhanvienActive = "";
        },

        //Tim kiem nhan vien theo ten

        async searchName() {
            const [error, response] = await this.handle(NhanVienService.findByName(this.nameToSearch));
            if (error) {
                console.log(error);
            } else {
                if (response.data != null) {
                    this.nhanvien = response.data;
                    console.log(response.data)
                }
                else {
                    this.message = "Không tìm thấy nhân viên!";
                    this.isOpenThongBao = !this.isOpenThongBao;
                }

            }
        }

    },

    mounted() {
        this.retrieveNhanVien();
    }
};
</script>
 
<style>
@import "../../../assets/QLNhanVienStyle.css";
@import "../../../assets/QuanLyStyle.css";

.frameQLNhanVien .dschucNang .navigationBar .dsChucNang .btnNhanVien {
    background-color: #FFFFFF;
    color: #515151;
}

.dschucNang .navigationBar .moreInformation {
    margin-top: 20px;
}

.frameQLNhanVien .icon {
    font-size: 18px;
}</style>