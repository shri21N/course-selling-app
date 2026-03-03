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

adminRouter.post("/",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})

adminRouter.put("/",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})

adminRouter.get("/bulk",(req,res)=>{
    res.json({
        message:"create course endpoint"
    })
})


module.exports={
    adminRouter:adminRouter
}