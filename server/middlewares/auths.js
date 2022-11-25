const jwt = require('jsonwebtoken')
const { User, Task } = require('../models')

function authentication (req, res, next){
    const { access_token } = req.headers 

    try {
        if (!access_token) {
            res.status(404).json({
                message: 'Access token not found.'
            })
        } else {
            req.userData = jwt.verify(access_token, process.env.SECRET_KEY)
            User.findOne({
                where: { id: req.userData.id }
            })
            .then(response=> {
                if (response) next()
                else res.status(404).json({
                    message: 'User not found.'
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error||'Internal Server Error.'
        })
    }
}

function authorization (req, res, next){
    Task.findByPk(req.params.id)
    .then(user => {
        if (user.UserId == req.userData.id) next()
        else res.status(401).json({
            message: 'Unauthorized user'
        })
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Internal Server Error.'
        })
    })
}

module.exports= { authentication, authorization }