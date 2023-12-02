require('dotenv').config({ port: '.env' })
const { verify } = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const authorModel = require("../models/authorModel")

//------------------------- Authentication API ----------------------------//

const Authentication = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(400).send({ status: false, message: 'token is not present' })
        //Removing 'Bearer' word from token
        token = token.split(' ')[1]
        //Verifying the token using the SECRET_KEY 
        verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) return res.status(401).send({ status: false, message: err.message })
            else {
                //setting userId in the request object 
                req.authorId = decodedToken.userId
                next()
            }
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//------------------------- Authorization API ----------------------------//

const Authorisation = async (req, res, next) => {
    try {
        let Id = req.params.authorId
        //checking for valid author Id
        if (!isValidObjectId(Id)) return res.status(400).send({ status: false, message: "Invalid AuthorId" })
        let checkAuthorId = await authorModel.findById(Id)
        //checking if provided AuthorId exist or not
        if (!checkAuthorId) return res.status(404).send({ status: false, message: "AuthorId Does Not Exist" })
        //checking autherization of user
        if (Id != req.authorId) return res.status(403).send({ status: false, message: "unauthorised user" })
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
//---------------------------------------------------------------//

module.exports = { Authentication, Authorisation }