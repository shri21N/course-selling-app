const { Router } = require("express");
const { } = require("mongoose");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const parseEmail = z.string().email().safeParse(email);
    const parsePassword = z.string().min(6, "passward must be 6 characters").safeParse(password);
    const parseFirstName = z.string().regex(/^[A-Za-z]+$/).safeParse(firstName);
    const parseLastName = z.string().regex(/^[A-Za-z]+$/).safeParse(lastName);
    const hashPassword = await bcrypt.hash(parsePassword.data, 10);

    // if (!parseData.success) {
    //   return res.status(400).json({
    //     message: "Invalid input",
    //     error:parseData.error.issues
    //   });
    // }

    try {
        await userModel.create({
            email: parseEmail.data,
            password: hashPassword,
            firstName: parseFirstName.data,
            lastName: parseLastName.data
        });
    } catch (e) {
        message: "signup failed"
    }
    res.json({
        message: "signup successed"
    })
})

userRouter.post('/login', function (req, res) {
    res.json({
        message: "login endpoint"
    })
})

userRouter.get('/purchases', function (req, res) {
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}