const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const cookieParser = ("cookie-parser")
// Router(s)?

const server = express()
const port = process.env.PORT || 8080

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser)


//server.use ROUTER
//server.use ROUTER

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our Sleep Tracker",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})