const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blogsController")
const authorController = require("../controllers/authorController")
const auth = require("../middlewares/middleware")

//--------------------Blogs API's-----------------//
router.post('/blog/:authorId', auth.Authentication, auth.Authorisation, blogController.createBlog)
router.get('/blogs', auth.Authentication, blogController.getAllBlogs)
router.get('/blog/:blogId', auth.Authentication, blogController.getBlogById)
router.put('/updateblog/:authorId/:blogId', auth.Authentication, auth.Authorisation, blogController.updateBlogById)
router.delete('/deleteblog/:authorId/:blogId', auth.Authentication, auth.Authorisation, blogController.deleteBlogById)

//-------------------Authors API's-----------------//
router.post('/signup', authorController.signup)
router.post('/login', authorController.login)

//--------------Handling Invalid URL Path-------------//
router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: 'Invalid URL path, Path Not Found' })
})

//------------------------------------------------------//
module.exports = router;