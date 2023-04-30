module.exports = mongoose => {
     const schema = mongoose.Schema(
         {
             GH_Ma: {
                 type: String,
                 required: [true, "Ma don hang duoc yeu cau"],
             },
 
             SP_Ma: {
                 type: String,
                 required: [true, "Ma san pham duoc yeu cau"],
             },
             CTGH_SoLuong: {
                 type: Number,
                 required: [true, "So luong san pham duoc yeu cau"],
             },
 
         });    
         
         // Replace _id with id and remove __V
         schema.method("toJSON", function() {
             const { __v, _id, ...object } = this.toObject();
             object.id = _id;
             return object;
         });
 
 
         return mongoose.model("ChiTietGioHang", schema);  
 };