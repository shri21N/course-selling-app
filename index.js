const express = require('express');
const mongoose=require("mongoose");
require("dotenv").config();
// console.log(process.env);
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const PORT=process.env.PORT || 3000;
const app = express()
app.use(express.json()); 

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin",adminRouter);
async function main(PORT){
   await mongoose.connect(process.env.DB_CONNECT);
    console.log("connected to");
    app.listen(PORT);
    console.log("listening port 3000");
}

main(PORT);