const {Router}=require("express");
const adminModel=require("../db");
const adminRouter =Router();

adminRouter.post("/login",(req,res)=>{
    res.json({
        message:"login endpoint"
    })
})

adminRouter.post("/signup",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post("/course",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})

adminRouter.put("/course",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})

adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})


module.exports={
    adminRouter:adminRouter
}