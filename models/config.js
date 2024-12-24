const mongoose = require('mongoose')
const config = require("../config/index")

mongoose.set('strictQuery', false)

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error",(err)=>{
    console.log("mongoose connection error" + err)
})
mongoose.connection.on("connected",(err,res)=>{
    console.log("mongoose is connected")
})

