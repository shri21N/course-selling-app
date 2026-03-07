const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { verifyToken } = require("../middleware/token");
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
    let admin;
    try {
        admin = await adminModel.findOne({
            email: email,
            // password: password
        })
    } catch (e) {
        console.log(e);
        res.json({ error: "error in connection" })
    }

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


adminRouter.post("/course", verifyToken(JWT_ADMIN_PASSWORD), async (req, res) => {
    const adminId = req.id;
    const { title, description, price, imageURL } = req.body;
    try {
        const course = await courseModel.create({ title, description, price, imageURL, creatorId: adminId })
        res.json({
            message: "course created",
            courseId: course._id
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: "error in connection",
        })
    }
})

adminRouter.put("/course", verifyToken(JWT_ADMIN_PASSWORD), async (req, res) => {
    const adminId = req.id;

    const { title, description, price, imageURL, courseId } = req.body;

    try {
        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        }, { title, description, price, imageURL }
        )
        res.json({
            message: "course updated",
            courseId: course.id
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: "error in connection"
        })
    }
})

adminRouter.get("/course/bulk", verifyToken(JWT_ADMIN_PASSWORD), async (req, res) => {
    const adminId = req.id;
    console.log(adminId);
    let courses;
    try {
        courses = await courseModel.find({
            creatorId: adminId
        })
        res.json({
            courses
        })
    } catch (e) {
        console.log(e);
    }

})


module.exports = {
    adminRouter: adminRouter
}