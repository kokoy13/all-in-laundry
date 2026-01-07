const User = require("../models/User")
const validator = require("validator")
const bcrypt = require("bcrypt")

exports.register = async(req, res) =>{
    const {name, email, password, confirmPassword} = req.body

    try {
        const existingUser = await User.getUserByEmail(email)
        
        if(name.length < 4){
            return res.status(400).json({
                message: "Nama harus lebih dari 5 karakter"
            })
        }

        if(existingUser[0].length !== 0){
            return res.status(400).json({
                message: "Email sudah digunakan"
            })
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Email tidak valid, mohon coba kembali"})
        }

        if(password != confirmPassword){
            return res.status(400).json({message: "Password dan konfirmasi password harus sesuai"})
        }

        if(!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })){
            return res.status(400).json({message: "Password harus terdiri dari 8 karakter, 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 simbol"})
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.createUser(name, email, passwordHash)

        return res.status(200).json({
            message: ""
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error: ${error}`
        })
    }
}

exports.login = async(req , res) =>{
    const {email, password} = req.body
    try {
        const existingUser = await User.getUserByEmail(email)
        if(existingUser[0].length == 0){
            return res.status(400).json({
                message: "Email atau password salah"
            })
        }
        const isMatch = await bcrypt.compare(password, existingUser[0][0].password)
        if(!isMatch){
            return res.status(400).json({
                message: "Email atau password salah"
            })
        }
        const token = await bcrypt.hash(existingUser[0][0].password, 10);

        return res.status(200).json({
            message: "",
            token: token,
            id: existingUser[0][0].id
        })
    } catch (error) {
        console.log(`error gan ${error}`)
    }
}