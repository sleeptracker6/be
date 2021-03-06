const express = require("express")
const Entries = require("./sleepEntry-model")


const router = express.Router()

//GET all moods

router.get("/moods", async (req, res, next) => {
	try {
		console.log("1")
		const moods = await Entries.getMoods()
		res.status(200).json(moods)
	} catch (err) {
		next(err)
	}
})

//endpoint to view all entries by user id

router.get("/:id/", validateUserId(), async (req, res, next) => {
	try {
		res.json(await Entries.findUserEntries(req.params.id))
	} catch (err) {
		next(err)
	}
})

//endpoint to view entry by date

router.get("/:id/entry/:entryId", validateUserId(), async (req, res, next) => {
	try {
		const entry = await Entries.findUserEntryById(req.params.id, req.params.entryId)
		if (entry) {
			res.status(201).json(entry)
		} else {
			res.status(404).json({
				message: "Could not find post"
			})
		}
	} catch (err) {
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
		console.log(newEntry)

		if (data) {
			res.status(201).json({ message: 'Entry created.', data: data })
		} else {
			res.status(404).json({ message: 'Could not add entry.' })
		}
	} catch (err) {
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
			res.status(404).json({ message: 'Could not update entry ' })
		}
	} catch (err) {
		next(err)
	}
})

//Endpoint to delete Entry
//By sleep_entries Id

router.delete("/:id/delete/:entryId", validateUserId(), async (req, res, next) => {
	try {
		const delEntry = await Entries.remove(req.params.id, req.params.entryId)

		if (delEntry) {
			res.status(204).json({ message: 'Entry deleted.', data: delEntry })
		} else {
			res.status(404).json({ message: 'Could not delete entry ' })
		}
	} catch (err) {
		next(err)
	}
})





//Get all moods by user

router.get("/:id/moods", validateUserId(), async (req, res, next) => {
	try {
		res.json(await Entries.getUsersMoods(req.params.id))
	} catch (err) {
		next(err)
	}
})

//Post mood(s)

router.post("/:id/:dateId/mood", validateUserId(), async (req, res, next) => {
	try {
		const newMood = {
			...req.body,
			entry_id: req.params.dateId,
			user_id: req.params.id
		}

		const data = await Entries.postMood(newMood, req.params.dateId, req.params.id)
		console.log('body:', (newMood))

		if (data) {
			res.status(201).json({ message: 'Mood(s) successfully submitted.', data: data })
		} else {
			res.status(404).json({ message: 'Could not add mood(s).' })
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})


//Updates moods

router.put("/:id/:dateId/mood", validateUserId(), async (req, res, next) => {
	console.log(req.params)
	try {
		// Check what user sends
		const objectToSend = {};
		Object.keys(req.body).map(key => {
			value = req.body[key]
			if (value) {
				objectToSend[key] = value
			}
		})


		const insertFour = await Entries.updateMood(objectToSend, req.params.dateId)
		console.log("Result of insert:", insertFour)

		if (insertFour) {
			res.status(201).json(insertFour)
		} else {
			res.status(404).json({ message: 'Could not update mood.' })
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ err: 'Mood has already been posted for this date.' })
	}
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