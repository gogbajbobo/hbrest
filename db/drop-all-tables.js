const sequence = require('when/sequence');
const _ = require('lodash');

const knex = require('./knex');

getTablesNames()
    .then(tableNames => dropTables(tableNames))
    .catch(error => {
        throw error;
    });

function getTablesNames() {

    return knex.raw('show tables')
        .then(result => {

            const tableNames = _.flatMap(_.first(result), (table) => {
                return _.values(table);
            });

            console.log('tableNames:', tableNames);

            return tableNames;

        });

}

function dropTables(tableNames) {

    const tables = _.map(tableNames, tableName => {
        return () => dropTable(tableName);
    });

    return knex.raw('SET FOREIGN_KEY_CHECKS=0')
        .then(() => sequence(tables))
        .then(() => knex.raw('SET FOREIGN_KEY_CHECKS=1'))

}

function dropTable(tableName) {

    console.log('drop table', tableName);
    return knex.schema.dropTableIfExists(tableName);

}

