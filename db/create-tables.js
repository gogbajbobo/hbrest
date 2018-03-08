const sequence = require('when/sequence');
const _ = require('lodash');

const Schema = require('./schema');
const knex = require('./knex');

createTables()
    .catch(error => {
        throw error;
    });


// functions

function createTables () {

    const tableNames = _.keys(Schema);

    const tables = _.map(tableNames, tableName => {
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

            if (value.hasOwnProperty('index') && value.index === true) {
                column.index();
            }

            if (value.hasOwnProperty('unique') && value.unique) {
                column.unique();
            }

            if (value.hasOwnProperty('unsigned') && value.unsigned) {
                column.unsigned();
            }

            if (value.hasOwnProperty('references') && value.hasOwnProperty('inTable')) {
                column.references(value.references).inTable(value.inTable);
            }

            if (value.hasOwnProperty('defaultTo')) {

                if (value.defaultTo === 'now') {
                    column.defaultTo(knex.fn.now());
                } else {
                    column.defaultTo(value.defaultTo);
                }

            }

        });

    });

}
