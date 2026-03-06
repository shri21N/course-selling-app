const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { userModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware, verifyToken } = require("../middleware/token");

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const parseEmail = z.string().email().safeParse(email);
    const parsePassword = z.string().min(6, "passward must be 6 characters").safeParse(password);
    const parseFirstName = z.string().regex(/^[A-Za-z]+$/).safeParse(firstName);
    const parseLastName = z.string().regex(/^[A-Za-z]+$/).safeParse(lastName);
    const hashPassword = await bcrypt.hash(parsePassword.data, 10);

    try {
        await userModel.create({
            email: parseEmail.data,
            password: hashPassword,
            firstName: parseFirstName.data,
            lastName: parseLastName.data
        });
    } catch (e) {
        res.json({
            message: "signup failed"
        })
    }
    res.json({
        message: "signup successed"
    })
})

userRouter.post('/login', async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        // password: password
    });

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
        res.send({
            token: token
        })
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})

userRouter.get('/purchases', verifyToken(JWT_USER_PASSWORD), function (req, res) {
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}