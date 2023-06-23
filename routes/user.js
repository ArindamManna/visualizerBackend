const express = require('express')

//controller functions
const { signupUser, 
    loginUser, 
    getUsers, 
    getUser, 
    deleteUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')
   

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//GET a single user
router.get('/',requireAuth, getUser)

//DELETE a user
router.delete('/delete',requireAuth, deleteUser)






//display user route
//router.post('/', returnUserType)

module.exports = router