const Schema = require('./schema');
const sequence = require('when/sequence');
const _ = require('lodash');

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'hbclient',
        password : 'hbclientpass',
        database : 'hbdb',
        charset  : 'utf8'
    }
});

const tableNames = _.keys(Schema);

checkTables()
    .then(() => dropTables())
    .then(() => createTables())
    .catch(error => {
        throw error;
    });


// functions

function checkTables() {

    const tables = _.map(tableNames, tableName => {
        return () => {
            return knex.schema.hasTable(tableName)
                .then(exists => console.log(tableName, exists ? '' : 'not', 'exists'));
        };
    });

    return sequence(tables);

}

function dropTables() {

    const tables = _.map(tableNames, tableName => {
        return () => dropTable(tableName);
    });

    return sequence(tables);

}

function dropTable(tableName) {

    console.log('drop table', tableName);
    return knex.schema.dropTableIfExists(tableName);

}

function createTables () {

    let tables = _.map(tableNames, tableName => {
        return () => createTable(tableName);
    });

    return sequence(tables);

}

function createTable(tableName) {

    console.log('create table', tableName);

    return knex.schema.createTable(tableName, table => {

        let column;

        _.each(Schema[tableName], (value, key) => {

            if (value.type === 'text' && value.hasOwnProperty('fieldtype')) {
                column = table[value.type](key, value.fieldtype);
            } else if (value.type === 'string' && value.hasOwnProperty('maxlength')) {
                column = table[value.type](key, value.maxlength);
            } else {
                column = table[value.type](key);
            }

            if (value.hasOwnProperty('nullable') && value.nullable === true) {
                column.nullable();
            } else {
                column.notNullable();
            }

            if (value.hasOwnProperty('primary') && value.primary === true) {
                column.primary();
            }

            if (value.hasOwnProperty('unique') && value.unique) {
                column.unique();
            }

            if (value.hasOwnProperty('unsigned') && value.unsigned) {
                column.unsigned();
            }

            if (value.hasOwnProperty('references')) {
                column.references(value.references);
            }

            if (value.hasOwnProperty('defaultTo')) {
                column.defaultTo(value.defaultTo);
            }

        });

    });

}
