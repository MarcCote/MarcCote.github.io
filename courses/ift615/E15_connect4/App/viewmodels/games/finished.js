define(
    [
        "models/game"
    ],
    function(Game) {
        var finishedGames = ko.observableArray([]);
        var timeoutID = null;
        var load_all = function () {
            return Game.load_all_finished("/data/finished_games.json")
                .then(function (data) {

                    var games = Enumerable.From(data)
                        .SelectMany(function (x) { return [x.player1(), x.player2()]; })
                        .Distinct()
                        .OrderBy("x => x")
                        .Select(function (x) {
                            return {
                                player: x,
                                games: Enumerable.From(data)
                                    .Where(function (y) { return y.player1() == x || y.player2() == x; })
                                    .Select(function (y) {
                                        return {
                                            opponent: y.player1() == x ? y.player2() : y.player1(),
                                            game: y
                                        };
                                    }).ToArray()
                            };
                        }).ToArray();


                    finishedGames(games);

                    timeoutID = setTimeout(load_all, 5000);
                });
        };

        var activate = function () {
            return load_all();
        };
        return {
            finishedGames: finishedGames,
            activate: activate,
            stopRefreshing: function () {
                clearTimeout(timeoutID);
            }
        };
    });
