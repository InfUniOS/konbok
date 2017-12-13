'use strict';

/**
 * @ngdoc service
 * @name 9ppWebApp.gameSessionService
 * @description
 * # gameSessionService
 * Factory in the 9ppWebApp.
 */
angular.module('9ppWebApp')
    .factory('gameSessionService', function (dbService, penaltyService, $log) {
        var db = dbService,
            self = this,
            type_prefix = 'game_session',
            total_costs = {};

        // pouch db query functions
        this.save = function (gs) {
            gs.type = type_prefix;

            if (gs._id == undefined)
                gs._id = type_prefix + '_' + _.now();

            return db.put(gs).catch(function (res) {
                $log.error(res);
            });
        };

        this.del = function (gs) {
            return db.remove(gs).catch(function (res) {
                $log.error(res);
            })
        };

        this.find = function (id) {
            return db.get(id)
                .then(function (res) {
                    res.start = new Date(res.start);

                    calcGameSessionCostPerPlayer(res);

                    return res;
                })
                .catch(function (res) {
                    $log.error(res);
                });
        };

        this.getAll = function () {
            return db.find({
                selector: {
                    type: type_prefix,
                    start: {
                        '$gte': ''
                    }
                },
                sort: [{'start': 'desc'}]
            }).catch(function (res) {
                $log.error(res);
            });
        };

        this.getAllOpen = function () {
            return db.find({
                selector: {
                    type: type_prefix,
                    end: {
                        '$exists': false
                    },
                    start: {
                        '$exists': true
                    }
                }
            });
        };

        this.getAllClosed = function () {
            return db.find({
                selector: {
                    type: type_prefix,
                    end: {
                        '$exists': true
                    },
                    start: {
                        '$exists': true
                    }
                },
                sort: [{'type': 'asc', 'start': 'asc', 'end': 'asc'}]
            });
        };

        // global game session logic
        var costPerPlayerCallback = function(){};

        this.increasePlayerPenaltyCount = function (gs, penalty, player_id, allPlayers) {
            var count,
                isInverse = penalty.inverse != undefined && penalty.inverse == true;

            // add costs and normal count to other players if inverse
            // otherwise increase count normally
            if(isInverse) {
                // increase inverse count of penalty for player
                // to keep track how many times he thrown this penalty by himself
                var invCount = gs.game_details[player_id].penaltiesInverse[penalty._id] || 0;
                invCount++;

                gs.game_details[player_id].penaltiesInverse[penalty._id] = invCount;
                
                // TODO calc async?
                _.each(allPlayers, function (p) {
                    if(p._id == player_id)
                        return;

                    count = gs.game_details[p._id].penalties[penalty._id] || 0;
                    count++;

                    gs.game_details[p._id].penalties[penalty._id] = count;
                    total_costs[p._id] += penalty.price;
                });
            }
            else {
                count = gs.game_details[player_id].penalties[penalty._id] || 0;
                count++;

                gs.game_details[player_id].penalties[penalty._id] = count;
                total_costs[player_id] += penalty.price;
            }


            self.save(gs).then(function (res) {
                gs._rev = res.rev;
            });
        };

        this.decreasePlayerPenaltyCount = function (gs, penalty, player_id, allPlayers) {
            var count,
                isInverse = penalty.inverse != undefined && penalty.inverse == true;

            // remove costs and normal count from other players if inverse
            // otherwise decrease count normally
            if (isInverse) {
                // and inverse count of penalty for player
                // to keep track how many times he thrown this penalty by himself
                var invCount = gs.game_details[player_id].penaltiesInverse[penalty._id] || 0;
                invCount--;

                if (invCount < 0)
                    invCount = 0;

                gs.game_details[player_id].penaltiesInverse[penalty._id] = invCount;

                // TODO calc async?
                _.each(allPlayers, function (p) {
                    if (p._id == player_id)
                        return;

                    count = gs.game_details[p._id].penalties[penalty._id] || 0;
                    count--;

                    if (count < 0)
                        count = 0;

                    gs.game_details[p._id].penalties[penalty._id] = count;
                    total_costs[p._id] -= penalty.price;
                });
            }
            else {
                count = gs.game_details[player_id].penalties[penalty._id] || 0;

                // do not perform any save action
                if (count == 0)
                    return;

                count--;

                if (count < 0)
                    count = 0;

                gs.game_details[player_id].penalties[penalty._id] = count;
                total_costs[player_id] += penalty.price;
            }

            self.save(gs).then(function (res) {
                gs._rev = res.rev;
            });
        };

        this.savePlayerRelation = function (gs, selectedPlayers) {
            gs.game_details = gs.game_details || {};

            _.each(selectedPlayers, function (value, key) {
                gs.game_details[key] = gs.game_details[key] || {};

                gs.game_details[key].active = value;
                gs.game_details[key].penalties = gs.game_details[key].penalties || {};
                gs.game_details[key].penaltiesInverse = gs.game_details[key].penaltiesInverse || {};
            });

            self.save(gs).then(function (res) {
                gs._rev = res.rev;
            });
        };

        this.registerCalcCostPerPlayerCallback = function (callback) {
            costPerPlayerCallback = callback;
        };

        // private helper functions
        // TODO fix calculation on reload / player adjustments
        var calcGameSessionCostPerPlayer = function (gs) {
            _.each(gs.game_details, function (obj, player_id) {
                total_costs[player_id] = 0;

                if (_.isEmpty(obj.penalties) || obj.active == false)
                    return;

                penaltyService.getAllNonGlobalById(_.keys(obj.penalties), ['price', '_id']).then(function (res) {
                    _.each(res.docs, function (p) {
                        total_costs[player_id] += obj.penalties[p._id] * p.price;
                    });

                    costPerPlayerCallback(total_costs);
                });
            });
        };

        // game session index
        db.createIndex({
            index: {
                fields: ['end', 'start'],
                name: 'game_session_start_end_index'
            }
        });

        db.createIndex({
            index: {
                fields: ['start'],
                name: 'game_session_start_index'
            }
        });

        return this;
    });
