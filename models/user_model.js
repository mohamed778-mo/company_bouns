const mongoose = require('mongoose')
const validator=require('validator')
const bcryptjs = require('bcryptjs')


var userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true,
        
    },
    LastName:{
        type:String,
        required:true,
        trim:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(valu){
            if(!validator.isEmail(valu)){
                throw new Error("Invalid email")
            }
        }
    },
    job_code:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate(value){
            const StrongPassword = new RegExp("^(?=.*[a-z])(?=.*[0-9])")
            if(!StrongPassword.test(value)){
              throw new Error(" Password must contain ' ^(?=.*[a-z])(?=.*[0-9]) ' ")
            }
          }
    },
    tokens:[
        {
            type:String,
            expires:"300d"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },

   echo:[
    {
       NO_bouns:{
        type:Number,
       },
       NO_hours:{
        type:String,
       },
       date:{
        type:String
        },
       name_who_added:{
        type:String,
       },
        note:{
        type:String,
       }
    }
] ,
    

   presence:[
    {
       NO_bouns:{
        type:Number,
       },
       NO_hours:{
        type:String,
       },
       date:{
        type:String
        ,},
       name_who_added:{
        type:String,
       },
        note:{
        type:String,
       }
    }
] ,
    

   readiness:[
    {
       NO_bouns:{
        type:Number,
       },
       NO_hours:{
        type:String,
       },
       date:{
        type:String
        ,},
       name_who_added:{
        type:String,
       },
        note:{
        type:String,
       }
    }
] ,
    

   absence:[
    {
       NO_bouns:{
        type:Number,
       },
       NO_hours:{
        type:String,
       },
       date:{
        type:String
        ,},
       name_who_added:{
        type:String,
       },
        note:{
        type:String,
       }
    }
] ,
    passwordChangedAt: {
        type:Date
    },
    passwordResetToken: {
        type:String
    },
    passwordResetExpires: {
        type:Date
    },

}
,
{
 timestamps:true
}
);

userSchema.pre("save",async function(){

    try {
     const user = this 
        if(!user.isModified("password")){
        
          return
        }
            user.password = await bcryptjs.hash( user.password , 8)
      
      }
   catch (error) {
        console.log(error)
  } 
     })     
    
     userSchema.methods.toJSON = function(){
        const user = this 
        const dataToObject = user.toObject()
        delete dataToObject.password
        delete dataToObject.tokens
       
        return dataToObject
      }
      


module.exports = mongoose.model('User', userSchema);
