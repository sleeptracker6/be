const db = require("../data/config")

//endpoint to view all entries

function findUserEntries(userId) {
    return db("sleep_entries as s")
        .join("users as u", "u.id", "s.user_id")
        .where({ user_id: userId})
        .select(["u.id", "s.date", "s.fell_asleep", "s.woke_up", "s.total_time_slept"])
}

//endpoint to view entry by date



//Endpoint to create Entry

//Endpoint to edit Entry
//By sleep_entries Id

//Endpoint to delete Entry
//By sleep_entries Id

//Endpoint to submit rating of 1 - 4 for mood when waking up
//By moods_by_date Id, Brings in date from sleep_entries table

//Endpoint to submit rating of 1 - 4 for mood during the day
//By moods_by_date Id, Brings in date from sleep_entries table

//Endpoint to submit rating of 1 - 4 for mood in the evening
//By moods_by_date Id, Brings in date from sleep_entries table

module.exports = {
	findUserEntries,
}