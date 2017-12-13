'use strict';

/**
 * @ngdoc overview
 * @name 9ppWebApp
 * @description
 * # 9ppWebApp
 *
 * Main module of the application.
 */
angular
    .module('9ppWebApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ui.router',
        'pouchdb',
        'config'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $logProvider, ENV) {
        $logProvider.debugEnabled(ENV == 'dev');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

            // summary
            .state('summary', {
                url: '/summary/:id',
                templateUrl: 'views/summary.html',
                controller: 'SummaryCtrl'
            })

            // current session routing
            .state('current', {
                url: '/current/:id',
                abstract:true,
                templateUrl: 'views/current/wrapper.html',
                resolve: {
                    meta: function ($stateParams, gameSessionService) {
                        var selectedPlayers = {};
                        var gs;

                        return gameSessionService.find($stateParams.id).then(function (res) {
                            gs = res;

                            if(res.game_details != undefined) {
                                _.each(res.game_details, function (value, key) {
                                    selectedPlayers[key] = !!value.active;
                                });
                            }
                            return {
                                gs: gs,
                                selected_players: selectedPlayers || {}
                            };
                        });
                    }
                },
                controller: 'CurrentWrapperCtrl'
            })
            .state('current.players', {
                url: '/players/:from_game',
                templateUrl: 'views/current/player_selection.html',
                controller: 'CurrentPlayerSelectCtrl'
            })
            .state('current.game', {
                url: '/game',
                templateUrl: 'views/current/game.html',
                controller: 'CurrentGameplayCtrl'
            })
            .state('current.finish', {
                url: '/finish',
                templateUrl: 'views/current/finish.html',
                controller: 'CurrentFinishGameCtrl'
            })

            // player routing
            .state('players', {
                url: '/players',
                abstract: true,
                templateUrl: 'views/players/players.html'
            })
            .state('players.list', {
                url: '/list',
                templateUrl: 'views/players/list.html',
                controller: 'PlayersListCtrl'
            })
            .state('players.view', {
                url: '/view/:id',
                templateUrl: 'views/players/view.html',
                controller: 'PlayersViewCtrl'
            })
            .state('players.new', {
                url: '/new',
                templateUrl: 'views/players/form.html',
                controller: 'PlayersFormCtrl'
            })
            .state('players.edit', {
                url: '/edit/:id',
                templateUrl: 'views/players/form.html',
                controller: 'PlayersFormCtrl'
            })

            // game sessions routing
            .state('game_sessions', {
                url: '/game_sessions',
                abstract: true,
                templateUrl: 'views/game_sessions/wrapper.html'
            })
            .state('game_sessions.list', {
                url: '/list',
                templateUrl: 'views/game_sessions/list.html',
                controller: 'GameSessionsListCtrl'
            })
            .state('game_sessions.view', {
                url: '/view/:id',
                templateUrl: 'views/game_sessions/view.html',
                controller: 'GameSessionsViewCtrl'
            })
            .state('game_sessions.new', {
                url: '/new',
                templateUrl: 'views/game_sessions/form.html',
                controller: 'GameSessionsFormCtrl'
            })
            .state('game_sessions.edit', {
                url: '/edit/:id',
                templateUrl: 'views/game_sessions/form.html',
                controller: 'GameSessionsFormCtrl'
            })

            // penalties routing
            .state('penalties', {
                url: '/penalties',
                abstract: true,
                templateUrl: 'views/penalties/wrapper.html'
            })
            .state('penalties.list', {
                url: '/list',
                templateUrl: 'views/penalties/list.html',
                controller: 'PenaltiesListCtrl'
            })
            .state('penalties.view', {
                url: '/view/:id',
                templateUrl: 'views/penalties/view.html',
                controller: 'PenaltiesViewCtrl'
            })
            .state('penalties.new', {
                url: '/new',
                templateUrl: 'views/penalties/form.html',
                controller: 'PenaltiesFormCtrl'
            })
            .state('penalties.edit', {
                url: '/edit/:id',
                templateUrl: 'views/penalties/form.html',
                controller: 'PenaltiesFormCtrl'
            });
    });
