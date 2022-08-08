const express=require('express');
const app=express();
var indexRouter=require('./routes/index');
app.use('/',indexRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(8000,()=>{
    console.log("Server running in 3000");
});