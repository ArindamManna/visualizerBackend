const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


//signup user
const addGraph = async (req, res) => {
    const { graph} = req.body
    const { _id } = req.user

    try {
        const user = await User.findOne({_id})
        const {graphList}=user;
        await User.updateOne({_id},{graphList:[...graphList,graph]})
        
        //create a token
        // const token = createToken(user._id)
        res.status(200).json({ msg:"succesfull",code:200  })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateGraph = async (req, res) => {
    const { graph,index} = req.body
    const { _id } = req.user

    try {
        const user = await User.findOne({_id})
        const {graphList}=user;
        let graphList_temp=[...graphList];
        graphList_temp[index]=graph
        await User.updateOne({_id},{graphList:graphList_temp})
        
        //create a token
        // const token = createToken(user._id)
        res.status(200).json({ msg:"succesfull",code:200 })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}






const deleteGraph = async (req, res) => {
    const { graph,index} = req.body
    const { _id } = req.user

    try {
        const user = await User.findOne({_id})
        const {graphList}=user;
        let graphList_temp=[...graphList];
        // graphList_temp[index]=graph
        graphList_temp.splice(index,1)
        await User.updateOne({_id},{graphList:graphList_temp})
        
        //create a token
        // const token = createToken(user._id)
        res.status(200).json({ msg:"succesfull",code:200  })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// updateGraph,deleteGraph
module.exports = { addGraph,updateGraph,deleteGraph }