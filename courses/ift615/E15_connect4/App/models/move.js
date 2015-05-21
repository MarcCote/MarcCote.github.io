define(
    [],
    function() {
        function Move(data) {
            this.column = ko.observable(0);
            this.row = ko.observable(0);
            this.time = ko.observable(0.0);
            this.active = ko.observable(false);
            this.message = ko.observable(null);

            if(data){
                ko.mapping.fromJS(data, null, this);
            }
        };

        return Move;
    });
