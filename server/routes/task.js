const router = require('express').Router()

const TaskController = require('../controllers/TaskController')
const { authentication, authorization } =require('../middlewares/auths')

router.use(authentication)
router.post('/', TaskController.addTask)
router.get('/', TaskController.showTask)
router.put('/:id', authorization, TaskController.updateTask)
router.delete('/:id', authorization, TaskController.deleteTask)

module.exports= router;
