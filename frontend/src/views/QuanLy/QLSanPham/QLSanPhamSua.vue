<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container-fluid frameQLSuaSanPham">
        <div class="row list">
            <div class="col-md-2 bg bg-warning">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader bg bg-warning" >
                    <div class="col-md-12">
                        <p class="lableName text-white">CẬP NHẬT THÔNG TIN SẢN PHẨM</p>
                    </div>
                </div>
               
                <div class="row frameSua">
                    <div class="col-md-12 col-sm-12">
                        <SanPhamFormSua :sanpham="sanpham" @suaSanPham-submit="updateSanPham" :danhmuc="danhmuc"
                            :thuonghieu="thuonghieu" :message1="message1" :message2="message2" />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import SanPhamService from '../../../services/sanpham.service';
import DanhMucService from '../../../services/danhmuc.service';
import ThuongHieuService from '../../../services/thuonghieu.service';
import SanPhamFormSua from '../../../components/QuanLy/SanPhamFormSua.vue'
import ImageService from '../../../services/image';

export default {
    name: `QLSanPhamSua`,

    components: { DanhSachChucNang, QLHeader, SanPhamFormSua },

    data() {

        return {
            sanpham: {},
            isOpen: false,
            newsanpham: {},
            message1: "",
            message2: "",
            localNhanVien: {},
            danhmuc: [],
            thuonghieu: [],
            fileName: "",
            oldImage: "",
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
        this.sanpham.SP_Ma = this.$route.params.sanpham;
    },


    methods: {
        async retrieveSanPham() {
            const [error, response] = await this.handle(
                SanPhamService.getByID(this.sanpham.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham.SP_Ma = response.data.SP_Ma;
                this.sanpham.SP_TenSanPham = response.data.SP_TenSanPham;
                this.sanpham.DMSP_Ma = response.data.DMSP_Ma;
                this.sanpham.TH_Ma = response.data.TH_Ma;
                this.sanpham.SP_SoLuong = response.data.SP_SoLuong;
                this.sanpham.SP_GiaMuaVao = response.data.SP_GiaMuaVao;
                this.sanpham.SP_GiaBanRa = response.data.SP_GiaBanRa;
                this.sanpham.SP_ThongTin = response.data.SP_ThongTin;
                console.log(response.data.SP_HinhAnh);
                this.sanpham.SP_HinhAnh = require('@/images/' + response.data.SP_HinhAnh);
                this.oldImage =require('@/images/' + response.data.SP_HinhAnh);
                this.sanpham.HinhAnhCu = response.data.SP_HinhAnh;
                this.sanpham.Image = "";
                this.findTenDanhMuc(this.sanpham.DMSP_Ma);
                this.findTenThuongHieu(this.sanpham.TH_Ma);
                console.log(response.data);
            }
        },

        async updateSanPham(data) {
            console.log(data.SP_HinhAnh + " vfd" + this.sanpham.SP_HinhAnh + " " + this.oldImage)
            if (data.SP_HinhAnh != this.oldImage) {
                //Luu hinh anh
                const formData = new FormData();
                formData.append("image", data.Image);
                const responses = await ImageService.create(formData);
                this.fileName = responses.data.filename;
                data.SP_HinhAnh = this.fileName;
                
                //Cap nhat san pham
                const [error, response] = await this.handle(
                    SanPhamService.update(data.SP_Ma, data)
                );
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.data);
                    this.message2 = "Cập nhật thành công";
                    this.retrieveSanPham();
                }
            }
            else {
                data.SP_HinhAnh = this.sanpham.HinhAnhCu;
                const [error, response] = await this.handle(
                    SanPhamService.update(data.SP_Ma, data)
                );
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.data);
                    this.message2 = "Cập nhật thành công";
                    console.log(response.data)
                    this.retrieveSanPham();
                }
            }


        },

        async retrieveThuongHieu() {
            const [error, response] = await this.handle(ThuongHieuService.getAll());
            if (error) {
                console.log(error);
            } else {
                this.thuonghieu = response.data;
                console.log(response.data);
            }
        },

        async findTenThuongHieu(MaTH) {
            const [error, response] = await this.handle(ThuongHieuService.get(MaTH));
            if (error) {
                console.log(error);
            } else {
                this.sanpham.TH_Ten = response.data.TH_Ten;
                console.log(response.data);
            }
        },

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
        async findTenDanhMuc(MaDM) {
            const [error, response] = await this.handle(
                DanhMucService.get(MaDM)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham.DM_Ten = response.data.DM_Ten;
                console.log(response.data);
            }
        },

        async goToQLSanPham() {
            this.$router.push({ name: 'QLsanpham', params: { id: this.localNhanVien.NV_Ma } });
        }
    },

    mounted() {
        this.retrieveSanPham();
        this.retrieveDanhMuc();
        this.retrieveThuongHieu();
    }
};
</script>
 
<style>
@import '../../../assets/QLSanPhamStyle.css';
</style>