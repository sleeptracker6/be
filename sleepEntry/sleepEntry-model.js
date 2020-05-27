const db = require("../data/config")

function findById(id) {
	return db("users")
		.where({ id })
		.first()
}

//endpoint to view all entries

function findUserEntries(userId) {
    return db("sleep_entries as s")
        .join("users as u", "u.id", "s.user_id")
        .where({ user_id: userId})
        .select(["s.date", "s.fell_asleep", "s.woke_up", "s.total_time_slept", "s.id as Entry_Id"])
}

//endpoint to view entry by date

function findUserEntryById(userId, id) {
	return db("sleep_entries")
        .where({ id, user_id: userId })
        .select(["id", "date", "fell_asleep", "woke_up", "total_time_slept"])
		.first()
}



//Endpoint to create Entry

function add(entry) {
	return db("sleep_entries")
		.insert(entry)
}

//Endpoint to edit Entry
//By sleep_entries Id

function update(entry, id) {
    return db("sleep_entries")
        .update(entry)
        .where({ id })
}

//Endpoint to delete Entry
//By sleep_entries Id

function remove(userId, id) {
    return db("sleep_entries")
        .where({ id, user_id: userId })
        .del()
}

//Endpoint to submit rating of 1 - 4 for mood when waking up
//By moods_by_date Id, Brings in date from sleep_entries table

//Endpoint to submit rating of 1 - 4 for mood during the day
//By moods_by_date Id, Brings in date from sleep_entries table

//Endpoint to submit rating of 1 - 4 for mood in the evening
//By moods_by_date Id, Brings in date from sleep_entries table

module.exports = {
    findUserEntries,
    findById,
    findUserEntryById,
    add,
    update,
    remove,
}