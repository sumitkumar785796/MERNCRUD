const mongoose = require('mongoose')
// const URI="mongodb://localhost:27017/mern"
const URI=process.env.MONGODB_URI
const connDB=async()=>{
    try {
        await mongoose.connect(URI)
        console.log('connection successfully...')
    } catch (error) {
        console.log("DATABASE CONNECTION FAIL...")
    }
}
module.exports=connDB