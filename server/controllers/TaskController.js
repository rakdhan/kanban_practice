const { Task, User } = require('../models')

class TaskController {
    static addTask(req, res, next){ 
        const { title } = req.body
        Task.create({
            title,
            category: 'Backlog',
            UserId: req.userData.id
        })
        .then(response=> {
            res.status(201).json(response)
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }

    static showTask(req, res, next){
        Task.findAll({
            order: [['updatedAt', 'DESC']],
            include: [ User ]
        })
        .then(response=> {
            res.status(200).json(response)
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }

    static updateTask(req, res, next){ 
        const { title, category } = req.body
        Task.update({
            title,
            category 
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(response=> {
            if (response > 0) res.status(200).json({
                message: 'Update selected task successfully'
            })
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }

    static deleteTask(req, res, next){
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(response=> {
            if (response > 0) res.status(200).json({
                message: 'Delete selected task successfully'
            })
        })
        .catch(err=> {
            res.status(500).json({
                message: err||'Internal Server Error'
            })
        })
    }
}

module.exports = TaskController
