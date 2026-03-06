const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("../config");
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {

    const { email, password, firstName, lastName } = req.body;

    const parseEmail = z.string().email().safeParse(email);
    const parsePassword = z.string().min(6, "passward must be 6 characters").safeParse(password);
    const parseFirstName = z.string().regex(/^[A-Za-z]+$/).safeParse(firstName);
    const parseLastName = z.string().regex(/^[A-Za-z]+$/).safeParse(lastName);
    const hashPassword = await bcrypt.hash(parsePassword.data, 10);

    try {
        await adminModel.create({
            email: parseEmail.data,
            password: hashPassword,
            firstName: parseFirstName.data,
            lastName: parseLastName.data
        });
        res.json({
            message: "signup successed"
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "signup failed"
        })
    }
})


adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        // password: password
    });

    const match = await bcrypt.compare(password, admin.password);

    if (match) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);
        res.send({
            token: token
        })
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})


adminRouter.post("/course", (req, res) => {
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "create course endpoint"
    })
})


module.exports = {
    adminRouter: adminRouter
}