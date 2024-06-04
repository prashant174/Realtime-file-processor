const express = require('express');
const { getStatus } = require('../controllers/fileController');
const fileRouter = express.Router();


fileRouter.get('/status',getStatus)

module.exports={fileRouter}