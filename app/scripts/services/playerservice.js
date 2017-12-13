'use strict';

/**
 * @ngdoc service
 * @name 9ppWebApp.playerService
 * @description
 * # playerService
 * Factory in the 9ppWebApp.
 */
angular.module('9ppWebApp')
    .factory('playerService', function (dbService, penaltyService, $log) {
        var db = dbService,
            self = this,
            type_prefix = 'player';

        // pouch db query functions
        this.save = function (player) {
            player.type = type_prefix;

            if (player._id == undefined)
                player._id = type_prefix + '_' + _.now();

            return db.put(player).catch(function (res) {
                $log.error(res);
            });
        };

        this.del = function (player) {
            return db.remove(player).catch(function (res) {
                $log.error(res);
            })
        };

        this.find = function (id) {
            return db.get(id)
                .then(function (res) {
                    calcGlobalCosts(res);

                    return res;
                })
                .catch(function (res) {
                    if (res.global_penalties == undefined)
                        res.global_penalties = {};

                    $log.error(res);
                });
        };

        this.getAll = function () {
            return db.find({
                selector: {type: type_prefix}
            }).catch(function (res) {
                $log.error(res);
            });
        };

        this.getAllById = function (ids) {
            return db.find({
                selector: {
                    type: type_prefix,
                    _id: {
                        '$in': ids
                    }
                }
            });
        };

        this.getPlayersWithGameSessionDetails = function (gs) {
            var player_info_arr = [],
                penalties,
                total = 0;

            penaltyService.getAll().then(function (res) {
                penalties = res.docs;
            });

            var activePlayers = _.pick(gs.game_details, function (value) {
                return value.active == true;
            });

            return self.getAllById(_.keys(activePlayers)).then(function (res) {
                _.each(res.docs, function (player) {
                    var tmp = {
                        player: player,
                        penalties: [],
                        total_cost: 0
                    };
                    player_info_arr.push(tmp);

                    // TODO optimize calculation
                    _.each(activePlayers[player._id].penalties, function (value, key) {
                        var p = _.findWhere(penalties, {_id: key});
                        tmp.penalties.push({
                            count: value,
                            penalty: p
                        });

                        tmp.total_cost += value * p.price;
                        total += value * p.price;
                    });

                    tmp.penalties = _.sortBy(tmp.penalties, 'count').reverse();
                });

                totalGameSessionCostCallback(total);

                return player_info_arr;
            });
        };

        // global player logic functions
        var globalCostCallback = function () {
        };
        var totalGameSessionCostCallback = function () {
        };

        this.increaseGlobalPenaltyCount = function (penalty, player) {
            player.global_penalties = player.global_penalties || {};

            var count = player.global_penalties[penalty._id] || 0;
            count++;

            player.global_penalties[penalty._id] = count;

            self.save(player).then(function (res) {
                player._rev = res.rev;
            });
        };

        this.decreaseGlobalPenaltyCount = function (penalty, player) {
            player.global_penalties = player.global_penalties || {};

            var count = player.global_penalties[penalty._id] || 0;

            // do not perform any save action
            if (count == 0)
                return;

            count--;

            if (count < 0)
                count = 0;

            player.global_penalties[penalty._id] = count;

            self.save(player).then(function (res) {
                player._rev = res.rev;
            });
        };

        this.registerGlobalCostsCallback = function (callback) {
            globalCostCallback = callback;
        };

        this.registerTotalGameSessionCostCallback = function (callback) {
            totalGameSessionCostCallback = callback;
        };

        // private helper functions
        var calcGlobalCosts = function (player) {
            var total_costs = 0;

            // TODO optimize here. load once and then iterate over them.
            penaltyService.getAllGlobal(['price', '_id']).then(function (res) {
                _.each(player.global_penalties, function (count, penalty) {
                    var p = _.findWhere(res.docs, {_id: penalty});

                    if (p != undefined)
                        total_costs += count * p.price;
                });

                globalCostCallback(total_costs);
            });
        };

        db.changes({
            since: 'now',
            live: true,
            include_docs: true,
            filter: function (doc) {
                return doc.type == type_prefix
            }
        }).on('change', function (change) {
            calcGlobalCosts(change.doc);
        }).on('error', function (err) {
            $log.error(err);
        });

        return this;
    });
