define(['durandal/plugins/router', 'durandal/app'], function (router, app) {

    window.shell = {
        router: router,
        activate: function () {
            return router.activate('home');
        }
    };
    window.base_url = ""
    window.vm = function() {
    	return shell.router.activeItem();
    }

    return window.shell;
});
