const { Router } = require("express")
const courseRouter = Router();


courseRouter.post('/purchase', function (req, res) {
    res.json({
    message: "login endpoint"
})
})

courseRouter.get('/preview', function (req, res) {
    res.json({
    message: "all courses endpoint"
    })
})



module.exports = {
    courseRouter: courseRouter
}