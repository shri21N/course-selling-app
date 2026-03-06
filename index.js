const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const PORT = process.env.PORT || 3000;
const app = express()
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(PORT) {

    await mongoose.connect(process.env.DB_CONNECT)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));

    console.log("connected to");
    app.listen(PORT);
    console.log(`listening port ${PORT}`);
}

main(PORT);