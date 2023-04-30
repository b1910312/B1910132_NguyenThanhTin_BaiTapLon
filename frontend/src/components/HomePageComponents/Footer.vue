<template>
     <div class="container-fluid footer-home bg-warning">
       <div class="row pt-5 justify-content-md-center">
           <div class="col" style="font-size: 14px;">
               <img :src="require(`@/images/logo_footer.png`)" alt="" class="img-fluid w-50">
               <p class="p-0 pt-5 mt-2 text-left textfooter" >KINGFOODS MÓN ĂN GÌ CŨNG CÓ </p>
               <p class="p-0 mt-2 text-left textfooter" >Kingfoods rất hân hạnh được phục vụ bữa ăn của quý khách!</p>
           </div>
           <div class="col-6">
              <div class="card" style="background-color: rgba(0, 0, 0, 0.2);">
                <div class="card-header">
                    <h3 class="textKetNoi">Liên hệ</h3>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="" class="form-label text-white" >Email</label>
                    <input type="email" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label text-white" >Nội dung</label> <br>
                    <textarea name="" id="" cols="75" rows="5"></textarea>
                  </div>
                  <div class="mb-3">
                    <button type="submit" class="btn btn-primary" style="float: right;">Gửi</button>
                  </div>
                </div>
              </div>
           </div>
           <div class="col">
               <p class="p-0 mt-2 textKetNoi" >KẾT NỐI VỚI CHÚNG TÔI</p>
               <div class="row p-0 pt-5 mt-2" style="color: #000000">
                   <span class="col "><i class="fab fa-lg fa-facebook iconfooter" ></i> </span> 
                   <span class="col "><i class="fab fa-lg fa-instagram iconfooter" ></i> </span>
                   <span class="col "><i class="fab fa-lg fa-twitter iconfooter" ></i> </span> 
               </div>
            </div>            
       </div>
       <div class="row pt-3 justify-content-md-center container-fluid">
           <p class="textfooter">Copyright © 2023 - B1910312 -Nguyễn Thanh Tín | CT448 </p>
       </div>
   </div>
</template>

<script>
//import 
export default {
name: `Footer`,
props: ["footer"],
};
</script>

<style>
.footer-home {
    color: black;
    border-color: #515151;
   padding: 1px;
   border-radius: 20px;
   margin-top: 2%;
}
.footer-home .textfooter{
    font-family: Inter;
    font-size: 17px;
    text-align: center;
    color: white;
}

.footer-home .iconfooter{
    font-size: 35px;
    color: white;
}

.footer-home .textKetNoi{
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    color: white;
}
</style>