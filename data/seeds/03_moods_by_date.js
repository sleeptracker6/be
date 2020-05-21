exports.seed = async function(knex) {
	await knex("moods_by_date").insert([   
		{ waking: 4, day: 4, evening: 4, entry_id: 1 },
		{ waking: 3, day: 3, evening: 3, daily_average: 3, entry_id: 2 },
	])
}
