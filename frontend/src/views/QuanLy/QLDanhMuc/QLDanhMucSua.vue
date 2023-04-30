<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container-fluid frameQLSuaDanhMuc">
        <div class="row list">
            <div class="col-md-2 bg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader bg bg-warning">
                    <div class="col-md-12 ">
                        <p class="lableName text-white">CẬP NHẬP THÔNG TIN DANH MỤC</p>
                    </div>
                </div>
                
                <hr style="color:#515151">
                <div class="row frameSua border border-warning mx-auto" style="max-width: 96%;">
                    <div class="col-12 pb-5">
                        <DanhMucFromSua :newdanhmuc="newdanhmuc" @suaDanhMuc-submit="updateDanhMuc"
                            :message1="message1" />
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
import DanhMucFromSua from '../../../components/QuanLy/DanhMucFormSua.vue';
export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader, DanhMucFromSua },
    data() {

        return {
            isOpen: false,
            newdanhmuc: {},
            message1: "",
            localNhanVien: {},
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;

        console.log("1")
    },

    methods: {
        async updateDanhMuc(data) {
            this.message1 = "";
            const [error, response] = await this.handle(
                DanhMucService.update(data.DM_Ma, data)
            );
            if (error) {
                console.log(error);
                this.message1 = "Cập nhật không thành công";
            } else {
                console.log(response.data);
                this.message1 = "Cập nhật thành công";
            }
        },

        async findDanhMuc(data) {
            console.log("2")
            const [error, response] = await this.handle(
                DanhMucService.get(data)
            );
            if (error) {
                console.log(error);
            } else {
                this.newdanhmuc.DM_Ma = response.data.DM_Ma;
                this.newdanhmuc.DM_Ten = response.data.DM_Ten;
                console.log(response.data);
            }
        },

        async goToQLDanhMuc() {
            this.$router.push({ name: 'QLDanhMucSanPham', params: { id: this.localNhanVien.NV_Ma } });
        }
    },
    mounted() {
        this.findDanhMuc(this.$route.params.user)
        console.log("5")
    }
};
</script>

<style>
@import '../../../assets/QLDanhMucStyle.css';

.frameQLDanhMuc .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}
</style>