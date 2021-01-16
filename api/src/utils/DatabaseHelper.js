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
    // add record to EMOTIONS table
    // else {
    //   console.log('created emotion entry to EMOTIONS tables');
    //   const uuid = Helpers.generateUUID();
    //   await pg.table('emotions').insert({ uuid, emotion: `anger` });
    // }
  });
  // add record to E_CATEGORES table
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
          console.log('created table E_CATEGORIES');
          const uuid = Helpers.generateUUID();
          console.log('created 4 e_categories ');

          await pg.table('e_categories').insert([
            { uuid, category: `happy` },
            { uuid, category: `sad` },
            { uuid, category: `angry` },
            { uuid, category: `surprise` },
          ]);

          // for (let i = 0; i < 3; i++) {
          //   const uuid = Helpers.generateUUID();
          //   await pg
          //     .table('e_categories')
          //     .insert({ uuid, category: `category ${i}` });
          // }
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
