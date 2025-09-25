import mongoose from 'mongoose' ; 

const userModel = new mongoose.Schema({

name:{
    type: String,
    requireq: true,
},
email : {
    type: String,
    requireq: true,
},
password: {
     type: String,
    requireq: true,
},
role: {
    type: String,
    enum: ["user", "admin"],
    default:"user"
}
})
export default mongoose.model("User", userModel); 