const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const entriesRouter = require("./sleepEntry/sleepEntry-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 8080

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())
server.use(session({
	name: "sess", 
	resave: false, 
	saveUninitialized: false, 
	secret: "keep it secret, keep it safe", 
}))


server.use("/auth", authRouter)
server.use("/users", usersRouter)
server.use("/entries", entriesRouter) //add restrict() when done

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

if (!module.parent) {
	server.listen(port, () => {
		console.log(`Running at http://localhost:${port}`)
	})
}

module.exports = server