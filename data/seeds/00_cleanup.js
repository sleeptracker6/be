exports.seed = async function (knex) {
	if (process.env.NODE_ENV != "production") {
		await knex("moods_by_date").truncate()
		await knex("sleep_entries").truncate()
		await knex("users").truncate()
	}
}
