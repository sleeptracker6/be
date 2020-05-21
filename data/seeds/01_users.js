exports.seed = async function(knex) {
	await knex("users").insert([   
		{ name: "test", password: "test" },
		{ name: "test1", password: "test1" },
	])
}
