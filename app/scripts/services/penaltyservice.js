'use strict';

/**
 * @ngdoc service
 * @name 9ppWebApp.penaltyService
 * @description
 * # penaltyService
 * Factory in the 9ppWebApp.
 */
angular.module('9ppWebApp')
    .factory('penaltyService', function (dbService, $log) {
        var db = dbService,
            type_prefix = 'penalty';

        this.save = function (p) {
            p.type = type_prefix;

            if(p._id == undefined)
                p._id = type_prefix + '_' + _.now();

            return db.put(p).catch(function (res) {
                $log.error(res);
            });
        };

        this.del = function (p) {
            return db.remove(p).catch(function (res) {
                $log.error(res);
            })
        };

        this.find = function (id) {
            return db.get(id).catch(function (res) {
                $log.error(res);
            });
        };

        this.getAll = function (fields) {
            return db.find({
                selector: {type: type_prefix},
                fields: fields || null
            }).catch(function (res) {
                $log.error(res);
            });
        };

        this.getAllNonGlobal = function (fields) {
            return db.find({
                selector: {
                    type: type_prefix,
                    global: {
                        '$eq': false
                    }
                },
                fields: fields || null
            }).catch(function (err) {
                $log.error(err);
            });
        };

        this.getAllNonGlobalById = function(ids, fields) {
            return db.find({
                selector: {
                    type: type_prefix,
                    global: {
                        '$eq': false
                    },
                    _id: {
                        '$in': ids
                    }
                },
                fields: fields || null
            }).catch(function (err) {
                $log.error(err);
            });
        };

        this.getAllGlobal = function (fields) {
            return db.find({
                selector: {
                    type: type_prefix,
                    global: {
                        '$eq': true
                    }
                },
                fields: fields || null
            }).catch(function (err) {
                $log.error(err);
            });
        };

        db.createIndex({
            index: {
                fields: ['global'],
                name: 'penalty_global_index'
            }
        });
        
        db.createIndex({
            index: {
                fields: ['inverse'],
                name: 'penalty_inverse_index'
            }
        });

        return this;
    });
