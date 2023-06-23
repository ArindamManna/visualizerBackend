const express = require('express')

//controller functions
const { addGraph,updateGraph,deleteGraph } = require('../controllers/graphController')
const requireAuth = require('../middleware/requireAuth')
   

const router = express.Router()

//login route
router.post('/add',requireAuth, addGraph)

//signup route
router.post('/update',requireAuth, updateGraph)


// //DELETE a user
router.delete('/delete',requireAuth, deleteGraph)








//display user route
//router.post('/', returnUserType)

module.exports = router