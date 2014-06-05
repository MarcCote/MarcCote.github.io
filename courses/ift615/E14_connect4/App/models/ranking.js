define(
    [
    ],
    function() {
        function Ranking(data) {
            this.player_name = ko.observable("");
            this.nb_wins = ko.observable(0);
            this.nb_ties = ko.observable(0);
            this.nb_losses = ko.observable(0);

            if (data) {
                ko.mapping.fromJS(data, null, this);
            }

            var that = this;
            this.game_played = ko.computed(function () {
                return that.nb_wins() + that.nb_ties() + that.nb_losses();
            });

            var that = this;
            this.score = ko.computed(function () {
                return that.nb_wins() * 2 + that.nb_ties() * 1;
            });
        }

        Ranking.load_all = function(url) {
            var deferred = $.Deferred();
            $.getJSON(base_url + url).then(function(response) {
                    var mapOptions = {
                        create: function (options) { return new Ranking(options.data); }
                    };
                    var result = ko.observableArray();
                    ko.mapping.fromJS(response, mapOptions, result);
                    deferred.resolve(result());
                }).fail(function (response) {
                    console.log(response);
                    deferred.reject(response);
                });
            return deferred.promise();
        };

        return Ranking;
    });
