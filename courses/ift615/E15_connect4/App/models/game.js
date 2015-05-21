define(
    [
        "models/move"
    ],
    function(Move) {
        var mapOptions = {
            moves: {
                create: function (options) { return new Move(options.data); }
            }
        };

        function Game(data) {
            this.player1 = ko.observable("player1");
            this.player2 = ko.observable("player2");
            this.moves = ko.observableArray();
            this.board = ko.observableArray();
            this.win = ko.observable(null);
            this.message = ko.observable(null);
            this.last_move_idx = -1;

            if(data) {
                ko.mapping.fromJS(data, mapOptions, this);
            }

            var that = this;
            this.winner = ko.computed(
                function(){
                    if(that.win() != null) {
                        if(that.win()){
                            return that.player1();
                        } else {
                            return that.player2();
                        }
                    }
                    return "";
                }
            );

            this.id = ko.computed(function () {
                return that.player1() + "-" + that.player2();
            })

            this.init_board();
        };

        Game.load_all_finished = function(url) {
            var deferred = $.Deferred();
            $.getJSON(base_url + url).then(function(response) {
                    var mapOptions = {
                        create: function (options) { return new Game(options.data); }
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

        Game.load = function (url) {
            var deferred = $.Deferred();
            $.getJSON(base_url + url).then(function(response) {
                    var game = new Game(response);
                    deferred.resolve(game);
                }).fail(function (response) {
                    console.log(response);
                    deferred.reject(response);
                });
            return deferred.promise();
        };

        Game.board_size = [6,8];

        Game.prototype.init_board = function() {
            this.board = ko.observableArray();
            for (var i = 0; i < Game.board_size[0]; i++) {
                row = {}
                row.columns = ko.observableArray();
                for (var j = 0; j < Game.board_size[1]; j++) {
                    row.columns.push({value: ko.observable("none")})
                }
                this.board.push(row)
            }
        };

        Game.prototype.update = function(otherGame) {
            for (var i = this.moves().length; i < otherGame.moves().length; i++) {
                if (otherGame.moves().length > i) {
                    this.moves.push(otherGame.moves()[i]);
                }
            }
            this.win(otherGame.win());
        };

        Game.prototype.last_move = function() {
            while(this.last_move_idx < this.moves().length - 1) {
                this.next_move();
            }
        }

        Game.prototype.first_move = function() {
            while(this.last_move_idx >= 0) {
                this.previous_move();
            }
        }

        Game.prototype.next_move = function() {
            if(this.last_move_idx < this.moves().length - 1) {
                this.last_move_idx++;
                var current_move = this.moves()[this.last_move_idx];
                this.board()[current_move.row()].columns()[current_move.column()].value("player"+(this.last_move_idx % 2 + 1));
                current_move.active(true);
                this.message(current_move.message)
            }
        }

        Game.prototype.previous_move = function() {
            if(this.last_move_idx >= 0) {
                var current_move = this.moves()[this.last_move_idx];
                this.board()[current_move.row()].columns()[current_move.column()].value("none")
                current_move.active(false);
                this.message(current_move.message)
                this.last_move_idx--;
            }
        }

        return Game;
    });
