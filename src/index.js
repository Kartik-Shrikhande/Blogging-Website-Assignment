//requiring or importing all needed dependencies
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const router = require("../src/routes/router")
const morgan=require("morgan")
require('dotenv').config({ path: '.env' })

//parsing data in jason format

app.use(express.json())
app.use(morgan('dev'));
app.use('/', router)

//handling error using error handling middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status =err.status || 'error'
res.status(err.statusCode).send({status:err.status,message:err.message})
})

//connecting mongodb with nodejs
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log('MongoDB is connected !!') })
    .catch((error) => { console.log(`MONGODB ERROR:${error}`); })

//creating server 
app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})