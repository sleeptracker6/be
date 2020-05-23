const express = require("express")
const restrict = require("../middleware/restrict")
const Entries = require("./sleepEntry-model")

const router = express.Router()

//endpoint to view all entries by user id

router.get("/:id/", restrict("normal"), async (req, res, next) => {
	try {
		res.json(await Entries.findUserEntries(req.params.id))
	} catch(err) {
		next(err)
	}
})

//endpoint to view entry by date

router.get("/entry/:id", async (req, res, next) => {
    return null
})


//Endpoint to create Entry


router.post("/create", async (req, res, next) => {
    return null
})

//Endpoint to edit Entry
//By sleep_entries Id

router.put("/edit", async (req, res, next) => {
    return null
})

//Endpoint to delete Entry
//By sleep_entries Id

router.delete("/delete", async (req, res, next) => {
    return null
})

//Endpoint to submit rating of 1 - 4 for mood when waking up
//By moods_by_date Id

router.post("/mood/morning", async (req, res, next) => {
    return null
})

//Endpoint to submit rating of 1 - 4 for mood during the day
//By moods_by_date Id

router.post("/mood/afternoon", async (req, res, next) => {
    return null
})

//Endpoint to submit rating of 1 - 4 for mood in the evening
//By moods_by_date Id

router.post("/mood/night", async (req, res, next) => {
    return null
})

//Endpoint that takes morning/afternoon/night scores and gives average
//By moods_by_date Id



module.exports = router