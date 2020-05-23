exports.seed = async function(knex) {
	await knex("sleep_entries").insert([   
    { date: "2020-05-20", fell_asleep: "2020-05-20 12:00:00", woke_up: "2020-05-20 08:00:00", user_id: 1 },
    { date: "2020-05-21", fell_asleep: "2020-05-20 10:00:00", woke_up: "2020-05-20 06:00:00", total_time_slept: 8, user_id: 1 },
    { date: "2020-05-20", fell_asleep: "2020-05-20 12:00:00", woke_up: "2020-05-20 08:00:00", user_id: 2 },
	])
}
