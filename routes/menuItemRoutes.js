const express= require('express')
const router=express.Router();
const MenuItem=require('./../models/MenuItem')

//Get Method to get Menu Items
router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
        // using res.status we are sending a http response with a status code and a json -formatted body
        //200 here is the http status code
    }
})
//post method to add items
router.post('/',async(req,res)=>{
    try {
        // logic:first define data and store body of request in it
const data=req.body
const newMenu=new MenuItem(data)
const response=await newMenu.save()
console.log('data saved');
res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
        
    }
})

////put or update method to update menu items
router.put('/',async(req,res)=>{
    try {
        
const MenuId=req.params.id;
const updatedMenuData=req.body;
const response =await MenuItem.findByIdAndUpdate(MenuId,updatedMenuData,{
    new:true,
    runValidators:true,
})

if(!response){
    return res.status(404).json({error:'Menu Item not found'})

}

console.log('data updated')
res.status(200).json({response});
} catch (err) {
    console.log(err)  
    res.status(500).json({error:'Internal Server Error'});

    }
})




///delete method to delete menu items
router.delete('/:id',async(req,res)=>{
try{
    const MenuId=req.params.id;

    const response=await MenuItem.findByIdAndRemove(MenuId);
    if(!response){
        return res.status(404).json({error:'Menu Item not found'})

    }
    console.log('data deleted');
    res.status(200).json({message:'Menu deleted Successfully'})

}
catch(err){
console.log(err);
res.status(500).json({error:'Internal server error'})
}
})
//////
// get method to get taste of the items
router.get('/:taste',async(req,res)=>{
    try {
        const tasteType=req.params.taste;
        if(tasteType=='sweet'||tasteType=='sour'||tasteType=='spicy'){
            const response=await MenuItem.find({taste:tasteType})
            console.log('response fetched')
            res.status(200).json(response);

        }else{
            res.status(404).json({error:'Invalid Taste Type'});
        }
 } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})



module.exports=router;