const mongoose=require("mongoose");
const mongoosePaginate=require("mongoose-paginate-v2");
const collection = "carts";
const cartSchema= new mongoose.Schema({
 
    descripcion:{
        type:String,
        required: true,
    },
    total:{
        type:Number,
        required: true,
    },
    codigo:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required: true,
    },
});
const cartModel=mongoose.model(collection, cartSchema);
module.exports=cartModel