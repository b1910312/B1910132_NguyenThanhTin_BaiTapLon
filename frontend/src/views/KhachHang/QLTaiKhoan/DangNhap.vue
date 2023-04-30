
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <div class="container frameDangNhap" style="height: 99vh; max-width: 300%;">
        <div class="row formDangNhap mx-auto"  style="max-width: 50%; background-color: rgba(255, 255, 255, 0.5);">
            <div class="col-md-12 rightForm">
                <div style="margin-top: 10%">
                    <h1 class="labelDangNhap" style="text-align:center; font-weight: 600;">ĐĂNG NHẬP</h1>
                </div>
                <div class="row">
                    <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ isSubmitting }">
                        <div class="form-group">
                            <label for="KH_SDT" style="font-size:30px">Số điện thoại</label>
                            <Field name="KH_SDT" type="text" class="form-control"
                                placeholder="Nhập số điện thoại đã đăng ký tài khoản" v-model="khachhang.KH_SDT" />
                            <ErrorMessage name="KH_SDT" class="error-feedback" />

                        </div>

                        <div class="form-group" style="margin-top:10%">
                            <label for="KH_MatKhau" style="font-size:30px">Mật khẩu</label>
                            <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0">
                                <Field v-if="!isOpenPassword" name="KH_MatKhau" type="password" class="form-control col-md-10"
                                    placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />
                                <Field v-if="khachhang.KH_MatKhau=='' & isOpenPassword" name="KH_MatKhau" type="text"
                                    class="form-control col-md-10" placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />

                                <Field v-if="khachhang.KH_MatKhau!='' & isOpenPassword" name="KH_MatKhau" type="text"
                                    class="form-control col-md-10" placeholder="{{khachhang.KH_MatKhau}}" v-model="khachhang.KH_MatKhau" />

                              
                            </div>
                            <ErrorMessage name="KH_MatKhau" class="error-feedback" />
                            <hr style="border: solid rgba(255, 255, 255, 0);">

                            <a href="#" @click="goToQuenMatKhau" style="font-size:20px" class="quenMatKhau">Quên mật khẩu?</a>
                        </div>

                        
                        <p v-if="message" style=" color: red; text-align: center; font-size: 17px; margin-top: 4%;">
                            {{ message }}
                        </p>
                        <hr style="border: solid rgba(255, 255, 255, 0);">

                        <div class="form-group my-3 btn-login">
                            <button class="btn btn-sm btn-outline-secondary btn-block btnDangNhap" style="background-color: blue;"
                                :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                <span>Đăng Nhập</span>
                            </button>
                        </div>
                        <div class="botton-register">
                            <p style="font-size:20px">Bạn chưa có tài khoản?  <button class="btnDangKy" style="font-size:30px" @click="goTodangKy">Đăng ký</button></p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapGetters } from "vuex";
export default {
    name: `QLDangNhap`,
    components: { Form, Field, ErrorMessage },
    data() {

        const schema = yup.object().shape({
            KH_SDT: yup.string().required("Số điện thoại phải có giá trị"),
            KH_MatKhau: yup.string().required("Mật khẩu phải có giá trị"),
        });

        return {
            loading: false,
            message: "",
            schema,
            isOpenPassword: false,
            khachhang: {},
        };
    },
    computed: {
        ...mapGetters([
            "khachhangLoggedIn"
        ]),
    },
    created() {
        if (this.khachhangLoggedIn) {
            this.$router.push("/DangNhap");
        }
    },
    methods: {
        async handleLogin(khachhang) {
            this.loading = true;

            const [error,data] = await this.handle(
                this.$store.dispatch("login", khachhang)
            );
            if (error) {
                console.log(error);
                this.loading = false;
                this.message = "Số điện thoại hoặc mật khẩu đăng nhập sai";
            } else {
                this.$router.push("/");
                console.log(data)
            }
        },

        async goToQuenMatKhau() {
            this.$router.push("/QLQuenMatKhau");
        },

        async goTodangKy(){
            this.$router.push("/DangKy");
        }
    },
    mounted(){
        this.khachhang.KH_MatKhau="";
    }

}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css";
.btnDangKy{
    border: none;
    background-color: unset;
    color: #515151;
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
}
.btnGoToDangKy:hover{
    color: black;
}
</style>