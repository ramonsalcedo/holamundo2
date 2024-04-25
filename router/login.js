const express = require('express')
const UserController = require('../controllers/login')
const router = express.Router();
router.post('/', UserController.findOne);
module.exports = router