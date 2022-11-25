const router = require('express').Router()

const UserController = require('../controllers/UserController')
const routeTask = require('./task')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-signin', UserController.googleLogin)

router.use('/tasks', routeTask)

module.exports= router;
