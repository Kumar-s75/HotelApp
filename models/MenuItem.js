// here we will be defining schemas for mongodb menu item 
const express= require('mongoose');
const { type } = require('os');

const menuItemSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
taste:{
    type:String,
    enum:['sweet','sour','spicy'],
    required:true
},
is_drink:{
    type:boolean,
    default:false
},
ingredients:{
    type:[String],
    default:[]
},
num_sales:{
    type:Number,
    default:0
}




})

const MenuItem=mongoose.model('MenuItem',menuItemSchema);
module.exports=MenuItem;
