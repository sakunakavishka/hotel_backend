import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
       email :{ 
        type:String,
         required : true,
         unique:true
        }, 
        password :{
            type:String ,
            required:true
        },
        firstName : {
            type:String,
            required:true
        },

        lastName : {
            type:String,
            required:true
        },
        type :{
            type:String,
            required:true,
            default:"customer"
        },
        whatsapp:{
            type:String,
            required:true
        },
         phone:{
            type:String,
            required:true
        },
        disabled :{
            type:Boolean,
            required:true,
            default:false
        },
        emailverified :{
            type:Boolean,
            required:true,
            default:false
        }
        // img : {
        //     type : String,
        //     default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        // },
        
       
    }
)

const User= mongoose.model("Users" , userSchema)

export default User