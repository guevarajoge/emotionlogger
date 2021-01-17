const Helpers = require('./helpers');

const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : 'postgres://example:example@localhost:5432/test',
});

/*
Create tables
*/
async function initialiseTables() {
  /*
Create emotion table 
Add 4 emotions entries 
*/
  await pg.schema.hasTable('emotions').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('emotions', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('emotion');
          table.string('category_id');
          table.string('joinbycategory');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table EMOTIONS');
          const uuid = Helpers.generateUUID();
          console.log('created 4 emoions ');
          await pg.table('emotions').insert([
            { uuid, emotion: `amused`, category_id: '1' },
            { uuid, emotion: `sorrowful`, category_id: '2' },
            { uuid, emotion: `furious`, category_id: '3' },
            { uuid, emotion: `surprise`, category_id: '4' },
          ]);
        });
    }
  });

  /*
Create e_categories table 
Add 4 emotions categories 
*/
  await pg.schema.hasTable('e_categories').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('e_categories', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('category');
          table.string('category_id');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table E_CATEGORIES');
          const uuid = Helpers.generateUUID();
          console.log('created 4 categories ');
          await pg.table('e_categories').insert([
            { uuid, category: `happy`, category_id: '1' },
            { uuid, category: `sad`, category_id: '2' },
            { uuid, category: `angry`, category_id: '3' },
            { uuid, category: `surprise`, category_id: '4' },
          ]);
        });
    }
  });
}
initialiseTables();

module.exports = pg;
