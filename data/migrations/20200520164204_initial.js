exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.text("name").notNull().unique()
        table.text("password").notNull()
    })

    await knex.schema.createTable("sleep_entries", (table) => {
        table.increments("id")
        table.date("date").notNull().unique()
        table.timestamp("fell_asleep").notNull()
        table.timestamp("woke_up").notNull()
        table.float("total_time_slept")
        table.integer("user_id").references("id").inTable("users")
    })

    await knex.schema.createTable("moods_by_date", (table) => {
        table.increments("id")
        table.integer("waking").notNull()
        table.integer("day").notNull()
        table.integer("evening").notNull()
        table.float("daily_average")
        table.integer("entry_id").references("id").inTable("sleep_entries")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("moods_by_date")
    await knex.schema.dropTableIfExists("sleep_entries")
    await knex.schema.dropTableIfExists("users")
};
