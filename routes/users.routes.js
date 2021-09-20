const express = require('express')
const UsersController = require('../controllers/users-controller')

const router = express.Router()

router.post('/', UsersController.addUser)
router.put('/:id', UsersController.updateUser)
router.get('/:id', UsersController.getUser)

module.exports = router
