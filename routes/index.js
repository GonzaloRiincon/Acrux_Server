const router = require("express").Router()

const concertRoutes = require("./concert.routes")
router.use("/concert", concertRoutes)

module.exports = router