import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  email:{
    type:String,
    required:true,
    unique:true,
    // match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted:{
    type:Boolean,
    default:false
  }


})

const User = mongoose.model("User",userSchema)

export default User;