const mongoose=require("mongoose");
const mongoosePaginate=require("mongoose-paginate-v2");
const collection = 'users';
const roleType={
    USER:"USER",
    ADMIN:"ADMIN",
    PUBLIC:"PUBLIC",
}
const userSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum: Object.values(roleType),
    },

     carts:{
        type: [
            {
                note:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"carts",
                }
            }
        ],
        default:[]
     }

});

userSchema.plugin(mongoosePaginate);
userSchema.pre('find', function(){
    this.populate("carts.descripcion");
})

const userModel=mongoose.model(collection, userSchema);
module.exports=userModel;