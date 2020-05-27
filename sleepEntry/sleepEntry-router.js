const express = require("express")
const restrict = require("../middleware/restrict")
const Entries = require("./sleepEntry-model")
const db = require("../data/config")

const router = express.Router()

//endpoint to view all entries by user id

router.get("/:id/", validateUserId(), async (req, res, next) => {
	try {
		res.json(await Entries.findUserEntries(req.params.id))
	} catch(err) {
		next(err)
	}
})

//endpoint to view entry by date

router.get("/:id/entry/:entryId", validateUserId(), async (req, res, next) => {
    try{
        const entry = await Entries.findUserEntryById(req.params.id, req.params.entryId)
            if (entry) {
                res.status(201).json(entry)
            } else {
                res.status(404).json({
                    message: "Could not find post"
                })
            }
    } catch(err) {
        next(err)
    }
})


//Endpoint to create Entry


router.post("/:id/create", validateUserId(), async (req, res, next) => {
    try {
		const newEntry = {
			...req.body,
			user_id: req.params.id
		}
		const data = await Entries.add(newEntry)
		console.log(data)

			if (data) {
				res.status(201).json({ message: 'Entry created.', data: data })
			} else {
				res.status(404).json({ message: 'Could not add entry.' })
			}
	} catch(err) {
		next(err)
	}
})

//Endpoint to edit Entry
//By sleep_entries Id

router.put("/:id/edit/:entryId", validateUserId(), async (req, res, next) => {
	try {
		const updatedEntry = {
			...req.body,
			user_id: req.params.id
		}

		const updatedData = await Entries.update(updatedEntry, req.params.entryId)

		if (updatedData) {
			res.status(201).json({ message: 'Entry updated.', data: updatedData })
		} else {
			res.status(404).json({ message: 'Could not update entry '})
		}
	} catch(err) {
		next(err)
	}
})

//Endpoint to delete Entry
//By sleep_entries Id

router.delete("/:id/delete/:entryId", validateUserId(), async (req, res, next) => {
    try {
		const delEntry = await Entries.remove(req.params.id, req.params.entryId)

		if (delEntry) {
			res.status(204).json({message: 'Entry deleted.', data: delEntry})
		} else {
			res.status(404).json({ message: 'Could not delete entry '})
		}
	} catch(err) {
		next(err)
	}
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


//User Id Validation

function validateUserId() {
	return (req, res, next) => {
		Entries.findById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(404).json({
						message: "User not found",
					})
				}
			})
			.catch((error) => {
				next(error)
			})
	}
}


module.exports = router