const User = require('../models/user-model')
const path = require('path')
//main page
const reactPage = async (req,res)=>{
    try {
        res.sendFile(path.resolve(__dirname,'..',"client","build","index.html"))
    } catch (error) {
        console.error(error)
    }
}

//registraion page
const reg = async (req,res)=>{  
    const {fname,lname,email,mobile}=req.body
    if(!fname||!lname || !email || !mobile){
        res.status(404).json({message:"please the fill all data . All data are required!!!"})
    }
    try {
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"Email already exists"})
        }
        const userCreated = await User.create({fname,lname,email,mobile})
        res.status(201).json({message:userCreated})
    } catch (error) {
        console.error(error)
    }
}
//view page
const view = async (req,res)=>{
    try {
        const userData = await User.find()
        res.status(200).json({message:userData})
        console.log(userData)
    } catch (error) {
        res.status(400).json({message:error})
    }
}
//view single user page
//view page
const singleview = async (req,res)=>{
    try {
        console.log(req.params)
        const {id} = req.params
        const userSingleData = await User.find({_id:id})
        res.status(200).json({message:userSingleData})
    } catch (error) {
        res.status(400).json({message:error})
    }
}
//update page
const updateReg = async (req,res)=>{
    try {
        console.log(req.params)
        const {id} = req.params
        const updateUser = await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
        console.log(updateUser)
        res.status(201).json({message:updateUser})
    } catch (error) {
        res.status(422).json({message:error})
    }
}
//Delete page
const deleteReg = async (req,res)=>{
    try {
        console.log(req.params)
        const {id} = req.params
        const deleteUser = await User.findByIdAndDelete({_id:id})
        console.log(deleteUser)
        res.status(201).json({message:deleteUser})
    } catch (error) {
        res.status(422).json({message:error})
    }
}
module.exports={reactPage,reg,view,singleview,updateReg,deleteReg}