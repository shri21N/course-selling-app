const { Router } = require("express");
const { verifyToken } = require("../middleware/token");
const courseRouter = Router();
const { JWT_USER_PASSWORD } = require("../config");
const { purchaseModel, courseModel } = require("../db");


courseRouter.post('/purchase', verifyToken(JWT_USER_PASSWORD), async function (req, res) {
    const userId = req.id;
    const courseId = req.body.courseId;
    let purchase;
    console.log(userId);

    try {
        purchase = await purchaseModel.create({
            userId,
            courseId
        })
        console.log(purchase.userId);

        res.json({
            message: "purchase successful"
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: "unable to purchase"
        })
    }

})

courseRouter.get('/preview', async function (req, res) {
    let courses;
    try {
        courses = await courseModel.find({});
        res.json({
            message: "all courses endpoint",
            courses
        })
    } catch (e) {
        console.log(e);
        res.json({
            message: "unable to load courses"
        })
    }

})



module.exports = {
    courseRouter: courseRouter
}