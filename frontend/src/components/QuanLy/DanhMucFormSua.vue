<template>
    <Form @submit="$emit('suaDanhMuc-submit', danhmucLocal)" :validation-schema="schema">

        <div class="form-group">
            <label for="name">Mã danh mục</label>
            <Field name="ma" type="name" class="form-control" v-model="danhmucLocal.DM_Ma" :disabled="true" />
            <ErrorMessage name="ma" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="profile">Tên danh mục</label>
            <Field name="profile" class="form-control" v-model="danhmucLocal.DM_Ten" />
            <ErrorMessage name="profile" class="error-feedback" />
        </div>

        <div class="form-group row">
            <div class="mx-auto col-3">
                <span v-if="message1 == 'Cập nhật thành công'" class=" fa fa-check-circle" 
                    style="color:#00BA13; text-align: center; margin-left: 26%;"></span> 
                <span v-if="message1 != 'Cập nhật thành công' && message1 != ''" class=" fa fa-times-circle"
                    style="color:red; text-align: center;  margin-left: 32px;"></span> 
                <p v-if="message1 == 'Cập nhật thành công'" class=" textMessage2" style="color:#00BA13">{{ message1 }}</p>
                <p v-else class=" textMessage2">{{ message1 }}</p><br>
                <p v-if="message1 == 'Cập nhật không thành công'" class="textMessage1">{{ message1 }}</p>
            </div>

        </div>
        <div class="row">
            <button class="btn btn-success mx-auto">Cập nhật</button>
        </div>
    </form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "DanhMucFormSua",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["suaDanhMuc-submit"],
    props: ["newdanhmuc", "message1"],
    data() {

        const schema = yup.object().shape({
            ma: yup
                .string()
                .required("Mã danh mục phải có giá trị.")
                .min(10, "Mã danh mục phải gồm 10 ký tự.")
                .max(10, "Mã danh mục phải gồm 10 ký tự."),
            profile: yup

                .string()
                .required("Tên danh mục phải được nhập")
        });
        return {
            danhmucLocal: this.newdanhmuc,
            schema,
        };
    },
    methods: {
        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        }
    }
};
</script>

<style>
form {
    border-radius: 10px;
    top: calc(50%);
    background-color: #FFFFFF;
    margin-bottom: 10px;
}

form .functionName {
    text-align: center;
    font-family: Inter;
    color: #515151;
    font-size: 25px;
    padding-top: 20px;
}

form .form-group {
    color: black;
    width: 90%;
    margin-left: 25px;
    margin-top: 50px;
}

form .error-feedback {
    text-align: right;
    color: red;
    float: right;
}

form .textMessage2 {
    padding-top: 5px;
    /* text-align: center; */
    padding-bottom: 2px;
    color: #D30000;
    display: inline;
}

form .textMessage1 {
    padding-bottom: 2px;
    color: #D30000;
    text-align: center;
}

form .btnCapNnhat {
    text-align: center;
    transform: translateY(0px);
    margin-left: 44%;
    margin-top: 5px;
    margin-bottom: 2%;
    width: 125px;
    background-color: #515151;
    color: #FFFFFF;
}
</style>