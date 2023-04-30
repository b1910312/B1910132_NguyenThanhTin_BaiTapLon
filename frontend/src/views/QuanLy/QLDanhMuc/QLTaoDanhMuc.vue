<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container-fluid frameQLThemDanhMuc">
        <div class="row list">
            <div class="col-md-2 bgg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma"/>
            </div>
            <div class="col-md-10">
                <QLHeader  :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader bg bg-warning">
                    <div class="col-md-12 ">
                        <p class="lableName text-white">THÊM DANH MỤC SẢN PHẨM</p>
                    </div>
                </div>
               
                <hr style="color:#515151">                   
                <div class="row m-5 pb-5 frameThem border border-warning " style="max-width: 100%;" >
                    <div class="col-12">
                        <DanhMucTao :newdanhmuc="newdanhmuc" @themDanhMuc-submit="findDanhMuc"
                            :message1="message1" :message2="message2"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
import DanhMucTao from '../../../components/QuanLy/DanhMucFormThem.vue'
export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader, DanhMucTao },
    data() {

        return {
            danhmuc: [],
            isOpen: false,
            newdanhmuc: {},
            message1: "",
            message2:"",
            localNhanVien:{},
        }

    },
    created(){
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },
    computed: {
        "columns": function columns() {
            if (this.danhmuc.length == 0) {
                return [];
            }
            return Object.keys(this.danhmuc[0])
        }
    },
    methods: {
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

        async createDanhMuc(data) {
            const [error, response] = await this.handle(
                DanhMucService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message2 = "Thêm thành công";
            }
        },

        async findDanhMuc(data) {
            const [error, response] = await this.handle(
                DanhMucService.get(data.DM_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Chua ton tai") {
                    this.createDanhMuc(data);
                    this.message1 = "";
                }
                else {
                    this.message1 = "Mã đã tồn tại";
                    this.message2 = "Thêm không thành công"

                }
            }
        },

        async goToQLDanhMuc(){
            this.$router.push({ name: 'QLDanhMucSanPham', params: { id: this.localNhanVien.NV_Ma }});
        }
    },
    mounted() {
        this.retrieveDanhMuc();
    }
};
</script>

<style>
@import "../../../assets/QLDanhMucStyle.css";
</style>