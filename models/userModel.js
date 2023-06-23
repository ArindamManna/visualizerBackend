const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const graphs = require('../default/graphs')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    graphList: {
        type: Array,
        required: true,
        default : []
    }
})






//static signup method
userSchema.statics.signup = async function (email, password, name) {
console.log(graphs);
    //validation 
    if (!email || !password || !name) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email address already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, name, password: hash, graphList: graphs })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email address')
    }

    //bcrypt package method
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }




    return user
}



module.exports = mongoose.model('User', userSchema)