define(
    [
        "models/game"
    ],
    function(Game) {
        var game = ko.observable(new Game());
        var timeoutID = null;
        var load = function (url) {
            return Game.load(url)
                .then(function (data) {
                    game(data);

                    if (data.win() == null) {
                        timeoutID = setTimeout(function () { load(url); }, 2500);
                    }
                });
        };

        var activate = function (splat) {
            return load(splat.url);
        };
        return {
            game: game,
            activate: activate,
            stopRefreshing: function () {
                clearTimeout(timeoutID);
            }
        };
    });
