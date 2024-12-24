const express = require('express')
const router = express.Router()
const userRoutes = require('./userRouters')
const playListRoutes = require('./playListRouter')

router.use(userRoutes)
router.use(playListRoutes)

module.exports = router;
