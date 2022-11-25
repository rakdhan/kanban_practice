const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { OAuth2Client } = require('google-auth-library');  //google proced
const client = new OAuth2Client(process.env.CLIENT_ID); //google proced
class UserController {
    static register(req, res, next){ 
        const { email, password, organization } = req.body
        User.create({
            email, password, organization
        })
        .then(user => {
            const { id, email, organization, createdAt, updatedAt } = user
            res.status(201).json({
                id, email, organization, createdAt, updatedAt
            })
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }

    static login(req, res, next){ 
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user=> {
            if (user && bcrypt.compareSync(password, user.password)) {
                const access_token = jwt.sign(
                    {id: user.id, email: user.email},
                    process.env.SECRET_KEY
                )
                res.status(200).json({
                    email: user.email,
                    access_token
                })
            } else {
                res.status(400).json({
                    message: 'Incorrect email/password'
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }

    static googleLogin(req, res, next) {
        let payload = null
        let pict = null
        client.verifyIdToken({
            idToken: req.body.access_token,
            audience: process.env.CLIENT_ID
        })
        .then((ticket) => {
            payload = ticket.getPayload()
            pict = payload.picture
            console.log('PAYLOAD==============', payload)
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then((user) => {
            if (user) {
                let access_token = jwt.sign(
                    {id: user.id, email: user.email}, 
                    process.env.SECRET_KEY
                )
                res.status(200).json({ user, access_token, pict })
            } else {
                User.create({
                    email: payload.email,
                    password: 'randomPassword',
                    name: payload.name,
                })
                .then((user) => {
                    let access_token = jwt(
                        {id: user.id, email: user.email}, 
                        process.env.SECRET_KEY
                    )
                    res.status(200).json({ user, access_token })
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err || 'Google Login Internal Server Error'
            })
        });
    }
    
}

module.exports = UserController
