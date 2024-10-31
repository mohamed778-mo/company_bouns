const mongoose=require("mongoose")
require("dotenv").config()

const URL = process.env.ATLAS_URL

const connection=()=>{
    mongoose.connect(URL)
.then(()=>{console.log('done connection !!')})
.catch((e)=>{console.log(e.message)})
    
}



module.exports= connection;
