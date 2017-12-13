'use strict';

/**
 * @ngdoc service
 * @name 9ppWebApp.dbService
 * @description
 * # dbService
 * Factory in the 9ppWebApp.
 */
angular.module('9ppWebApp')
    .factory('dbService', function (pouchDB, pouchDBDecorators, COUCH_DB) {
        var db = new pouchDB('9pp', {
            auto_compaction: true
        });

        db.sync(COUCH_DB, {
            live: true,
            retry: true
        });

        // method applied after instantiation
        db.find = pouchDBDecorators.qify(db.find);

        // global indexes. model specific indexes can be found in the specific service
        db.createIndex({
            index: {
                fields: ['type'],
                name: 'type_index'
            }
        });

        return db;
    });
