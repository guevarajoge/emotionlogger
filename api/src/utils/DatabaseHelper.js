const Helpers = require('./helpers');

const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : 'postgres://example:example@localhost:5432/test',
});

async function initialiseTables() {
  await pg.schema.hasTable('emotions').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('emotions', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('emotion');
          table.string('category_id');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table EMOTIONS');
        });
    }
    // add record to storyblock table
    else {
      // console.log('created table STORYBLOCK');
      // const uuid = Helpers.generateUUID();
      // await pg.table('storyblock').insert({ uuid, content: `add record` });
    }
  });
  await pg.schema.hasTable('e_categories').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('e_categories', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('category');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table CATEGORIES');
          for (let i = 0; i < 3; i++) {
            const uuid = Helpers.generateUUID();
            await pg
              .table('e_categories')
              .insert({ uuid, category: `category ${i}` });
          }
        });
    }
  });

  ////STORY tables -- to be refactored

  await pg.schema.hasTable('storyblock').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('storyblock', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('content');
          table.string('story_id');
          table.integer('order');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table storyblock');
        });
    }
    // add record to storyblock table
    else {
      // console.log('created table STORYBLOCK');
      // const uuid = Helpers.generateUUID();
      // await pg.table('storyblock').insert({ uuid, content: `add record` });
    }
  });
  await pg.schema.hasTable('story').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('story', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('title');
          table.string('summary');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table story');
          for (let i = 0; i < 10; i++) {
            const uuid = Helpers.generateUUID();
            await pg
              .table('story')
              .insert({ uuid, title: `random element number ${i}` });
          }
        });
    }
  });
}
initialiseTables();

module.exports = pg;
