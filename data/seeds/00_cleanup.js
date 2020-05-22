exports.seed = async function(knex) {
	await knex("moods_by_date").truncate()
	await knex("sleep_entries").truncate()
	await knex("users").truncate()
}
