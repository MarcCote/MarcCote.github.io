define(
    [
        "models/ranking",
        "models/game"
    ],
    function(Ranking, Game) {
        var current = ko.observableArray([]);
        var game = ko.observable(new Game());

        var timeoutID = null;
        var load_all = function () {
            var rankingsPromise = Ranking.load_all("/data/rankings.json")
                .then(function (data) {
                    var orderedData = Enumerable.From(data).OrderByDescending("x => x.score()").ToArray();
                    current(orderedData);
                });

            var currentGamePromise = Game.load("/data/current_game.json").then(function (data) {
                if (game().id() == data.id()) {
                    game().update(data);
                }
                else {
                    game(data);
                }
            });

            return $.when(rankingsPromise, currentGamePromise).then(function () {
                timeoutID = setTimeout(load_all, 2500);
            })
        };

        var currentGameTimeoutID = null;
        var updateCurrentGame = function () {
            game().next_move();

            currentGameTimeoutID = setTimeout(updateCurrentGame, 1000);
        }

        var activate = function () {            
            return load_all().then(function (results) {
                updateCurrentGame();
                return results;
            });
        };
        return {
            rankings: current,
            game: game,
            activate: activate,
            stopRefreshing: function () {
                clearTimeout(timeoutID);
                clearTimeout(currentGameTimeoutID);
            }
        };
    });
