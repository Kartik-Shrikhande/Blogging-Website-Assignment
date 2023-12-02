const authorModel = require("../models/authorModel")
const { validString, validEmail, validPassword } = require('../validations/validators')
const { hash, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })

//----------------------Sign up API--------------------------------------------//

const signup = async (req, res) => {
    try {
        const { title, authorsname, email, password } = req.body;
        //making sure user must enter some data to proceed
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Enter Required Data" })
        if (!(title == "Mr" || title == "Mrs" || title == "Miss")) return res.status(400).send({ status: false, message: "Enter Valid title,choose a title Mr, Mrs or Miss." })

        //validating authorsname, it should be string
        if (!authorsname) return res.status(400).send({ status: false, message: "Enter authorsname" })
        if (!validString(authorsname)) return res.status(400).send({ status: false, message: "Enter Valid authorsname" })

        //hashing username
        req.body.authorsname = await hash(authorsname, 8)
        //validating email, email should be in proper format
        if (!validEmail(email)) return res.status(400).send({ status: false, message: "Enter Valid email" })
        let checkEmail = await authorModel.findOne({ email: email })
        if (checkEmail) return res.status(400).send({ status: false, message: "Given email already exist ,Enter new unique email" })

        //validating password and also using hash function to encrypt the password 
        if (!password) return res.status(400).send({ status: false, message: "Enter password" })
        if (!validPassword(password)) return res.status(400).send({ status: false, message: "Enter Valid password ,A password should be at least one Capital Letter,Special Character and Number and between 8 to 15 in range " })
        //hashing password
        req.body.password = await hash(password, 8)

        //creating authorsname, email and password
        const create = await authorModel.create(req.body)
        return res.status(201).send({ status: true, message: "Author created", userdata: create })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------Log-In API-----------------------------------------------//

const login = async (req, res) => {
    try {
        //taking email and password
        const { email, password } = req.body
        if (!validEmail(email)) return res.status(400).send({ status: false, message: "Enter Valid Email" })
        if (!validPassword(password)) return res.status(400).send({ status: false, message: "Enter Valid Password" })

        //checking if email already exist 
        const login = await authorModel.findOne({ email: email })
        if (!login) return res.status(404).send({ status: false, message: "Entered Email Does not Exist, Enter valid email" })

        //Matching given password with original passowrd
        const pass = compareSync(password, login.password)
        if (!pass) return res.status(400).send({ status: false, message: "Entered Wrong Password" })

        //Generating jsonwebtoken by signing in user
        sign({ userId: login._id }, process.env.SECRET_KEY, { expiresIn: "24hr" }, (error, token) => {
            if (error) return res.status(400).send({ status: false, message: error.message })
            res.header('authorization', token)
            return res.status(200).send({ staus: true, message:"User login Successfully" })
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//------------------------------------------------------------------//

module.exports = { signup, login }