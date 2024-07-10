const express= require('express');
const app=express();
const db=require('./db');
require('dotenv').config
const PORT=process.env.PORT||4000
const passport=require('./auth')
////requiring bodyparser for further use
const bodyParser=require('body-parser')
app.use(bodyParser.json());


///middleware function






/////authentication
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});







///import or require router files
const menuItemRoutes=require('./routes/menuItemRoutes');
const personRoutes=require('./routes/personRoutes');
///use the routers
app.use('/menu',menuItemRoutes);
app.use('./person',personRoutes);



app.listen(PORT,()=>{
console.log('listening on PORT 4000');
})