const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//get all users
/** 
const getUsers = async (req, res) => {

    //find unique user id so it will only display artists they have created
    const user_id = req.user_id
  
      const users = await User.find({user_id}).sort({createdAt: -1})
  
      res.status(200).json(users)
  }
  */

//get a single user
const getUser = async (req, res) => {
    const { email,name, graphList } = req.user

    // console.log('email:', email);

    // const user = await User.findOne({ email })

    // if (!user) {
    //     return res.status(404).json({ error: 'No such user' })
    // }

    res.status(200).json({email,name, graphList })
}

//delete a user
const deleteUser = async (req, res) => {

    const { _id } = req.user
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOneAndDelete({ _id },)
    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json({msg:"user deleted succesfully"})
}


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const { name, graphList } = user ? user : {}


        //create a token
        const token = createToken(user._id)

        res.status(200).json({ name, email, graphList, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//signup user
const signupUser = async (req, res) => {
    const { email, password, name } = req.body

    try {
        const user = await User.signup(email, password, name)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser, getUser, deleteUser }