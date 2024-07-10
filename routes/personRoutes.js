const express= require('express');
const router=express.Router();
const Person=require('./../models/Person')

///post method for signup
router.post('/signup',async (req,res)=>{
try {
    const data=req.body;
    const newPerson=new Person(data);
    const response=await newPerson.save();
    console.log('data saved');
res.status(200).json({response})



} catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server error'})
}
//////post method for login
router.post('/login',async(req,res)=>{
    try {
      const{username,password}=req.body;
      const user= await findOne({username:username})

      if(!user||!(await user.comparePassword(password)))
return res.status(400).json({error:'Invalid password or username'});

      return res.status(200).json({res})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
    

})
////Profile route
router.get('/',async(req,res)=>{
    try {
        const userData=req.user;///extract userData from user and then userid from userdata and then use find by id method to get profile amd return user(profile)
        console.log("User Data: ",userData);
        const userId=userData.Id;
        const user=await Person.findById(userId);
        res.status(200).json({user})


    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Imternal server error'})
    }
})
//get method to get the person
router.get('/',async(req,res)=>{
    try {
       
       const data=await Person.find();
       console.log('data fetched')

        res.status(200).json(data)


    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Imternal server error'})
    }
})
/////get method to get worktype
router.get('/:workType',async(req,res)=>{
    try {
       
    const workType=req.params.workType;//extraxt worktype from url parameter
    if(workType=='chef'||workType=='manager'||workType=='waiter'){
        const response=await Person.find({work:workType})
        console.log('response fetched')
        res.status(200).json(response)
    }else{
res.status(404).json({error:'Invalid worktype'})
    }
 } catch (err) {
        console.log(err);
        res.status(500).json({error:'Imternal server error'})
    }
})

})
///////put method
router.get(':/id',async(req,res)=>{
    try {
        const data=req.params.id;
        const updatedData=req.body;
        const response=await Person.findByIdAndUpdate(data,updatedData,{
          new:true,
          runValidators:true

        })

if(!response){
    return res.status(500).json({error:'not found'})
}
console.log('data updated');
res.status(200).json({response});


    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
})
/////////delete route
router.delete(':/id',async(req,res)=>{
    try {
        const personId =req.params.id;
        const response= await Person.findByIdAndRemove(personId);
        if(!response){
            return res.status(400).json({error:'person not found'})
        }
        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'})

} catch (err) {
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
})


module.exports=router;