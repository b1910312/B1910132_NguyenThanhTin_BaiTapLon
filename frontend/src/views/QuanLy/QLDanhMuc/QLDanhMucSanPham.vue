<template>
    <div class="container-fluid frameQLDanhMuc">
        <div class="row list">
            <div class="col-md-2 bg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader bg bg-warning">
                    <div class="col-md-12">
                        <p class="lableName text-white">DANH SÁCH DANH MỤC<button class="btn btn-primary"
                                @click="gotoTaoDanhMuc"><i class="fa fa-add"></i></button></p>
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
                <div class="row dsDanhMuc">
                    <table class="table table-warning bg bg-warning">
                        <thead style="text-align:center">
                            <tr>
                                <th>STT</th>
                                <th :sortKey="DM_Ma" :hideSortIcons="true">Mã danh mục</th>
                                <th>Tên danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i ) in get_rows()" :key="i">
                                <td v-if="currentPage > 1">{{ i + ((currentPage - 1) * 9) }}</td>
                                <td v-else>{{ i }}</td>
                                <td>{{ row.DM_Ma }}</td>
                                <td>{{ row.DM_Ten }}</td>
                                <td class="tdChucNang nav-item dropdown" @click="setDanhmucActive(row.DM_Ma)">
                                  
                                    <div class="row">
                                        <a class="col btn btn-success m-1" href="#" @click="gotoSua"><span class="fas fa-edit"></span>
                                            Sửa</a>
                                        <a class="col btn btn-danger m-1" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span
                                                class="fas fa-trash-alt" style="color:white"></span> Xóa</a>
                                   
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- danh sach so trang hien thi -->
                <div class="row" style="width: 100%;" v-if="!isOpenChoosePage ">
                    <div class="btnChonTrang">
                        <p style="display: inline-block; padding-top: 4px;text-align: right;">Trang &nbsp;</p>
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
    <!-- ------------------------------Bang xac nhan xoa danh muc ----------------------------- -->
    <div class="dialogXacNhan bg bg-danger" v-if="isOpenXacNhan">
        <p style="color: white; text-align:center; margin-top: 50px; font-size: 18px;">
            <span class="fas fa-trash-alt" style="color:white"></span> Bạn chắc chắn muốn xóa?
        </p>
        <button class=" m-1 border border-light btn btn-sm btn-danger"
            @click="deleteDanhMuc(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Xóa</button>
        <button class=" m-1 border border-light btn btn-sm btn-dark" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
    </div>
    <div class="dialogThongBao bg bg-success" v-if="isOpenThongBao">
        <p style="color:white; text-align:center; margin-top: 50px; font-size: 18px;">
            <span v-if="message == 'Đã xóa danh mục đã chọn'" class="fas fa-check-circle"
                style="color:white; text-align: center;"></span>
            <span v-else class="fas fa-exclamation-circle" style="color:red; text-align: center;"></span>
            {{ message }}
        </p>
        <button class=" btn btn-sm btn-light mx-auo m-1" @click="isOpenThongBao = !isOpenThongBao">OK</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
import SanPhamService from '../../../services/sanpham.service';

export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            danhmuc: [],
            message: "",
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            danhmucActive: "",
            isOpenXacNhan: false,
            isOpenThongBao: false,
            localNhanVien: {},
            sanpham: [],
            nameToSearch: "",
            isOpenChoosePage: false,
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },
    methods: {
        // Lay danh sach danh muc
        async retrieveDanhMuc() {
            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                console.log(response.data);
            }
        },

        //  so hang của danh sach danh muc
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.danhmuc.slice(start, end);
        },

        // So trang cua danh sach danh muc
        num_pages() {
            return Math.ceil(this.danhmuc.length / this.elementsPerPage);

        },

        async change_page(page) {
            this.currentPage = page;
        },

        async gotoTaoDanhMuc() {
            this.$router.push({ name: 'TaoDanhMuc', params: { id: this.localNhanVien.NV_Ma } });
        },


        // Set danh muc duoc chon
        async setDanhmucActive(danhmucActive) {
            console.log(danhmucActive);
            this.danhmucActive = danhmucActive;
        },

        //Xoa danh muc duoc chon
        async deleteDanhMuc() {
            let check = 0;
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
            }
            this.sanpham.forEach(element => {
                if (element.DMSP_Ma == this.danhmucActive) {
                    this.message = "Không thể xóa danh mục đã chọn";
                    check = 1;
                }
            });

            if (check == 0) {
                const [errors, responses] = await this.handle(
                    DanhMucService.delete(this.danhmucActive)
                );
                if (errors) {
                    console.log(errors);
                } else {
                    this.refreshList();
                    console.log("xoa thanh cong" + responses);
                    this.message = "Đã xóa danh mục đã chọn"
                }
            }

        },

        // Tim danh muc theo ten

        async searchName() {
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                DanhMucService.findByName(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data != null) {
                    this.danhmuc = response.data
                    console.log(response.data)
                }
            }
        },

        async gotoSua() {
            this.$router.push({ name: 'SuaDanhMuc', params: { id: this.localNhanVien.NV_Ma, user: this.danhmucActive } })
        },

        //Tai lai danh sach danh
        async refreshList() {
            this.retrieveDanhMuc();
            this.danhmucActive = "";
        },
    },

    mounted() {
        this.retrieveDanhMuc();
    }
};
</script>

<style>
@import "../../../assets/QLDanhMucStyle.css";

.frameQLDanhMuc .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}
</style>